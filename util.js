
//Zufallszahl zwischen zwei Zahlen (inklusive)
function rnd(min, max){
    if(isNaN(min)) min = 0;
    if(isNaN(max)) max = 1;
    if(max > min){
        //tausche
        var tmp = min;
        min = max;
        max = tmp;
    }
    return Math.floor(Math.random()*(max-min+1)) + min;
}

function isArray(a) { return a instanceof Array }
function isFunction(f) { return f instanceof Function }
function isNumber(x){ return !isNaN(x) }

function isDefined(x){ return x !== undefined }
function isUndefined(x){ return !isDefined(x) }

//Tausche zwei Werte in einem Array mittels Index
Array.prototype.swap = function(a, b){
    var arr = this.valueOf();
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

//ist die Zahl zwischen den anderen beiden (inklusive)?
Number.prototype.isBetween = function(min, max){
    if(isNaN(min)) return false;
    if(isNaN(max)) return false;
    return (min <= this.valueOf()) && (this.valueOf() <= max);
}

//führe n mal eine Funktion f aus
Number.prototype.times = function(f){
    if( isFunction(f) )
        for(var i = 0; i < this.valueOf(); i++)
            f(this.valueOf());
}

//wenn in dem text input enter gedrückt wird betätige den button
function doClickOnEnter(text, button){
    text.on("keypress", function(){
        if(d3.event.keyCode == 13){ // wurde Enter gedrückt
            var click = button.node().onclick;
            if(isFunction(click)) // existiert eine Click-Funktion
                click();
            else
                console.warn("not a function");
        }
    });
}

//führe Funktion f aus, wenn das value des inputs eine Zahl ist
function doIfValueIsANumber(text, f){
    var x = Number(text.property("value"));
    doIfNumber(x, f);
}

//führe Funktion f aus, wenn x eine Zahl ist
function doIfNumber(x, f){
    if( isNumber(x) && isFunction(f) )
        f(x);
}

//D3 zeichne einen Kreis und den Text in einem SVG Element
function makeSvgCircle(data, index){
    var self = d3.select(this);

    //Text erzeugen
    var text = self.append("text")
        .attr("x", 0).attr("y",0)
        .text(data.name)
        .on("click", this.onclick)
        ;

    //Ausmaße vom Text
    var box = text.node().getBBox();

    //Kreis erzeugen, der groß genug für den Text ist
    var circle = self.insert("circle", ":first-child")
        .attr("stroke", "black")
        .attr("fill", data.fill ? data.fill : "white")
        .attr("cx", 0).attr("cy", 0)
        .attr("r", Math.sqrt(box.width*box.width + box.height*box.height)/2 + 2)
        .style("cursor","pointer")
        .on("click", this.onclick)
        ;

}
