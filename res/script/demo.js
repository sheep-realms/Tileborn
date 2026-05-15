"use strict";

let tileborn = new Tileborn();

const $tileborn = $('#tileborn');

tileborn.on('load_map', function(map) {
    $tileborn.html(TileComponent.map(map));
});

tileborn.on('tile_update', function(tile) {
    $(`#tileborn .tile[data-index="${ tile.index }"]`).replaceWith(TileComponent.tile(tile));
});

tileborn.tileMaps.get('example').fillTile([0, 0], [15, 15], 'grass');

tileborn.loadMap('example');

