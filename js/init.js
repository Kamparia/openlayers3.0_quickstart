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

	var view = new ol.View({
		center: [-10997148, 4569099],
		zoom: 4,
		minZoom: 4,
		maxZoom: 20
	});

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
	var elastic = function (t) {
		return Math.pow(2, -10 * t)*Math.sin((t - 0.075)*(2 * Math.PI)/0.3) + 1;
	};
	var center = function(obj, foo){
		var pan = ol.animation.pan({
			duration: 1000,
			easing: elastic,
			source: view.getCenter()
		});
		map.beforeRender(pan);
		view.setCenter(obj.coordinate);
	};

	var contextmenu = new ContextMenu({
		width: 170,
		defaultItems: true, // defaultItems are (for now) Zoom In/Zoom Out
		items: [
			{
				text: 'Center map here',
				classname: '', // add some CSS rules
				icon: '../plugins/contextmenu/img/center.png',
				callback: center // `center` is your callback function

			},
			{
				text: 'Add a Marker',
				classname: '',
				icon: '../plugins/contextmenu/img/pin_drop.png',  // this can be relative or absolute
				callback: ''
			},
			'-'
		]
	});
	map.addControl(contextmenu);

}