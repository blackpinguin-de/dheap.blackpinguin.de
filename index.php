<!DOCTYPE html><?php include("/rcl/www/funktionen.php"); ?>
<html lang="<?php echo $rcl->lang; ?>">
  <head>
    <title><?php echo $rcl->lang("d-näre Heaps", "d-ary heaps"); ?></title>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <meta content="<?php echo $rcl->lang; ?>" name="DC.Language">
    <meta content="Robin Christopher Ladiges" name="author">
    <meta content="Robin Christopher Ladiges" name="DC.Creator">
    <meta content="all" name="robots">
    <link rel="stylesheet" type="text/css" href="style.css" >
    <script src="d3.v3.js" charset="utf-8"></script>
    <script src="util.js"></script>
    <script src="dHeap.js"></script>
    <script src="main.js"></script>
    <script src="examples.js"></script>
  </head>
  <body onload="init();">
    <div id="title">
<?php if($rcl->lang === "de") { ?>
Visualisierung <a href="https://en.wikipedia.org/wiki/D-ary_heap">d-närer Heaps</a> in <a href="http://d3js.org/">D3</a> <span>von <a href="https://rcl.blackpinguin.de/<?php if(!$rcl->langEqual) echo $rcl->lang("?lang=de","?lang=en"); ?>">Robin C. Ladiges</a></span>
<?php } else { ?>
Visualization of <a href="https://en.wikipedia.org/wiki/D-ary_heap">d-ary heaps</a> in <a href="http://d3js.org/">D3</a> <span>by <a href="https://rcl.blackpinguin.de/<?php if(!$rcl->langEqual) echo $rcl->lang("?lang=de","?lang=en"); ?>">Robin C. Ladiges</a></span>
<?php } ?>
    </div>
    <div>
        <svg id="svg" width="900" height="300">
            <g transform="translate(20,20)"></g>
        </svg>
    </div>
    <noscript>
        <p id="error"><?php echo $rcl->lang("Fehler: JavaScript wird für diese Visualisierung benötigt.", "Error: JavaScript is required for this visualization."); ?></p>
    </noscript>
    <!-- Navigation -->
    <div id="navi">
        <!-- Random -->
        <div style="background-color: #AFF;">
            <input id="textRndD" type="text" value="2" /> <?php echo $rcl->lang("Grad d", "degree d"); ?>
            <br />
            <input id="textRndN" type="text" value="10" /> <?php echo $rcl->lang("Anzahl Knoten n", "node count n"); ?>
            <br />
            <input id="butRandom" type="button" value="<?php echo $rcl->lang("zufälligen Heap erzeugen", "generate random heap"); ?>" onclick="randomHeap();" />
        </div>
        <!-- change D, Insert -->
        <div style="background-color: #AAA;">
            <input id="textChangeD" type="text" value="2" />
            <input id="butChangeD" type="button" value="<?php echo $rcl->lang("Grad ändern", "change degree"); ?>" onclick="changeD();" />
            <br />
            <input id="textInsert" type="text" value="4" />
            <input id="butInsert" type="button" value="<?php echo $rcl->lang("einfügen", "insert"); ?>" onclick="doInsert();" />
        </div>
        <!-- What to do on a node onclick -->
        <div style="background-color: #FAA;">
            <?php echo $rcl->lang("Klickverhalten:", "clicking behavior:"); ?>
            <br /><input id="rbChange" type="radio" name="radioOnClick" value="change value"/> <?php echo $rcl->lang("Wert ändern auf", "change value to"); ?>
                <input id="textChange" type="text" value="42" />
            <br /><input id="rbRemove" type="radio" name="radioOnClick" value="remove" checked="checked" /> <?php echo $rcl->lang("Knoten entfernen", "remove node"); ?>
        </div>
        <!-- Step Control -->
        <div style="background-color: #AFA;">
            <input id="butStep" type="button" value="<?php echo $rcl->lang("Schritt", "step"); ?>" onclick="doStep();"/>
            <input id="butSkip" type="button" value="<?php echo $rcl->lang("Überspringe", "skip"); ?>" onclick="doSkip();"/>
            <br/><input id="cbAutoplay" type="checkbox" name="autoplay" value="autoplay" checked="checked"> <?php echo $rcl->lang("automatisch", "auto step"); ?>
        </div>
    </div>

<div id="runtime">
<?php if($rcl->lang === "en"){ ?>
  Minimum: &Omicron;(1)
  <br/>Maximum: &Omicron;(n)
  <br/>Insert: &Omicron;(log<sub>d</sub> n)
  <br/>Remove: &Omicron;(d&middot;log<sub>d</sub> n)
  <br/>Decrease Value: &Omicron;(log<sub>d</sub> n)
  <br/>Increase Value: &Omicron;(d&middot;log<sub>d</sub> n)
<?php } else { ?>
  Minimum: &Omicron;(1)
  <br/>Maximum: &Omicron;(n)
  <br/>Einfügen: &Omicron;(log<sub>d</sub> n)
  <br/>Entfernen: &Omicron;(d&middot;log<sub>d</sub> n)
  <br/>Wert erhöhen: &Omicron;(log<sub>d</sub> n)
  <br/>Wert verringern: &Omicron;(d&middot;log<sub>d</sub> n)
<?php } ?>
</div>

<div id="language" lang="<?php
if($rcl->lang === "en"){
	echo "de\"><a href=\"";
	if($rcl->langEqual) echo "?lang=de";
	else echo ".";
	echo "\">Diese Seite auf Deutsch anzeigen</a>";
} else {
	echo "en\"><a href=\"";
	if($rcl->langEqual) echo "?lang=en";
	else echo ".";
	echo "\">view this page in english</a>";
}
?></div>

  </body>
</html>
