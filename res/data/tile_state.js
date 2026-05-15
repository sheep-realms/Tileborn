tilebornSystem.registry.loadRegistry('tile_state', 'name', [
    {
        name: 'tileborn:wire',
        value: {
            east: 'tileborn:wire_connect',
            north: 'tileborn:wire_connect',
            powered: 'tileborn:boolean',
            south: 'tileborn:wire_connect',
            west: 'tileborn:wire_connect'
        }
    }, {
        name: 'tileborn:lever',
        value: {
            facing: 'tileborn:facing',
            powered: 'tileborn:boolean'
        }
    }
]);