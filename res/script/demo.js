"use strict";

let tileborn = new Tileborn();
const exampleMap = tileborn.tileMaps.get('example');

const $tileborn = $('#tileborn');

$(document).on('animationend', '.debug-tile-tick-update-check', function() {
    $(this).removeClass('debug-tile-tick-update-check');
});

$(document).on('animationend', '.debug-tile-random-tick-check', function() {
    $(this).removeClass('debug-tile-random-tick-check');
});

$(document).on('click', '.tile', function() {
    const x = $(this).data('pos-x');
    const y = $(this).data('pos-y');
    exampleMap.setTile([x, y], 'stone');
});

tileborn.on('load_map', function(map) {
    $tileborn.html(TileComponent.map(map));
});

tileborn.on('tile_update', function(tile) {
    $(`#tileborn .tile[data-index="${ tile.index }"]`).replaceWith(TileComponent.tile(tile));
});

tileborn.on('debug_tile_tick_update_check', function(index) {
    $(`#tileborn .tile[data-index="${ index }"]`).addClass('debug-tile-tick-update-check');
});

// tileborn.on('debug_tile_random_tick_check', function(index) {
//     $(`#tileborn .tile[data-index="${ index }"]`).addClass('debug-tile-random-tick-check');
// });

tileborn.tileMaps.get('example').fillTile([0, 0], [15, 15], 'grass');

tileborn.loadMap('example');

