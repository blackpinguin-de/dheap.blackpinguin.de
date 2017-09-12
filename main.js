/*
    Quellen:
        Tree Layout - https://github.com/mbostock/d3/wiki/Tree-Layout
        Example: Radial Reingold–Tilford Tree - http://bl.ocks.org/mbostock/4063550
*/

//bekannte Dinge im DOM
var svg, textChangeD, butChangeD, textInsert, butInsert, textRndD, textChange,
    textRndN, butRandom, butStep, butSkip, cbAutoplay, rbChange, rbRemove;

var heap, tree;         // dHeap und Tree-Layout
var autoplay = false;   // ob Heap-Operation automatisch ablaufen sollen
var d = 2;              // max. Grad der inneren Knoten des Heaps
var w, h;               // Ausmaße des SVG-Objektes
var skipTick = false;   // Autoplay einen Tick überspringen oder nicht
var clickmode = false;  // true: Ändern, false: Entfernen

//####    globale variablen
//######################################################################
//######################################################################
//####    init

function init(){
    //select DOM Elements
    svg = d3.select("#svg");
    textChangeD = d3.select("#textChangeD");
    butChangeD = d3.select("#butChangeD");
    textInsert = d3.select("#textInsert");
    butInsert = d3.select("#butInsert");
    textRndD = d3.select("#textRndD");
    textRndN = d3.select("#textRndN");
    textChange = d3.select("#textChange");
    butRandom = d3.select("#butRandom");
    butStep = d3.select("#butStep");
    butSkip = d3.select("#butSkip");
    cbAutoplay = d3.select("#cbAutoplay");
    rbChange = d3.select("#rbChange");
    rbRemove = d3.select("#rbRemove");

    //Ausmaße, mit manuellem Padding mittels g
    w = Number(svg.attr("width")) - 40;
    h = Number(svg.attr("height")) - 40;
    svg = svg.select("g");

    //Enter im Textfeld führt auch die jeweilige Aktion aus
    doClickOnEnter(textChangeD, butChangeD);
    doClickOnEnter(textInsert, butInsert);
    doClickOnEnter(textRndD, butRandom);
    doClickOnEnter(textRndN, butRandom);

    //Autoplay ein-/ausschalten
    cbAutoplay.on("click", function(){
        autoplay = Boolean(cbAutoplay.property("checked"));
    });
    autoplay = Boolean(cbAutoplay.property("checked"));

    //Radiobuttons
    var clicker = function(){
        clickmode = Boolean(rbChange.property("checked"));
    };
    rbChange.on("click", clicker);
    rbRemove.on("click", clicker);
    clickmode = Boolean(rbChange.property("checked"));

    //Layout Objekt erzeugen
    tree = d3.layout.tree().size([w, h]);

    //Heap erstellen
    example(0);

    //tick für Autoplay
    setInterval(function(){
        if(autoplay && !skipTick){
            doStep();
        }
        skipTick = false;
    }, 2000);
}

//####    init
//######################################################################
//######################################################################
//####    changeD

//d ändern
function changeD(){
    doIfValueIsANumber(textChangeD, function(value){
        if(value > 0){
            d = value;
            heap = new dHeap(d);
            update();
        }
    });
}

//####    changeD
//######################################################################
//######################################################################
//####    do*

//neuen node hinzufügen
function doInsert(){
    doIfValueIsANumber(textInsert, function(value){
        heap.insert(value);
        update();
    });
}

//einzelnen Schritt der Heap Algorithmen
function doStep(){
    heap.step();
    update();
}

//solange Schritte bis Algorithmus terminiert
function doSkip(){
    heap.skip();
    update();
}

//####    do*
//######################################################################
//######################################################################
//####    randomHeap

//erzeuge einen zufälligen Heap
function randomHeap(d, n){
    if( isUndefined(d) ) d = Number(textRndD.property("value"));
    if( isUndefined(n) ) n = Number(textRndN.property("value"));
    heap = dHeap.random(d, n);
    update();
}

//####    randomHeap
//######################################################################
//######################################################################
//####    update

//nach Operation auf den Heap ausführen
function update(){
    //Baum neu zeichnen
    redraw();

    //nur sinnvolle Inputs aktivieren
    var onready = heap.ready() ? null : "disabled";
    var onbusy = heap.ready() ? "disabled" : null;
    textChangeD.attr("disabled", onready);
    butChangeD.attr("disabled", onready);
    textInsert.attr("disabled", onready);
    butInsert.attr("disabled", onready);
    butStep.attr("disabled", onbusy);
    butSkip.attr("disabled", onbusy);

    //eine Iteration des Autoplays auslassen
    skipTick = true;
}

//####    update
//######################################################################
//######################################################################
//####    redraw

//Heap hat sich geändert, zeichne nun neu
var redraw = function(){

    //private function:
    var onClick = function(d, i){ //bei einem Klick auf einen Knoten
        //gucke welcher Modus eingestellt ist
        if(clickmode){
            doIfValueIsANumber(textChange, function(value){
                //Ändere den Wert des Knotens
                heap.change(d.index, value);
                update();
            });
        } else {
            //Entferne den Knoten
            heap.remove(d.index);
            update();
        }
    };

    //private function:
    //Rekursiv aus dem Heap ein Objekt für das Tree-Layout bauen
    var heap2Object = function(){
        //private rekursive sub Funktion
        var recursion = function(i){
            //Name
            var name = ""+heap.get(i); //als String

            //Kind-Elemente (rekursiv)
            var cs = heap.childrens(i).map(recursion); //Rekursion
            if(cs.length == 0) cs = undefined; //darf kein leeres Array sein.

            //Farbe
            var fill = undefined;
            if (heap.i() == i) fill = "red";
            else if (heap.j() == i) fill = "orange";
            else if (heap.k() && heap.k().indexOf(i) !== -1) fill = "lightblue";

            //Objekt zusammensetzen
            return {name: name, children: cs, fill: fill, index: i};
        };
        //Rekursions-Aufruf, beginne beim root-Element mit Index 0
        return function(){ return recursion(0) };
    }();

    //public function:
    return function(){
        //alten Baum vollständig entfernen
        svg.selectAll("line").remove();
        svg.selectAll("svg").remove();

        if(heap.length() == 0) return;

        var treeData = heap2Object();
        var nodeData = tree.nodes(treeData);
        var linkData = tree.links(nodeData);

        //erst die Linien zwischen den Baumknoten einfügen
        var links = svg.selectAll("line")
            .data(linkData).enter().append("line")
                .attr("x1", function(d){return d.source.x})
                .attr("y1", function(d){return d.source.y})
                .attr("x2", function(d){return d.target.x})
                .attr("y2", function(d){return d.target.y})
        ;

        //dann die Baumknoten einfügen
        var nodes = svg.selectAll("svg")
            .data(nodeData).enter().append("svg")
                .attr("x", function(d){return d.x})
                .attr("y", function(d){return d.y})
                .on("click", onClick)
                .each(makeSvgCircle)
        ;

    }; //end of return
}();
