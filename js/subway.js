var lleno_color = '#D82A2D'; //rojo
var vacio_color = '#94C493'; //verde opaco

var alto_contenido = 165;
var mostrar_resultado = false;

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
	$(".cerrar").click(function () {
		$(this).parent().parent().parent().fadeOut('fast');
	})
	if ($(window).height()>=430) {
		mostrarResultado();
	};
	$('#resultado h1').click(function() {
		mostrarOcultarResultado();
	});
	$('#resultado .ocultar').click(function() {
		mostrarOcultarResultado();
	});

	$('#resultado .mas_info').click(function () {
		$("#mas_info").fadeIn('fast');
		return false;
	})
	$('#productos article').click(function(event) {
		mostrarDetalle($(this));
	});
	
	$('#productos article .agregar').toggle(function() {
		actualizarValores($(this).parent().parent(),1);
		$(this).addClass('activo');
	}, function() {
		actualizarValores($(this).parent().parent(),-1);
		$(this).removeClass('activo');
	});
	$('.categoria h2').click(function(event) {
		$(this).next().slideToggle(200);
		$(this).children('button').toggleClass('mostrar');
	});
	actualizarGraficos();
	actualizarTabla();
});
function mostrarOcultarResultado () {

	if (mostrar_resultado) {
		$("#resultado .contenido").animate({'height': 0});
		$("#resultado .ocultar").addClass('mostrar');
		mostrar_resultado = false;
	}else{
		$("#resultado .contenido").animate({'height': alto_contenido});
		$("#resultado .ocultar").removeClass('mostrar');	
		mostrar_resultado = true;	
	}
}
function mostrarResultado(){
	$("#resultado .contenido").animate({'height': alto_contenido});
	$("#resultado .ocultar").removeClass('mostrar');	
	mostrar_resultado = true;
}
function mostrarDetalle (producto) {
	$('#detalle').fadeIn('fast');
	var title = $(producto).find('h3').text();
	var image = $(producto).find('.img').css('background-image');
	$('#detalle article h3 span').text(title);
	$('#detalle article .img').css('background-image', image);
	$.each(vals, function(key, val) {
		$('#detalle table .'+key+' td:last').text($(producto).data(key));
	});
	return false;
}

function actualizarValores(producto,sumar) {

	$.each(vals, function(key, val) {
		// console.log($(producto).data(key));
		val.val += $(producto).data(key)*sumar;
	});
	if (sumar==1) {
		agregarProductoMasInfo(producto);
	} else{
		quitarProductoMasInfo(producto);
	}
	actualizarTabla();
	actualizarGraficos();
	mostrarResultado();
}
function agregarProductoMasInfo(producto){
	var title = $(producto).find('h3').text();
	var id = $(producto).data('id');
	$('#mas_info .productos_valores table:last-child .titulo').text(title);
	$('#mas_info .productos_valores table:last-child').attr('id', id);
	$.each(vals, function(key, val) {
		$('#mas_info .productos_valores table:last .'+key+' td:last').text($(producto).data(key));
	});
	$("#mas_info .productos_valores table:last-child")
	.show()
	.clone()
	.attr('id','')
	.appendTo('#mas_info .productos_valores')
	.hide();
}
function quitarProductoMasInfo (producto) {
	var id = $(producto).data('id');
	$('#mas_info #'+id).remove();
}
function actualizarTabla () {
	$.each(vals, function(key, val) {
		// console.log(key);
		$('#mas_info .valores table .'+key+' td:last').text(val.val.toFixed(2));
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


