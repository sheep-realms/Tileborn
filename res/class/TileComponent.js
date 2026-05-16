class TileComponent {
    constructor() {}

    static map(mapData) {
        let dom = '';
        mapData.map.forEach(e => {
            dom += TileComponent.tile(e);
        });
        return `<div
            id="tileborn-map"
            style="--map-width: ${ mapData.size.width }; --map-height: ${ mapData.size.height };"
        >
            ${ dom }
        </div>`
    }

    static tile(data) {
        const rotation = [0, 90, 180, 270]
        return `<div
            class="tile"
            data-id="${data.id}"
            data-name="${data.name}"
            data-index="${data.index}"
            data-pos-x="${data.pos.x}"
            data-pos-y="${data.pos.y}"
            style="
                --tile-color: ${ data.color ? data.color : 'transparent' };
                ${ data.tileset?.src ? `--tileset-url: url('../../assets/texture/${data.tileset.src}'); --tileset-x: ${data.tileset.pos[0]}; --tileset-y: ${data.tileset.pos[1]};` : '' }
                ${ data.tileset?.random_rotation ? `transform: rotate(${rotation[TileComponent.coordRotation(data.pos.x, data.pos.y)]}deg);` : '' }
            "
        ></div>`
    }

    static coordRotation(x, y) {
        let seed = x * 374761393 + y * 668265263;
        seed = (seed ^ (seed >> 13)) >>> 0;
        seed = (seed * 1274126177) >>> 0;
        seed = seed ^ (seed >> 16);

        return seed % 4;
    }
}