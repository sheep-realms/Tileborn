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
        color: '#f59e0b'
    }, {
        name: 'tileborn:wire',
        states: 'tileborn:wire',
        color: '#06b6d4'
    }, {
        name: 'tileborn:lever',
        states: 'tileborn:lever',
        color: '#155e75'
    }
]);