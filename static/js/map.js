$(function() {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
});

var layer1 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1Ijoic2hlbGx5eGllbHQiLCJhIjoiY2tsb3lucWZ1MHhzYjJ4cG12djl1eWd3diJ9.9kcdVU9p_jrvgY_CCom0_g'
}),
    layer2 = L.tileLayer('https://api.mapbox.com/styles/v1/shellyxielt/cklyrrts006j517n15sbn21ug/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoic2hlbGx5eGllbHQiLCJhIjoiY2tsb3lucWZ1MHhzYjJ4cG12djl1eWd3diJ9.9kcdVU9p_jrvgY_CCom0_g'
  });

var mymap = L.map('mapid', {
    center: [51.05,-114.06],
    zoom: 13,
    layers: [layer2, layer1]
});

var baseMaps = {
  "Cities": layer1,
  "Traffic Incidents": layer2
};

var overlayMaps = {
  "Calgary": layer1
};

L.control.layers(baseMaps, overlayMaps).addTo(mymap);
