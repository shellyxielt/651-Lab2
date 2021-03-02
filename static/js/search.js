function identify(geojson){
    
    if (geojson.features.length==0){
        alert("Building permits not exist! Please choose another date range.");
        return;
    }

    var oms = new OverlappingMarkerSpiderfier(mymap);
    var popup = new L.Popup();
    oms.addListener('click', function(marker) {
    popup.setContent(marker.desc);
    popup.setLatLng(marker.getLatLng());
    mymap.openPopup(popup);
    });
    oms.addListener('spiderfy', function(markers) {
        mymap.closePopup();
    });

    var markers = L.markerClusterGroup();
    for (var i=0; i<geojson.features.length;i++){
        var datum=geojson.features[i];
        var loc = new L.LatLng(datum.geometry.coordinates[1], datum.geometry.coordinates[0]);
        var marker = new L.Marker(loc);
        var popcontent="Issued Date: "+datum.properties.issueddate+"<br>"+
                        "Workclass Group: "+datum.properties.workclassgroup+"<br>"+
                        "Contractor Name: "+datum.properties.contractorname+"<br>"+
                        "Community Name: "+datum.properties.communityname+"<br>"+
                        "Original Address: "+datum.properties.originaladdress;
        marker.desc = popcontent;
        mymap.addLayer(markers);
        oms.addMarker(marker);
        markers.addLayer(marker);
    }
}
