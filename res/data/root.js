tilebornSystem.registry.init([
    {
        name: 'tile',
        unique_key: 'name',
        sync: true,
        src: 'tile.js',
        default_data: {
            name: undefined,
            face_type: 'none',
            tileset: {}
        }
    }, {
        name: 'tile_model',
        unique_key: 'name',
        sync: true,
        src: 'tile_model.js',
        default_data: {
            name: undefined
        }
    }, {
        name: 'tile_state',
        unique_key: 'name',
        sync: true,
        src: 'tile_state.js',
        default_data: {
            name: undefined
        }
    }, {
        name: 'tile_state_value',
        unique_key: 'name',
        sync: true,
        src: 'tile_state_value.js',
        default_data: {
            name: undefined
        }
    }
]);