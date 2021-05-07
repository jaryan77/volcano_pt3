function createMap(volcanoes) {
  


    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var baseMaps = {
        "StreetMap": streetmap
    };

    var overlayMaps = {
        "Volcano Eruptions": volcanoes
    };

    var map = L.map("map-id", {
        center: [0,
            0],
        zoom: 2,
        layers: [streetmap, volcanoes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}

function createMarkers(response) {
    console.log(response);
    var mtns = response.records;

    var volMarkers = [];

    for(var index = 0; index < mtns.length; index++) {
        var mtn = mtns[index].fields;

        var volMarker = L.marker(mtn.coordinates)
        .bindPopup("<h3>" + mtn.name + "<h3><h3>Type: " + mtn.type + "</h3><h3>Elevation: " + mtn.elevation + "</h3>");

        volMarkers.push(volMarker);
        
    }
    
    createMap(L.layerGroup(volMarkers));
}

d3.json("https://public.opendatasoft.com/api/records/1.0/search/?dataset=significant-volcanic-eruption-database&q=&rows=850&start=0&facet=year&facet=tsu&facet=eq&facet=name&facet=location&facet=country&facet=type&facet=status").then(createMarkers);