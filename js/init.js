window.onload = init;

function init(){

	var overlays = new ol.layer.Group({
		layers: [
			new ol.layer.Image({
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
		layers: [
			new ol.layer.Tile({
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

	function removeLayers(){
		for (var i = map.getLayers().getLength() - 1; i >= 0; i--) { 
		    map.removeLayer(layers[i]); 
		}     		
	}

	// Basemap Toggle Layer
	$("#layer-select").change(function() {
		var option = $("#layer-select option:selected").val();
		if (option == 'osm') {

			var osm = new ol.layer.Tile({
				source: new ol.source.XYZ({
					url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				})
			});

			baselayers.getLayers().setAt(1, osm);
		}else if (option == 'road') {

			var esri_road = new ol.layer.Tile({
				source: new ol.source.XYZ({
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
				    	'World_Street_Map/MapServer/tile/{z}/{y}/{x}'
				})
			});

			baselayers.getLayers().setAt(1, esri_road);
		}else if (option == 'imagery') {
			var esri_imagery = new ol.layer.Tile({
				source: new ol.source.XYZ({
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
				    	'World_Imagery/MapServer/tile/{z}/{y}/{x}'
				})
			});

			baselayers.getLayers().setAt(1, esri_imagery);
		}else if (option == 'relief') {
			var esri_relief = new ol.layer.Tile({
				source: new ol.source.XYZ({
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
				    	'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
				})
			});

			baselayers.getLayers().setAt(1, esri_relief);
		}else{

		}
	});	

	console.log(map.getView().getCenter());

	//map.addControl(new ol.control.OverviewMap());

}