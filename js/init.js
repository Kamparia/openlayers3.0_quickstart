window.onload = init;

function init(){

	var overlays = new ol.layer.Group({
		title: 'Overlays',
		layers: [
			new ol.layer.Image({
				title: 'US State Highway',
				source: new ol.source.ImageArcGISRest({
					ratio: 1,
					params: {},
					url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/' +
					'Specialty/ESRI_StateCityHighway_USA/MapServer'
				})
			})
		]
	});

	var baselayers = new ol.layer.Group({
		title: 'Baselayers',
		layers: [
			new ol.layer.Tile({
				title: 'ESRI Topo Map',
				type: 'base',				
				source: new ol.source.XYZ({
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
				    	'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
				})
			}),
			new ol.layer.Tile({
				title: 'ESRI Satellite Map',
				type: 'base',				
				source: new ol.source.XYZ({
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
				    	'World_Imagery/MapServer/tile/{z}/{y}/{x}'
				})
			}),			
			new ol.layer.Tile({
				title: 'ESRI Street Map',
				type: 'base',
				source: new ol.source.XYZ({
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
				    	'World_Street_Map/MapServer/tile/{z}/{y}/{x}'
				})
			}),
			new ol.layer.Tile({
				title: 'Open Street Map',
				type: 'base',
				source: new ol.source.OSM()
			})
		]
	});

	var layers = [
		baselayers,
		overlays
	];

  	var controls = [
		new ol.control.Zoom(),
  		new ol.control.OverviewMap(),
  		new ol.control.Attribution(),
  		new ol.control.ScaleLine(),
  		//new ol.control.MousePosition(),
  		//new ol.control.ZoomSlider(),
  		new ol.control.Rotate()
  	];

	var map = new ol.Map({
		layers: layers,
		controls: controls,
		target: 'map',
		view: new ol.View({
			center: [-10997148, 4569099],
			zoom: 4,
			minZoom: 4
		})
	});

	// LayerSwitcher
    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Layer Control' // Optional label for button
    });
    map.addControl(layerSwitcher);

	// Geocoder
	var geocoder = new Geocoder('nominatim', {
		provider: 'photon',
		lang: 'en',
		placeholder: 'Search for ...',
		limit: 5,
		debug: true,
		autoComplete: true,
		keepOpen: true
	});
	map.addControl(geocoder);

}