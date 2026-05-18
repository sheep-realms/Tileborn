tilebornSystem.registry.loadRegistry('tile_model', 'name', [
    {
        name: 'tileborn:hidden_power_wire',
        variants: {
            'powered=false, axis=x': { offset: [0, 0] },
            'powered=false, axis=y': { offset: [1, 0] },
            'powered=true , axis=x': { offset: [0, 1] },
            'powered=true , axis=y': { offset: [1, 1] }
        }
    }, {
        name: 'tileborn:power_equipment',
        variants: {
            'powered=false': { offset: [0, 0] },
            'powered=true': { offset: [0, 1] }
        }
    }, {
        name: 'tileborn:power_hourglass',
        variants: {
            'level=0': { offset: [0, 0] },
            'level=9': { offset: [1, 0] },
            'level=8': { offset: [2, 0] },
            'level=7': { offset: [3, 0] },
            'level=6': { offset: [4, 0] },
            'level=5': { offset: [0, 1] },
            'level=4': { offset: [1, 1] },
            'level=3': { offset: [2, 1] },
            'level=2': { offset: [3, 1] },
            'level=1': { offset: [4, 1] },
        }
    }, {
        name: 'tileborn:power_lever',
        variants: {
            'powered=false, facing=north': { offset: [0, 0] },
            'powered=false, facing=east ': { offset: [1, 0] },
            'powered=false, facing=south': { offset: [2, 0] },
            'powered=false, facing=west ': { offset: [3, 0] },
            'powered=true,  facing=north': { offset: [0, 1] },
            'powered=true,  facing=east ': { offset: [1, 1] },
            'powered=true,  facing=south': { offset: [2, 1] },
            'powered=true,  facing=west ': { offset: [3, 1] }
        }
    }, {
        name: 'tileborn:power_switch',
        variants: {
            'switch=false, facing=north, left_powered=false, right_powered=false': { offset: [0, 0] }
        }
    }, {
        name: 'tileborn:power_wire',
        variants: {
            'powered=false, north=none, east=none, south=none, west=none': { offset: [0,  0] },
            'powered=false, north=line, east=none, south=none, west=none': { offset: [1,  0] },
            'powered=false, north=none, east=line, south=none, west=none': { offset: [2,  0] },
            'powered=false, north=none, east=none, south=line, west=none': { offset: [3,  0] },
            'powered=false, north=none, east=none, south=none, west=line': { offset: [4,  0] },
            'powered=false, north=none, east=line, south=none, west=line': { offset: [5,  0] },
            'powered=false, north=line, east=none, south=line, west=none': { offset: [6,  0] },
            'powered=false, north=line, east=line, south=none, west=none': { offset: [7,  0] },
            'powered=false, north=none, east=line, south=line, west=none': { offset: [8,  0] },
            'powered=false, north=none, east=none, south=line, west=line': { offset: [9,  0] },
            'powered=false, north=line, east=none, south=none, west=line': { offset: [10, 0] },
            'powered=false, north=line, east=line, south=none, west=line': { offset: [11, 0] },
            'powered=false, north=line, east=line, south=line, west=none': { offset: [12, 0] },
            'powered=false, north=none, east=line, south=line, west=line': { offset: [13, 0] },
            'powered=false, north=line, east=none, south=line, west=line': { offset: [14, 0] },
            'powered=false, north=line, east=line, south=line, west=line': { offset: [15, 0] },
            'powered=true,  north=none, east=none, south=none, west=none': { offset: [0,  1] },
            'powered=true,  north=line, east=none, south=none, west=none': { offset: [1,  1] },
            'powered=true,  north=none, east=line, south=none, west=none': { offset: [2,  1] },
            'powered=true,  north=none, east=none, south=line, west=none': { offset: [3,  1] },
            'powered=true,  north=none, east=none, south=none, west=line': { offset: [4,  1] },
            'powered=true,  north=none, east=line, south=none, west=line': { offset: [5,  1] },
            'powered=true,  north=line, east=none, south=line, west=none': { offset: [6,  1] },
            'powered=true,  north=line, east=line, south=none, west=none': { offset: [7,  1] },
            'powered=true,  north=none, east=line, south=line, west=none': { offset: [8,  1] },
            'powered=true,  north=none, east=none, south=line, west=line': { offset: [9,  1] },
            'powered=true,  north=line, east=none, south=none, west=line': { offset: [10, 1] },
            'powered=true,  north=line, east=line, south=none, west=line': { offset: [11, 1] },
            'powered=true,  north=line, east=line, south=line, west=none': { offset: [12, 1] },
            'powered=true,  north=none, east=line, south=line, west=line': { offset: [13, 1] },
            'powered=true,  north=line, east=none, south=line, west=line': { offset: [14, 1] },
            'powered=true,  north=line, east=line, south=line, west=line': { offset: [15, 1] }
        }
    }, {
        name: 'tileborn:wire',
        variants: {
            'north=none, east=none, south=none, west=none': { offset: [0,  0] },
            'north=line, east=none, south=none, west=none': { offset: [1,  0] },
            'north=none, east=line, south=none, west=none': { offset: [2,  0] },
            'north=none, east=none, south=line, west=none': { offset: [3,  0] },
            'north=none, east=none, south=none, west=line': { offset: [4,  0] },
            'north=none, east=line, south=none, west=line': { offset: [5,  0] },
            'north=line, east=none, south=line, west=none': { offset: [6,  0] },
            'north=line, east=line, south=none, west=none': { offset: [7,  0] },
            'north=none, east=line, south=line, west=none': { offset: [8,  0] },
            'north=none, east=none, south=line, west=line': { offset: [9,  0] },
            'north=line, east=none, south=none, west=line': { offset: [10, 0] },
            'north=line, east=line, south=none, west=line': { offset: [11, 0] },
            'north=line, east=line, south=line, west=none': { offset: [12, 0] },
            'north=none, east=line, south=line, west=line': { offset: [13, 0] },
            'north=line, east=none, south=line, west=line': { offset: [14, 0] },
            'north=line, east=line, south=line, west=line': { offset: [15, 0] }
        }
    }
]);