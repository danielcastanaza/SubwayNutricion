var lleno_color = '#D82A2D'; //rojo
var vacio_color = '#94C493'; //verde opaco

var vals = {
	'kcal': {
		'val': 0,
		'diario': 20,
		'color': '#F5E834', //amarillo
		'graficar': true,
	},
	'grasa-sat': {
		'val': 0,
		'diario': 40,
		'color': '#D6C7B0', //rosado
		'graficar': true,
	},
	'sodio': {
		'val': 0,
		'diario': 60,
		'color': '#9C5606', //cafe
		'graficar': true,
	},
	'carbohidrato': {
		'val': 0,
	},
	'proteina': {
		'val': 0,
	},
	'grasa-total': {
		'val': 0,
	},
}

jQuery(document).ready(function() {
	$(window).resize(function(event) {
		console.log($(window).width());
	});

	
	$('#resultado h1').toggle(function() {
		height = $(window).height()-55;
		if ($(window).width() <= 702) {
			$(this).parent().next().animate({'height': height});
		}else{
			$(this).parent().next().animate({'height': 0});
		}
	}, function() {
		$(this).parent().next().animate({'height': 140});
	}, function() {
		$(this).parent().next().animate({'height': 0});
	}, function() {
		$(this).parent().next().animate({'height': 140});
	});
	
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
	actualizarTabla();
});

function actualizarValores(producto,sumar) {
	$.each(vals, function(key, val) {
		val.val += $(producto).data(key)*sumar;
	});
	actualizarGraficos();
	actualizarTabla();
}
function actualizarTabla () {
	$.each(vals, function(key, val) {
		// console.log(key);
		$('.valores table .'+key+' td:last').text(val.val.toFixed(2));
	});
}
function actualizarGraficos () {

	$.each(vals, function(key, val) {
		if (val.val>=val.diario) {
			seriesColors = [lleno_color, vacio_color];
			data = [['Suma Total', val.diario],['Faltante Recomendado', 0]];
		}
		else{
			seriesColors = [val.color, vacio_color];
			data = [['Suma Total', val.val],['Faltante Recomendado', val.diario-val.val]];
		}
		if (val.val<=0) {
			data = [['Suma Total', 0],['Faltante Recomendado', val.diario]];
		}
		if(val.graficar){
			dibujarPieChart (key, data, seriesColors);
		}
	});
}

function dibujarPieChart (id, data, seriesColors) {
	$('#chart_'+id).empty();

	var plot2 = $.jqplot ('chart_'+id, [data], 
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

	var plot2 = $.jqplot ('chart_'+id, [data], 
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


