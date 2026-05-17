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
        name: 'tileborn:lab_wire',
        states: 'tileborn:wire',
        color: '#1a7e99',
        tileset: {
            src: 'lab.png',
            pos: [0, 2],
            model: 'tileborn:wire'
        }
    }, {
        name: 'tileborn:lab_power_lever',
        states: 'tileborn:lever',
        color: '#bf7d00',
        face_type: 'all',
        tileset: {
            src: 'lab.png',
            pos: [1, 4]
        }
    }
]);