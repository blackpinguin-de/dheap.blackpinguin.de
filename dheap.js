/*
    Quellen:
        S. O. Krumke, H. Noltenmeier - Graphentheoretische Konzepte und Algorithmen
*/

function dHeap(d, initialArray){
    if(isNaN(d)) d = 2;     //Grad (Degree) von inneren Knoten
    var arr = isArray(initialArray) ? initialArray : [];

    var size = arr.length;          //Anzahl Elemente
    var stepfunction = undefined;   //Funktion für einzelne Algo.schritte

    function running(){return isDefined(stepfunction)};
    this.ready = function(){return !running();}
    this.length = function(){return size};
    this.array = function(){return arr.slice()}; //Array copy
    this.get = function(index){return arr[index]};

    //einen einzelnen Schritt im Algorithmus ausführen
    this.step = function(){
        if(isDefined(stepfunction))
            stepfunction();
    };

    //solange Schritte, bis der Algorithus beendet ist
    this.skip = function(){
        while(running())
            this.step();
    }

    //Index des Parents berechnen
    function parent(index){ return Math.ceil(index/d) - 1 };
    //Indizies der Kinder berechnen
    function childs(index){ return d3.range(index * d + 1, (index+1)*d + 1).filter(function(i){return i < size}) };
    this.childrens = function(index){ return childs(index) };

    //hervorgehobene Knoten im Algorithmus
    var _i = undefined;
    var _j = undefined;
    var _k = undefined;
    this.i = function(){return _i};
    this.j = function(){return _j};
    this.k = function(){return _k};

    //####    Misc
    //##################################################################
    //##################################################################
    //####    Einfügen

    this.insert = function(neu){
        if(running()){ alert("Error: processing"); return; }
        if(isNaN(neu)){ alert("Error: not a number"); return; }

        //ans Ende einfügen
        arr[size++] = neu;

        //Heap-Bedingung nach oben prüfen
        bubbleUp(size-1);
    };

    function bubbleUp(i){
        var p = parent(i); //Elternteil

        //wenn ein Elternteil mit größerem Wert existiert
        if( i > 0 && arr[i] < arr[p] ){
            //Knoten hervorheb en
            _i = i;
            _j = p;
            //ein einzelner Algorithmusschritt
            stepfunction = function(){
                arr.swap(i, p); //vertausche i und p
                bubbleUp(p);    //prüfe Ende
            };
            return;
        }
        //Knoten nicht hervorheben
        _i = undefined;
        _j = undefined;
        _k = undefined;
        //Algorithmus beenden
        stepfunction = undefined;
    }

    //####    Einfügen
    //##################################################################
    //##################################################################
    //####    Entfernen

    this.remove = function(index){
        if(running()){ alert("Error: processing"); return; }
        if(isNaN(index)){ alert("Error: index not a number"); return; }
        if(index < 0 || size < index){ alert("Error: index out of range"); return;}

        //letztes element entfernen
        var last = arr[size-1]; //wert des letzten elementes
        arr[(size--)-1] = undefined; //entferne

        //ändere zu entfernendes element zum Wert des ehemals letzten
        this.change(index, last);
    };

    // O(d)
    function minChild(cs){
        var min = cs[0];
        for(var i=1; i<cs.length; i++){
            if(arr[cs[i]] <= arr[min]) {
                min = cs[i];
            }
        }
        return min;
    }

    function bubbleDown(i){
        var cs = childs(i); //Indizies der Kinder von i

        if(cs.length != 0){ //wenn Kinder existieren
            var c = minChild(cs); //Index des Kindes mit dem kleinsten Wert

            //wenn ein Kind mit kleinerem Wert existiert
            if(arr[c] < arr[i]){
                //Knoten hervorheben
                _i = i;
                _j = c;
                _k = cs;
                //ein einzelner Algorithmusschritt
                stepfunction = function(){
                    arr.swap(i, c); //vertausche i und c
                    bubbleDown(c);  //prüfe Ende
                }
                return;
            }
        }
        //Knoten nicht hervorheben
        _i = undefined;
        _j = undefined;
        _k = undefined;
        //Algorithmus beenden
        stepfunction = undefined;
    }

    //####    Entfernen
    //##################################################################
    //##################################################################
    //####    Ändern

    this.change = function(index, neu){
        if(running()){ alert("Error: processing"); return; }
        if(index > size){ alert("Error: non existing index"); return;}

        //alter Wert
        var old = arr[index];

        //keine Änderung? fertig.
        if(neu == old) return;

        //Wert ändern
        arr[index] = neu;

        //Umverschieben, damit Heap-Bedingung erfüllt sind
        if(neu < old)   bubbleUp(index);   // nach oben
        else            bubbleDown(index); // nach unten
    };

}

//zufälligen Heap erzeugen
dHeap.random = function(d, n){
    if( !isNumber(d) || d<1 ) d = rnd(1, 6);
    if( !isNumber(n) || n<1 ) n = rnd(1, 10);

    var h = new dHeap(d);

    n.times(function(){
        h.insert(rnd(-20, +20));
        h.skip();
    });

    return h;
}
