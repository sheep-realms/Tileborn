class Tileborn {
    constructor() {
        this.tileMaps = new Map();
        this.activeTileMaps = new Set();
        this.registry = tilebornSystem.registry;
        this.registryMap = {
            tile: {
                nameToId: new Map(),
                idToDef: []
            },
            tileState: new Map(),
            tileModel: new Map()
        };
        this.cache = {
            tagValues: new Map()
        },
        this.mainloopData = {
            state: false,
            delay: 50
        };

        this.event = new EchoLiveEventManager({
            debug_tile_tick_update_check: {},
            debug_tile_random_tick_check: {},
            load_map: {},
            tile_update: {}
        });

        this.on     = this.event.on;
        this.once   = this.event.once;
        this.off    = this.event.off;

        this.init();
    }

    init() {
        this.#serializationData();
        this.createMap('example');
    }

    #serializationData() {
        // 方格 ID 序列化
        this.registryMap.tile.idToDef = this.registry.getRegistryArray('tile');
        this.registryMap.tile.idToDef.forEach((e, i) => {
            this.registryMap.tile.nameToId.set(e.name, i);
        });

        // 方格状态序列化
        this.registry.forEach('tile_state', e => {
            let tileStateDef = {};
            let tileStateDefaultValue = {};
            for (const key in e.value) {
                if (!Object.hasOwn(e.value, key)) continue;
                const element = e.value[key];
                let tileStateValueDef = this.registry.getRegistryValue('tile_state_value', element);
                if (tileStateValueDef === undefined) {
                    throw new Error(
                        `Invalid reference "${element}" for state "${key}"`
                    );
                }
                tileStateDef[key] = tileStateValueDef.value;
                tileStateDefaultValue[key] = tileStateValueDef.default_value;
            }
            this.registryMap.tileState.set(e.name, new TileState(tileStateDef, tileStateDefaultValue));
        });

        // 方格模型序列化
        this.registry.forEach('tile_model', e => {
            let modelSet = [];
            for (const key in e.variants) {
                if (!Object.hasOwn(e.variants, key)) continue;
                const v = e.variants[key];
                const stateId = this.getTileState(e.reference ?? e.name).getId(Tileborn.tileStateStringToObject(key));
                modelSet[stateId] = v;
            }
            this.registryMap.tileModel.set(e.name, modelSet);
        });
    }

    launchMainloop() {
        let startTime = performance.now();
        this.mainloopData.state = true;

        const tick = (now) => {
            if (!this.mainloopData.state) return;
            if (now - startTime >= this.mainloopData.delay) {
                startTime = now;
                this.mainloop();
            }
            requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    mainloop() {
        this.activeTileMaps.forEach(e => {
            this.tileMaps.get(e)?.updater.tick();
        });
    }

    createMap(name, size = [16, 16]) {
        if (this.tileMaps.get(name) !== undefined) return;
        const map = new TilebornMap(this, name, size);
        this.tileMaps.set(name, map);
        return map;
    }

    loadMap(name) {
        const map = this.tileMaps.get(name);
        if (map === undefined) return;
        this.activeTileMaps.clear();
        this.activeTileMaps.add(name);
        this.event.emit('load_map', map.getMap());
    }

    getTileId(name) {
        let key = EchoLiveData.filter('namespace_id', 'pad_namespace', name)
        return this.registryMap.tile.nameToId.get(key);
    }

    getTileData(id) {
        return this.registryMap.tile.idToDef[id];
    }

    getTileState(name) {
        return this.registryMap.tileState.get(name);
    }

    getTileModel(name, stateId) {
        return this.registryMap.tileModel.get(name)[stateId];
    }

    getTileTagValues(name) {
        name = EchoLiveData.filter('namespace_id', 'pad_namespace', name);
        const values = this.cache.tagValues.get(name);
        if (values !== undefined) return values;

        const tag = this.registry.getRegistryValue('tile_tag', name);
        let output = [];
        tag.values.forEach(e => {
            if (e.startsWith('#')) {
                output.push(...this.getTileTagValues(e.substring(1)));
            } else {
                output.push(e);
            }
        });
        this.cache.tagValues.set(name, output);
        return output;
    }

    checkTileIncludesTag(tileName, tag) {
        const values = this.getTileTagValues(tag);
        return values.includes(tileName);
    }

    static tileStateStringToObject(stateString = '') {
        const stateList = stateString.split(',');
        let output = {};

        for (let i = 0; i < stateList.length; i++) {
            const kv = stateList[i].split('=');
            if (kv.length !== 2) continue;
            const key = kv[0].trim();
            const value = kv[1].trim();
            output[key] = value;
        }

        return output;
    }
}

class TilebornMap {
    constructor(tileborn, name, size = [16, 16]) {
        this.tileborn = tileborn;
        this.updater = new TilebornMapUpdater(this);
        this.name = name;
        this.size = size;
        this.tiles = new Uint16Array(size[0] * size[1]);
        this.states = new Uint16Array(size[0] * size[1]);
        this.payloads = new Map();
        this.activeTiles = new Set();
    }

    get width() {
        return this.size[0];
    }

    get height() {
        return this.size[1];
    }

    get length() {
        return this.size[0] * this.size[1];
    }

    posToIndex(pos = []) {
        const [ posX, posY ] = pos;
        return Math.max(Math.min(posY, this.height - 1), 0) * this.width + Math.max(Math.min(posX, this.width - 1), 0);
    }

    indexToPos(index) {
        if (index > this.length || index < 0) return;
        const posX = index % this.width;
        const posY = Math.floor( index / this.width );
        return [posX, posY];
    }

    getTile(pos = []) {
        if (typeof pos === 'number') pos = this.indexToPos(pos);
        const index = this.posToIndex(pos);
        const id = this.tiles[index];
        const stateId = this.states[index];
        const data = this.tileborn.getTileData(id);
        const name = data.name;
        const state = this.tileborn.getTileState(data.states)?.getState(stateId);
        let model = {};
        if (data.tileset?.model) {
            model = this.tileborn.getTileModel(data.tileset.model, stateId);
        }

        let output = {
            ...data,
            index,
            id,
            stateId,
            name,
            state,
            pos: {
                x: pos[0],
                y: pos[1],
            },
            model
        };
        output.getFacing = () => this.getTileFacingForTileData(output);
        output.getNeighbor = (direction = 'all') => this.getTileNeighbor(pos, direction);
        output.setTile = (name, state, option = {}) => this.setTile(pos, name, state, option);
        output.changeState = (state, option = {}) => this.changeTileState(pos, state, option);
        output.interaction = (reverse = false, alt = false) => {
            const handlerName = output.payload?.interaction;
            if (handlerName === undefined) return;
            const handler = this.tileborn.registry.getRegistryValue('tile_payload', handlerName);
            return handler?.(output, reverse, alt);
        };
        return output;
    }
    
    getTileFacing(pos = []) {
        const tile = this.getTile(pos);
        return tile.getFacing();
    }

    getTileFacingForTileData(tile) {
        if (tile.face_type === 'all') {
            return tile.state.facing;
        } else if (tile.face_type === 'axis') {
            const axisMap = {
                x: 'north',
                y: 'east'
            };
            return axisMap[tile.state.axis];
        } else {
            return 'north';
        }
    }

    getTileNeighbor(pos = [], direction = 'all') {
        const tile = this.getTile(pos);

        if (!tile) {
            return null;
        }

        const facing = tile.getFacing();

        const [x, y] = pos;

        // 世界方向偏移
        const offsets = {
            north: [0, -1],
            east: [1, 0],
            south: [0, 1],
            west: [-1, 0]
        };

        // 相对方向映射
        const relativeDirections = {
            north: {
                front: 'north',
                right: 'east',
                back: 'south',
                left: 'west'
            },

            east: {
                front: 'east',
                right: 'south',
                back: 'west',
                left: 'north'
            },

            south: {
                front: 'south',
                right: 'west',
                back: 'north',
                left: 'east'
            },

            west: {
                front: 'west',
                right: 'north',
                back: 'east',
                left: 'south'
            }
        };

        // 获取单个方向邻居
        const getNeighbor = (dir) => {
            const offset = offsets[dir];

            if (!offset) {
                return null;
            }

            const nx = x + offset[0];
            const ny = y + offset[1];

            // 地图边界检查
            if (
                nx < 0 ||
                ny < 0 ||
                nx >= this.width ||
                ny >= this.height
            ) {
                return null;
            }

            return this.getTile([nx, ny]);
        };

        // 获取全部方向
        if (direction === 'all') {
            let result = {};

            for (const dir of ['north', 'east', 'south', 'west']) {
                const neighbor = getNeighbor(dir);

                result[dir] = neighbor;
            }

            return result;
        }

        // 相对方向转绝对方向
        const absoluteDirection =
            relativeDirections[facing]?.[direction]
            ?? direction;

        return getNeighbor(absoluteDirection);
    }

    getMap() {
        const tileMap = [];
        for (let i = 0; i < this.length; i++) {
            tileMap.push(this.getTile(i));
        }
        return {
            name: this.name,
            size: {
                width: this.width,
                height: this.height
            },
            map: tileMap
        };
    }

    setTile(pos = [], name, state, option = {}) {
        const { tile_update_disabled = false } = option;

        const id = typeof name === 'number' ? name : this.tileborn.getTileId(name);
        if (typeof id !== 'number') return;
        const data = this.tileborn.getTileData(id);
        const index = this.posToIndex(pos);
        this.tiles[index] = id;
        if (typeof data.states === 'string') {
            const stateObj = this.tileborn.getTileState(data.states);
            this.states[index] = state !== undefined ? stateObj.getId(state) : stateObj.defaultId;
        }

        if (!tile_update_disabled) this.updateTile(pos);
        this.tileborn.event.emit('tile_update', this.getTile(pos));

        return {
            pos,
            index,
            name,
            id,
            stateId: this.states[index]
        }
    }

    fillTile(pos1 = [], pos2 = [], name) {
        const id = typeof name === 'number' ? name : this.tileborn.getTileId(name);
        if (typeof id !== 'number') return;

        const [ pos1X, pos1Y ] = pos1;
        const [ pos2X, pos2Y ] = pos2;
        const startX = Math.min(pos1X, pos2X);
        const startY = Math.min(pos1Y, pos2Y);
        const lengthX = Math.abs(pos1X - pos2X);
        const lengthY = Math.abs(pos1Y - pos2Y);

        for (let i = startY; i <= startY + lengthY; i++) {
            let startIndex = this.posToIndex([startX, i]);
            this.tiles.fill(id, startIndex, startIndex + lengthX + 1);
        }
    }

    changeTileState(pos = [], state = {}, option = {}) {
        const tile = this.getTile(pos);
        this.setTile(pos, tile.name, { ...tile.state, ...state }, option);
    }

    interactionTile(pos = [], reverse = false, alt = false) {
        const tile = this.getTile(pos);
        return tile.interaction(reverse, alt);
    }

    updateTile(pos = []) {
        if (typeof pos === 'number') pos = this.indexToPos(pos);
        const [ posX, posY ] = pos;

        const getPosIndex = (pos) => {
            if (pos[0] < 0 || pos[0] >= this.width) return;
            if (pos[1] < 0 || pos[1] >= this.height) return;
            return this.posToIndex(pos);
        }

        const updateList = [
            [posX, posY],
            [posX, posY - 1],
            [posX + 1, posY],
            [posX, posY + 1],
            [posX - 1, posY],
            [posX - 1, posY - 1],
            [posX + 1, posY - 1],
            [posX + 1, posY + 1],
            [posX - 1, posY + 1]
        ];

        updateList.forEach(e => {
            const i = getPosIndex(e);
            if (typeof i === 'number') this.activeTiles.add(i);
        });
    }

    dumpActiveTiles() {
        let list = []
        this.activeTiles.forEach(e => list.push(e));
        this.activeTiles.clear();
        return list;
    }

    checkTileIncludesTag(pos = [], tag) {
        const tile = this.getTile(pos);
        return this.checkTileIncludesTagForTileData(tile, tag);
    }

    checkTileIncludesTagForTileData(tile, tag) {
        const values = this.tileborn.getTileTagValues(tag);
        if (values.includes(tile.name)) return true;
        const matched = values.filter(e => e.startsWith(tile.name + '|'));
        let states = [];
        matched.forEach(e => {
            let s = e.split('|')[1];
            if (s) states.push(s);
        })

        for (let i = 0; i < states.length; i++) {
            const e = states[i];
            let state = Tileborn.tileStateStringToObject(e);
            let approved = true;
            // debugger
            for (const key in state) {
                if (!Object.hasOwn(state, key)) continue;
                const element = state[key];
                if (tile.state[key] !== element) {
                    approved = false;
                    break;
                }
            }
            if (approved) return true;
        }

        return false;
    }
}

class TilebornMapUpdater {
    constructor(tileMap) {
        this.tileMap = tileMap;
        this.randomTick = 3;
    }

    tick() {
        // 方格更新
        const activeTiles = this.tileMap.dumpActiveTiles() ?? [];

        activeTiles.forEach(index => {
            this.resolveTileUpdate(index);
        });

        // 随机刻
        const randomTickCount = Math.floor(this.tileMap.length * (this.randomTick / 256));
        const getRandomIndex = (length) => {
            return Math.floor(Math.random() * length);
        }
        let randomTickCheckIndex = new Set();

        for (let i = 0; i < randomTickCount; i++) {
            randomTickCheckIndex.add(getRandomIndex(this.tileMap.length));
        }

        randomTickCheckIndex.forEach(e => {
            this.checkRandomTickTile(e);
        });
    }

    resolveTileUpdate(index) {
        this.tileMap.tileborn.event.emit('debug_tile_tick_update_check', index);
        const tile = this.tileMap.getTile(index);

        if (typeof tile.payload?.update === 'string') {
            const handler = this.tileMap.tileborn.registry.getRegistryValue('tile_payload', tile.payload.update);
            handler?.({
                tile,
                map: this.tileMap,
                tileborn: this.tileMap.tileborn,
                getPayload: (name) => this.tileMap.tileborn.registry.getRegistryValue('tile_payload', name),
                resolve: (option = {}) => {
                    const {
                        update_tile = false,
                        update_texture = false
                    } = option;
                    if (update_tile) {
                        this.tileMap.updateTile(index);
                    }
                    if (update_texture) {
                        this.tileMap.tileborn.event.emit('tile_update', tile);
                    }
                }
            });
        }
    }

    checkRandomTickTile(index) {
        this.tileMap.tileborn.event.emit('debug_tile_random_tick_check', index);
        
    }
}

class TileState {
    #keys;
    #valueMaps;
    #radixes;
    #stateCount;

    constructor(definition, defaultValue) {
        this.#keys = Object.keys(definition).sort();
        this.#valueMaps = new Map();
        this.#radixes = [];
        this.defaultValue = defaultValue;
        this.defaultId = 0;

        let multiplier = 1;

        for (const key of this.#keys) {
            const values = [...definition[key]].sort();
            const valueToIndex = new Map();

            values.forEach((value, index) => {
                valueToIndex.set(value, index);
            });

            this.#valueMaps.set(key, {
                values,
                valueToIndex
            });

            this.#radixes.push(multiplier);
            multiplier *= values.length;
        }

        this.#stateCount = multiplier;

        if (typeof defaultValue === 'object') this.defaultId = this.getId(defaultValue);
    }

    get stateCount() {
        return this.#stateCount;
    }

    /**
     * 状态对象 -> 状态ID
     */
    getId(state) {
        if (typeof state === 'string') state = Tileborn.tileStateStringToObject(state);
        state = { ...this.defaultValue, ...state };
        let id = 0;

        for (let i = 0; i < this.#keys.length; i++) {
            const key = this.#keys[i];
            const value = state[key];
            const map = this.#valueMaps.get(key);
            const valueIndex = map.valueToIndex.get(value);

            if (valueIndex === undefined) {
                throw new Error(
                    `Invalid value "${value}" for state "${key}"`
                );
            }

            id += valueIndex * this.#radixes[i];
        }

        return id;
    }

    /**
     * 状态ID -> 状态对象
     */
    getState(id) {
        if (id < 0 || id >= this.#stateCount) {
            throw new Error(`Invalid state id: ${id}`);
        }

        const result = {};

        for (let i = 0; i < this.#keys.length; i++) {
            const key = this.#keys[i];
            const map = this.#valueMaps.get(key);
            const radix = this.#radixes[i];
            const valueIndex = Math.floor(id / radix) % map.values.length;
            result[key] = map.values[valueIndex];
        }

        return result;
    }
}