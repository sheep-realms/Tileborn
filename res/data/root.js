tilebornSystem.registry.init([
    {
        name: 'tile',
        unique_key: 'name',
        sync: true,
        src: 'tile.js',
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