tilebornSystem.registry.loadRegistry('tile_tag', 'name', [
    {
        name: 'tileborn:line',
        values: [
            'tileborn:lab_warning_line'
        ]
    }, {
        name: 'tileborn:line_connectable',
        values: [
            '#tileborn:line'
        ]
    }, {
        name: 'tileborn:power_button',
        values: [
            'tileborn:lab_power_button'
        ]
    }, {
        name: 'tileborn:power_equipment_interface_all',
        values: [
            '#tileborn:power_button',
            '#tileborn:power_hourglass',
            '#tileborn:power_lever',
        ]
    }, {
        name: 'tileborn:power_hourglass',
        values: [
            'tileborn:lab_power_hourglass'
        ]
    }, {
        name: 'tileborn:power_lever',
        values: [
            'tileborn:lab_power_lever'
        ]
    }, {
        name: 'tileborn:power_switch',
        values: [
            'tileborn:lab_power_switch'
        ]
    }, {
        name: 'tileborn:power_wire',
        values: [
            'tileborn:lab_power_wire'
        ]
    }, {
        name: 'tileborn:power_wire_connectable',
        values: [
            '#tileborn:power_equipment_interface_all',
            '#tileborn:power_wire'
        ]
    }, {
        name: 'tileborn:power_wire_connectable_axis_x',
        values: [
            '#tileborn:power_wire_connectable',
            'tileborn:lab_hidden_power_wire|axis=x'
        ]
    }, {
        name: 'tileborn:power_wire_connectable_axis_y',
        values: [
            '#tileborn:power_wire_connectable',
            'tileborn:lab_hidden_power_wire|axis=y'
        ]
    }, {
        name: 'tileborn:power_wire_connectable_direction_east',
        values: [
            '#tileborn:power_wire_connectable_axis_x'
        ]
    }, {
        name: 'tileborn:power_wire_connectable_direction_north',
        values: [
            '#tileborn:power_wire_connectable_axis_y'
        ]
    }, {
        name: 'tileborn:power_wire_connectable_direction_south',
        values: [
            '#tileborn:power_wire_connectable_axis_y'
        ]
    }, {
        name: 'tileborn:power_wire_connectable_direction_west',
        values: [
            '#tileborn:power_wire_connectable_axis_x'
        ]
    }, {
        name: 'tileborn:wire',
        values: [
            '#tileborn:power_wire'
        ]
    }
]);