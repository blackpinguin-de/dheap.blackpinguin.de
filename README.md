# English

There was the voluntary option to develop a visualization with [D3](http://d3js.org/) in JavaScript for the oral examination in the compulsory elective course [Selected Topics of Media Computer Science](https://rcl.blackpinguin.de/haw/bms/14ss/MINF/)[1] of [B.Sc. Media Systems (B-MS)](https://rcl.blackpinguin.de/haw/bms/) in the summer semester 2014. The D3 layout for the visualization had to be one that wasn't introduced in the lectures.

Inspiried by the Attachment B - elementary data structures from the textbook Graphentheoretische Konzepte und Algorithmen[2] from S. O. Krumpke and H. Noltemeier, which explains [d-ary heaps](https://en.wikipedia.org/wiki/D-ary_heap), I developed a stepwise visualization of the basic dHeap operations[3] with the [D3 Tree Layout](https://github.com/mbostock/d3/wiki/Tree-Layout).

The result of this work can be viewed online [here](https://dheap.blackpinguin.de/). The loaded heap is the example from the book. First a 4 is inserted (right picture) and then the 2 gets removed.

|                  |                                  |
| ---------------- | -------------------------------- |
| __Languages__    | JavaScript, JSON, SVG, HTML, CSS |
| __Technologies__ | D3, JS Prototypes, Closures      |
| __IDE__          | Geany                            |
| __Participants__ | 1                                |

### Footnotes

- [1]	The topic this semester was visualization.
- [2]	ISBN 978-3-8348-0629-1
  [(amazon.de)](https://www.amazon.de/s/?field-keywords=ISBN+978-3-8348-0629-1)
Subject: Graph Theory
- [3]	The basic operations explained in the textbook are: insert a new node, reduce the value of a node, and remove the root node.
  
  I extended the algorithms to increase the value of a node and to remove an arbitrary node. Both with an unchanged logarithmic running time.

# Deutsch

Für die mündliche Prüfung des Wahlpflichtfaches [Ausgewählte Themen der Medieninformatik](https://rcl.blackpinguin.de/haw/bms/14ss/MINF/?lang=de)[1] im Sommersemester 2014 des Studienganges [Bachelor Media Systems (B-MS)](https://rcl.blackpinguin.de/haw/bms/?lang=de) bestand die Option, freiwillig eine Visualisierung mit [D3](http://d3js.org/) in JavaScript zu erstellen, wobei ein D3 Layout gewählt werden sollte, welches nicht bereits in der Vorlesung behandelt wurde.

Inspiriert vom Anhang B - Elementare Datenstrukturen des Buches Graphentheoretische Konzepte und Algorithmen[2] von S. O. Krumpke und H. Noltemeier, in dem [d-näre Heaps](https://en.wikipedia.org/wiki/D-ary_heap)[3] erläutert werden, entwickelte ich mittels des [D3 Tree Layouts](https://github.com/mbostock/d3/wiki/Tree-Layout) eine schrittweise Visualisierung für die grundlegenden dHeap-Operationen[4].

Das Ergebnis dieser Arbeit kann online [hier](https://dheap.blackpinguin.de/?lang=de) betrachtet werden. Der geladene Heap ist das Beispiel aus dem Buch, in dem erst eine 4 eingefügt (Bild rechts) und anschließend die 2 entfernt wird.

|                  |                                  |
| ---------------- | -------------------------------- |
| __Sprachen__     | JavaScript, JSON, SVG, HTML, CSS |
| __Technologien__ | D3, JS Prototypen, Closures      |
| __IDE__          | Geany                            |
| __Beteiligte__   | 1                                |

### Fußnoten

- [1]	Das Thema für MINF in diesem Semester war Visualisierung.
- [2]	ISBN 978-3-8348-0629-1
  [(amazon.de)](https://www.amazon.de/s/?field-keywords=ISBN+978-3-8348-0629-1)
- [3]	Ein binärer Heap ist z.B. ein d-närer Heap mit d=2. D-näre Heaps sind eine Verallgemeinerung von binären Heaps für beliebiges d (degree = Grad), was je nach Anwendungsfall zu einem besseren Laufzeitverhalten führen kann.
- [4]	Die grundlegenden Operationen, die im Buch beschrieben werden, sind: einen neuen Knoten einfügen, den Wert eines Knoten verringern und die Wurzel entfernen.
  
  Darüber hinaus habe ich die Algorithmen erweitert, um die Werte von Knoten erhöhen zu können, sowie einen beliebigen Knoten, statt nur der Wurzel, entfernen zu können. Beides bei gleichbleibender logarithmischer Laufzeit.
