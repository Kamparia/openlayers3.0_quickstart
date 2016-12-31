window.onload = init;

function init(){

	// Overlays
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

	// Baselayers
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

	// Map Layers
	var layers = [
		baselayers,
		overlays
	];

	// Map Controls
  	var controls = [
		new ol.control.Zoom(),
  		new ol.control.OverviewMap(),
  		new ol.control.Attribution(),
  		new ol.control.ScaleLine(),
  		new ol.control.Rotate()
  	];

  	// Map View
	var view = new ol.View({
		//projection: 'EPSG:4326',
		center: [-10997148, 4569099],
		zoom: 4,
		minZoom: 4,
		maxZoom: 20
	});

	// Map
	var map = new ol.Map({
		layers: layers,
		controls: controls,
		target: 'map',
		view: view
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

	// Context Menu
	var add_marker = function(){

	};
	var zoom_extent = function(){
		map.setView(
			new ol.View({
				center: [-10997148, 4569099],
				zoom: 4,
				minZoom: 4,
				maxZoom: 20
			})
		);		
		console.log(view.calculateExtent(map.getSize()));
	};
	var download_png = function(){
        map.once('postcompose', function(event) {
          var canvas = event.context.canvas;
          canvas.toBlob(function(blob) {
            saveAs(blob, 'map.png');
          });
        });
        map.renderSync();		
	};

	var measure_line = function(){

	}

	var measure_area = function(){

	}

	var add_geolocation = function(){
		// set up geolocation to track our position
		var geolocation = new ol.Geolocation({
			tracking: true,
			projection: view.getProjection()
		});
		
		geolocation.on('change:position', function() {
			var center = geolocation.getPosition();
			console.log(center[0]);
			view.setCenter(center);
			view.setZoom(16);
		});
	};


	var contextmenu = new ContextMenu({
		width: 170,
		defaultItems: false, // defaultItems are (for now) Zoom In/Zoom Out
		items: [
			{
				text: 'Add Marker',
				icon: './plugins/contextmenu/img/marker.png',
				callback: add_marker

			},
			{
				text: 'Geolocation',
				icon: './plugins/contextmenu/img/geolocation.png',
				callback: add_geolocation
			},						
			{
				text: 'Zoom Extent',
				icon: './plugins/contextmenu/img/center.png',
				callback: zoom_extent

			},
			'-',
			{
				text: 'Measure Line',
				icon: './plugins/contextmenu/img/measure_line.png',
				callback: measure_line

			},
			{
				text: 'Measure Area',
				icon: './plugins/contextmenu/img/measure_area.png',
				callback: measure_area

			},
			'-',
			{
				text: 'Save as PNG',
				icon: './plugins/contextmenu/img/save_png.png',
				callback: download_png
			}			
		]
	});
	map.addControl(contextmenu);

}