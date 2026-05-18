tilebornSystem.registry.loadRegistry('tile', 'name', [
    {
        name: 'tileborn:void'
    }, {
        name: 'tileborn:grass',
        color: '#408a40',
        tileset: {
            src: 'basic.png',
            pos: [0, 0],
            random_rotation: true
        }
    }, {
        name: 'tileborn:stone',
        color: '#808080',
        tileset: {
            src: 'basic.png',
            pos: [1, 0]
        }
    }, {
        name: 'tileborn:dirt',
        color: '#914f36',
        tileset: {
            src: 'basic.png',
            pos: [2, 0],
            random_rotation: true
        }
    }, {
        name: 'tileborn:water',
        color: '#2563eb',
        tileset: {
            src: 'basic.png',
            pos: [3, 0]
        }
    }, {
        name: 'tileborn:lava',
        color: '#f59e0b',
        tileset: {
            src: 'basic.png',
            pos: [4, 0]
        }
    }, {
        name: 'tileborn:sand',
        color: '#ece2be',
        tileset: {
            src: 'basic.png',
            pos: [5, 0]
        }
    }, {
        name: 'tileborn:lab_tile',
        color: '#94a3b8',
        tileset: {
            src: 'lab.png',
            pos: [0, 0]
        }
    }, {
        name: 'tileborn:lab_warning_tile',
        color: '#94a3b8',
        tileset: {
            src: 'lab.png',
            pos: [1, 0]
        }
    }, {
        name: 'tileborn:lab_border_tile',
        color: '#94a3b8',
        tileset: {
            src: 'lab.png',
            pos: [2, 0]
        }
    }, {
        name: 'tileborn:lab_cross_tile',
        color: '#94a3b8',
        tileset: {
            src: 'lab.png',
            pos: [3, 0]
        }
    }, {
        name: 'tileborn:lab_warning_line',
        states: 'tileborn:wire',
        color: '#eab308',
        tileset: {
            src: 'lab.png',
            pos: [0, 1],
            model: 'tileborn:wire'
        },
        payload: {
            update: 'tileborn:line_update'
        }
    }, {
        name: 'tileborn:lab_power_wire',
        states: 'tileborn:power_wire',
        color: '#1a7e99',
        tileset: {
            src: 'lab.png',
            pos: [0, 2],
            model: 'tileborn:power_wire'
        },
        payload: {
            interaction: 'tileborn:power_wire_interaction',
            update: 'tileborn:power_wire_update'
        }
    }, {
        name: 'tileborn:lab_power_lever',
        states: 'tileborn:power_lever',
        color: '#a23c3c',
        face_type: 'all',
        tileset: {
            src: 'lab.png',
            pos: [1, 4],
            model: 'tileborn:power_lever'
        },
        payload: {
            interaction: 'tileborn:rotatable_power_equipment_interaction'
        }
    }, {
        name: 'tileborn:lab_power_button',
        states: 'tileborn:power_equipment',
        color: '#a23c3c',
        face_type: 'all',
        tileset: {
            src: 'lab.png',
            pos: [13, 4],
            model: 'tileborn:power_equipment'
        }
    }, {
        name: 'tileborn:lab_power_hourglass',
        states: 'tileborn:power_hourglass',
        color: '#1a7e99',
        tileset: {
            src: 'lab.png',
            pos: [0, 6],
            model: 'tileborn:power_hourglass'
        },
    }, {
        name: 'tileborn:lab_hidden_power_wire',
        states: 'tileborn:hidden_power_wire',
        color: '#1a7e99',
        tileset: {
            src: 'lab.png',
            pos: [5, 4],
            model: 'tileborn:hidden_power_wire'
        },
        payload: {
            interaction: 'tileborn:hidden_power_wire_interaction'
        }
    }
]);