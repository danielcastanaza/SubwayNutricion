<?php

$json = file_get_contents("data/productos.json");
$datos=json_decode($json,true);

// var_dump($categorias);
echo $datos->categoria[0]->nombre;

?>

<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<meta name="language" content="en" />
	<meta name="viewport" content="user-scalable=no,initial-scale=1.0" />
	<link rel="stylesheet" type="text/css" href="css/normalize.css" media="screen, projection" />
	<link rel="stylesheet" type="text/css" href="css/main.css" />
	<link class="include" rel="stylesheet" type="text/css" href="css/jquery.jqplot.min.css" />
	<script type="text/javascript" src="js/jquery.min.js"></script>
<title>Subway - Nutrición</title>
</head>

<body>

<section id="mas_info">
	<div><div>
		<button class="cerrar"></button>
		<div>
		<section class="productos_valores">
			<table style="display:none;">
				<tr>
					<th class="titulo">Nombre del Producto</th>
					<th></th>
				</tr>
				<tr class="kcal"><td>KiloCalorías</td><td>0</td></tr>
				<tr class="carbohidrato"><td>Carbohidratos</td><td>0</td></tr>
				<tr class="proteina"><td>Proteina</td><td>0</td></tr>
				<tr class="grasa-total"><td>Grasa Total</td><td>0</td></tr>
				<tr class="grasa-sat"><td>Grasa Saturada</td><td>0</td></tr>
				<tr class="sodio"><td>Sodio</td><td>0</td></tr>
			</table>
		</section>
		<section class="valores">
			<table>
				<tr>
					<th class="titulo">Total</th>
					<th></th>
				</tr>
				<tr class="kcal"><td>KiloCalorías</td><td>0</td></tr>
				<tr class="carbohidrato"><td>Carbohidratos</td><td>0</td></tr>
				<tr class="proteina"><td>Proteina</td><td>0</td></tr>
				<tr class="grasa-total"><td>Grasa Total</td><td>0</td></tr>
				<tr class="grasa-sat"><td>Grasa Saturada</td><td>0</td></tr>
				<tr class="sodio"><td>Sodio</td><td>0</td></tr>
			</table>
		</section>
			
	</div></div></div>
</section>

<section id="detalle">
	<div><div>
		<button class="cerrar"></button>
		<article><div>
			<div class="sombra"><div class="img" style="background-image: url(productos/s-vegetariano.jpg)" alt="tomate"></div></div>
			<h3><span>Hola</span></h3>
		</div></article>

		<table>
			<tr class="kcal"><td>KiloCalorías</td><td>0</td></tr>
			<tr class="carbohidrato"><td>Carbohidratos</td><td>0</td></tr>
			<tr class="proteina"><td>Proteina</td><td>0</td></tr>
			<tr class="grasa-total"><td>Grasa Total</td><td>0</td></tr>
			<tr class="grasa-sat"><td>Grasa Saturada</td><td>0</td></tr>
			<tr class="sodio"><td>Sodio</td><td>0</td></tr>
		</table>
	</div></div>
</section>

<section id="resultado">
	<div>
	<header>
		<button class="atras"></button>
		<h1>Gráficos y detalle del total</h1>
		<button class="ocultar mostrar"></button>
	</header><!-- header -->
	
	<section class="contenido">
		
		<section class="graficos">
			
			<div class="pie_chart">
					<div class="chart">
						<div id="chart_kcal" style="width:180px; height:200px;"></div>
					</div>
					<h2>Kilocalorías</h2>
			</div>
			<div class="pie_chart">
					<div class="chart">
						<div id="chart_grasa-sat" style="width:180px; height:200px;"></div>
					</div>
					<h2>Grasa sat.</h2>
			</div>
			<div class="pie_chart">
					<div class="chart">
						<div id="chart_carbohidrato" style="width:180px; height:200px;"></div>
					</div>
					<h2>Carbohidratos</h2>
			</div>
			<a class="mas_info" href="#">Mostrar más detalles</a>
		
		</section>

		<section id="totales" class="valores">
			<div>
				<table>
					<tr class="kcal">
						<td>KiloCalorías</td>
						<td>0</td>
					</tr>
					<tr class="carbohidrato">
						<td>Carbohidratos</td>
						<td>0</td>
					</tr>
					<tr class="proteina">
						<td>Proteina</td>
						<td>0</td>
					</tr>
					<tr class="grasa-total">
						<td>Grasa Total</td>
						<td>0</td>
					</tr>
					<tr class="grasa-sat">
						<td>Grasa Saturada</td>
						<td>0</td>
					</tr>
					<tr class="sodio">
						<td>Sodio</td>
						<td>0</td>
					</tr>
				</table>
			</div>
		</section>
				
	</section>

	<footer>
		<div class="window_width"></div>
		<div class="kcal"></div>
	</footer>
</div>
</section>


<nav>
	<ul>
		<li><a href="./" class="act">Calculadora</a></li>
		<li><a href="consejos.html">Consejos</a></li>
		<!-- <li><a href="#">Ayuda</a></li> -->
	</ul>
</nav>

<section id="info">
	<p>Productos con el Aval de: <br> <img src="images/acdyn.png" width="116" /></p>
</section>

<section id="productos">

<?php
$categoria_count=1;
$producto_count=1;
 foreach ($datos['categorias'] as $categoria):?>
	
	<section class="categoria">
		<h2>
			<span><?php echo $categoria['nombre']; ?></span>
			<button class="ocultar"></button>
		</h2>
		<section class="contenido" ><div>
	<?php foreach ($categoria['productos'] as $producto): ?>

			<article 
				data-id="<?php echo $categoria_count; ?>_<?php echo $producto_count; ?>"
				data-kcal="<?php echo $producto['kcal']; ?>"
				data-grasa-sat="<?php echo $producto["grasa-sat"]; ?>"
				data-sodio="<?php echo $producto['sodio']; ?>"
				data-carbohidrato="<?php echo $producto['carbohidratos']; ?>"
				data-proteina="<?php echo $producto['proteinas']; ?>"
				data-grasa-total="<?php echo $producto['grasa-total']; ?>"><div>
				<div class="sombra"><div class="img" style="background-image: url(productos/<?php echo $producto['imagen']; ?>.jpg)"></div></div>
				<h3><span><?php echo $producto['nombre'] ?></span></h3>
				<button class="agregar"></button>
				<button class="detalle"></button>
			</div></article>
		
	<?php $producto_count++; endforeach ?>
		</div></section>
	</section>
<?php $categoria_count++; endforeach ?>
	
</section>
<script class="include" type="text/javascript" src="js/jquery.jqplot.min.js"></script>
<script class="include" language="javascript" type="text/javascript" src="js/jqplot_plugins/jqplot.pieRenderer.min.js"></script>
<script type="text/javascript" src="js/subway.js"></script>

</body>
</html>
