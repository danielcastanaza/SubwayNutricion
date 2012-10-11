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


<section id="resultado">
	<header>
		<button class="atras"></button>
		<h1>Recomendación diaria (2000 kcal)</h1>
		<button class="mover"></button>
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
						<div id="chart_sodio" style="width:180px; height:200px;"></div>
					</div>
					<h2>Sodio</h2>
			</div>
		
		</section>
		
		<section class="valores">
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
		<section class="detalle">
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
</section>


<section id="productos">

<?php foreach ($datos['categorias'] as $categoria): ?>
	
	<section class="categoria">
		<h2>
			<span><?php echo $categoria['nombre']; ?></span>
			<button class="ocultar"></button>
		</h2>
		<section class="contenido" ><div>
	<?php foreach ($categoria['productos'] as $producto): ?>

			<article 
				data-kcal="<?php echo $producto['kcal']; ?>"
				data-grasa-sat="<?php echo $producto["grasa-sat"]; ?>"
				data-sodio="<?php echo $producto['sodio']; ?>"
				data-carbohidrato="<?php echo $producto['carbohidratos']; ?>"
				data-proteina="<?php echo $producto['proteinas']; ?>"
				data-grasa-total="<?php echo $producto['grasa-total']; ?>"><div>
				<img src="images/blank.png" style="background-image: url(productos/<?php echo $producto['imagen']; ?>.jpg)" alt="tomate">
				<h3><span><?php echo $producto['nombre'] ?></span></h3>
				<button class="agregar"></button>
				<button class="detalle"></button>
			</div></article>
		
	<?php endforeach ?>
		</div></section>
	</section>
<?php endforeach ?>
	
</section>
<script class="include" type="text/javascript" src="js/jquery.jqplot.min.js"></script>
<script class="include" language="javascript" type="text/javascript" src="js/jqplot_plugins/jqplot.pieRenderer.min.js"></script>
<script type="text/javascript" src="js/subway.js"></script>

</body>
</html>
