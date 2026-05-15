tilebornSystem.registry.loadRegistry('tile_state_value', 'name', [
    {
        name: 'tileborn:boolean',
        value: [
            'false',
            'true'
        ],
        default_value: 'false'
    }, {
        name: 'tileborn:facing',
        value: [
            'east',
            'north',
            'south',
            'west'
        ],
        default_value: 'north'
    }, {
        name: 'tileborn:wire_connect',
        value: [
            'none',
            'line'
        ],
        default_value: 'none'
    }
]);