var lleno_color = '#D82A2D'; //rojo
var vacio_color = '#94C493'; //verde opaco

var vals = {
	'kcal': {
		'val': 0,
		'diario': 2000,
		'color': '#F5E834', //amarillo
		'graficar': true,
	},
	'grasa-sat': {
		'val': 0,
		'diario': 20,
		'color': '#D6C7B0', //rosado
		'graficar': true,
	},
	'sodio': {
		'val': 0,
		'diario': 2300,
		'color': '#9C5606', //cafe
		'graficar': false,
	},
	'carbohidrato': {
		'val': 0,
		'diario':300,
		'color':'#9C5606',
		'graficar':true
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
		// console.log($(window).width());
		// console.log($(window).height());

	});

	/*if ($(window).height()<=125) {
		$('#promociones article')$.each(function() {
			
		});

		$('body').scrollTop();
	};*/

	$('#resultado h1').toggle(function() {
		// resultadoAtras();
		height = $(window).height()-55;
		if ($(window).width() <= 702) {
			$(this).parent().next().animate({'height': height});
		}else{
			$(this).parent().next().animate({'height': 0});
		}
	}, function() {
		// resultadoAtras();
		$(this).parent().next().animate({'height': 140});
	}, function() {
		// resultadoAtras();
		$(this).parent().next().animate({'height': 0});
	}, function() {
		// resultadoAtras();
		$(this).parent().next().animate({'height': 140});
	});

	$('#productos article .detalle').click(function(event) {
		height = $(window).height()-55;
		$('#resultado .detalle').show();
		$('#resultado .atras').show();
		$('#resultado .contenido').animate({'height': height});
		$('#resultado .valores').hide();
		$('#resultado .graficos').hide();
		// console.log($(this).siblings('h3').text());
		producto = this;
		$('#resultado h1').text($(producto).siblings('h3').text());
		$.each(vals, function(key, val) {
			$('.detalle table .'+key+' td:last').text($(producto).parent().parent().data(key));
			// console.log($(producto).parent().parent().data(key));
			// console.log(key);
		});
		return false;
	});

	$('#resultado .atras').click(function(event) {
		resultadoAtras();
		$('#resultado .contenido').animate({'height': 140});
	});
	
	$('#productos article ').toggle(function() {
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
/*function actualizarDetalle (producto) {


}*/

function resultadoAtras(){
	$('#resultado .detalle').hide();
	$('#resultado .atras').hide();
	$('#resultado .valores').show();
	$('#resultado .graficos').show();
	$('#resultado h1').text('Recomendación diaria (2000 kcal)');
}

function actualizarValores(producto,sumar) {

	$.each(vals, function(key, val) {
		// console.log($(producto).data(key));
		val.val += $(producto).data(key)*sumar;
	});
	actualizarTabla();
	actualizarGraficos();
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
		else if (val.val<=0) {
			seriesColors = [val.color, vacio_color];
			data = [['Suma Total', 0],['Faltante Recomendado', val.diario]];
		}else if (val.val<=val.diario*0.019){
			console.log(val.diario*0.019);
			seriesColors = [val.color, vacio_color];
			data = [['Suma Total', val.diario*0.019],['Faltante Recomendado', val.diario-(val.diario*0.019)]];
		}else{
			seriesColors = [val.color, vacio_color];
			data = [['Suma Total', val.val],['Faltante Recomendado', val.diario-val.val]];
		}
		if(val.graficar){

			dibujarPieChart (key, data, seriesColors);
		}
	});
}

function dibujarPieChart (id, data, seriesColors) {
	$('#chart_'+id).empty();
	console.log(id, data);
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
				diameter: 170,
				shadowAlpha: 0.1,
				sliceMargin:10,
				shadowOffset: 2,
				shadowDepth: 4,
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
				diameter: 166,
				fill: false,
				sliceMargin:4,
				shadow: false,
				lineWidth: 4,
			}
		}, 
	});
}


