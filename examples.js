var rndd, rndn;


var example = function(){
    //private array
    var e = [
          new dHeap(2, [2, 5, 9, 8, 11, 20, 13, 12])
        , new dHeap(1, [1, 2, 3, 4, 5])
        , new dHeap(2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    ];

    //public function
    return function example(n){
        if(0 <= n && n < e.length)
            heap = e[n]
        else
            heap = new dHeap(2);
        update();
    }
}();




