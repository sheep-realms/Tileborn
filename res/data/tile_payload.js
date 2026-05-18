tilebornSystem.registry.loadRegistry('tile_payload', 'name', [
    {
        name: 'tileborn:_template_wire_update',
        value: (data, checkTag, extState = {}) => {
            const neighbor = data.tile.getNeighbor();
            let state = {
                north: 'none',
                east: 'none',
                south: 'none',
                west: 'none',
                ...extState
            }
            for (const dir of ['north', 'east', 'south', 'west']) {
                const e = neighbor[dir];
                if (e === null) continue;
                if (data.map.checkTileIncludesTagForTileData(e, checkTag + '_direction_' + dir)) {
                    state[dir] = 'line';
                }
            }
            data.tile.changeState(state, { tile_update_disabled: true });
        }
    }, {
        name: 'tileborn:hidden_power_wire_interaction',
        value: (tile, _, alt = false) => {
            let state = {
                powered: tile.state.powered
            };
            if (alt) {
                tile.changeState({ axis: tile.state.axis === 'x' ? 'y': 'x' });
            } else {
                tile.setTile('tileborn:lab_power_wire', state);
            }
        }
    }, {
        name: 'tileborn:line_update',
        value: (data) => {
            const handler = data.getPayload('tileborn:_template_wire_update');
            handler(data, 'tileborn:line_connectable');
            data.resolve();
        }
    }, {
        name: 'tileborn:power_state_interaction',
        value: (tile) => {
            const nextState = tile.state.powered === 'true' ? 'false' : 'true';
            tile.changeState({ powered: nextState });
        }
    }, {
        name: 'tileborn:power_wire_interaction',
        value: (tile) => {
            let state = {
                powered: tile.state.powered
            };
            if (
                tile.state.north === 'line'
                && tile.state.south === 'line'
                && (tile.state.east === 'none' || tile.state.west === 'none')
            ) {
                state.axis = 'y';
                tile.setTile('tileborn:lab_hidden_power_wire', state);
            } else if (
                tile.state.east === 'line'
                && tile.state.west === 'line'
            ) {
                state.axis = 'x';
                tile.setTile('tileborn:lab_hidden_power_wire', state);
            } 
        }
    }, {
        name: 'tileborn:power_wire_update',
        value: (data) => {
            const handler = data.getPayload('tileborn:_template_wire_update');
            handler(data, 'tileborn:power_wire_connectable');
            data.resolve();
        }
    }, {
        name: 'tileborn:rotatable_power_equipment_interaction',
        value:(tile, reverse, alt = false) => {
            const dir = ['north', 'east', 'south', 'west'];
            let facingIndex = dir.indexOf(tile.state.facing);
            if (alt) {
                if (!reverse) {
                    facingIndex = ++facingIndex % 4;
                } else {
                    facingIndex--;
                    if (facingIndex < 0) facingIndex = 3;
                }
                tile.changeState({ facing: dir[facingIndex] });
            } else {
                const nextState = tile.state.powered === 'true' ? 'false' : 'true';
                tile.changeState({ powered: nextState });
            }
        }
    }
]);