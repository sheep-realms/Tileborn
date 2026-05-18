tilebornSystem.registry.loadRegistry('tile_state', 'name', [
    {
        name: 'tileborn:hidden_power_wire',
        value: {
            axis: 'axis',
            powered: 'boolean'
        }
    }, {
        name: 'tileborn:power_equipment',
        value: {
            powered: 'boolean'
        }
    }, {
        name: 'tileborn:power_hourglass',
        value: {
            level: 'level_10'
        }
    }, {
        name: 'tileborn:power_lever',
        value: {
            facing: 'facing',
            powered: 'boolean'
        }
    }, {
        name: 'tileborn:power_switch',
        value: {
            facing: 'facing',
            switch: 'boolean',
            left_powered: 'boolean',
            right_powered: 'boolean'
        }
    }, {
        name: 'tileborn:power_wire',
        value: {
            east: 'wire_connect',
            north: 'wire_connect',
            powered: 'boolean',
            south: 'wire_connect',
            west: 'wire_connect'
        }
    }, {
        name: 'tileborn:wire',
        value: {
            east: 'wire_connect',
            north: 'wire_connect',
            south: 'wire_connect',
            west: 'wire_connect'
        }
    }
]);