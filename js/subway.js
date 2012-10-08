var lleno_color = '#D82A2D'; //rojo
var vacio_color = '#94C493'; //verde opaco

var vals = {
	'kcal': {
		'id':'chart_kcal',
		'val': 0,
		'diario': 20,
		'color': '#F5E834', //amarillo
		'graficar': true,
	},
	'grasa_sat': {
		'id':'chart_grasa-sat',
		'val': 0,
		'diario': 40,
		'color': '#D6C7B0', //rosado
		'graficar': true,
	},
	'sodio': {
		'id':'chart_potasio',
		'val': 0,
		'diario': 60,
		'color': '#9C5606', //cafe
		'graficar': true,
	},
}

jQuery(document).ready(function() {
	$(window).resize(function(event) {
		$('footer .window_width').html($(window).width());
	});
	/*$('#productos article').click(function(event) {
		$(this).children('.agregar').toggleClass('activo');
		// agregarCaloria($(this).data('kcal'));
	});*/
	$('#productos article').toggle(function() {
		actualizarValores(this,1);
		$(this).find('.agregar').addClass('activo');
	}, function() {
		actualizarValores(this,-1);
		$(this).find('.agregar').removeClass('activo');
	});
	
	
	$('.categoria h2').click(function(event) {
		$(this).next().slideToggle(200);
		$(this).children('button').toggleClass('mostrar');
	});

	actualizarGraficos();

});

function actualizarValores(producto,sumar) {

	vals.kcal.val += $(producto).data('kcal')*sumar;
	vals.grasa_sat.val += $(producto).data('grasa-sat')*sumar;
	vals.sodio.val += $(producto).data('sodio')*sumar;
	actualizarGraficos();
	$('footer .kcal').html(vals.kcal.val.toFixed(2));
}
function actualizarGraficos () {

	$.each(vals, function(i, val) {
		if (val.val>=val.diario) {
			seriesColors = [lleno_color, vacio_color];
			data = [
				['Suma Total', val.diario],['Faltante Recomendado', 0]
			];
		}
		else{
			seriesColors = [val.color, vacio_color];
			data = [
				['Suma Total', val.val],['Faltante Recomendado', val.diario-val.val]
			];
		}
		if (val.val<=0) {
			data = [
				['Suma Total', 0],['Faltante Recomendado', val.diario]
			];
		}

		if(val.graficar){
			dibujarPieChart (val.id, data, seriesColors);
		}

	});

}

function dibujarPieChart (id, data, seriesColors) {
	$('#'+id).empty();

	var plot2 = $.jqplot (id, [data], 
	{
		seriesColors: seriesColors,
		gridPadding: {top:0, bottom:0, left:0, right:0},
		grid: {
			drawBorder: false,
			background: 'transparent',
			shadow:false,
	    },
		seriesDefaults: {
			renderer: $.jqplot.PieRenderer,
			shadowAngle: 90,
			rendererOptions:{
				diameter: 85,
				shadowAlpha: 0.1,
				sliceMargin:5,
				shadowOffset: 2,
				shadowDepth: 2,
			},
		},
	});

	var plot2 = $.jqplot (id, [data], 
	{
		seriesColors: ["#fff", "#fff"],
		gridPadding: {top:0, bottom:0, left:0, right:0},
		grid: {
	            drawBorder: false, 
	            background: 'transparent',
	            shadow:false
	    },
		seriesDefaults: {
			renderer: $.jqplot.PieRenderer, 
			rendererOptions:  {
				diameter: 83,
				fill: false,
				sliceMargin:2,
				shadow: false,
				lineWidth: 2,
			}
		}, 
	});
}


