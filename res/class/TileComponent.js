class TileComponent {
    constructor() {}

    static map(mapData) {
        let dom = '';
        mapData.map.forEach(e => {
            dom += TileComponent.tile(e);
        });
        return `<div
            id="tileborn-map"
            style="--map-width: ${ mapData.size.width }; --map-height: ${ mapData.size.height };"
        >
            ${ dom }
        </div>`
    }

    static tile(data) {
        return `<div
            class="tile"
            data-id="${data.id}"
            data-name="${data.name}"
            data-index="${data.index}"
            data-pos-x="${data.pos.x}"
            data-pos-y="${data.pos.y}"
            style="--tile-color: ${data.color};"
        ></div>`
    }
}