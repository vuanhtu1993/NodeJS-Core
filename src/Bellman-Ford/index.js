import {Graph, bellman_ford} from './graph';

const graph = new Graph();
// 8 end point
// let node0 = graph.addNode("0");
// let node1 = graph.addNode("1");
// let node2 = graph.addNode("2");
// let node3 = graph.addNode("3");
// let node4 = graph.addNode("4");
// let node5 = graph.addNode("5");
// let node6 = graph.addNode("6");
// let node7 = graph.addNode("7");
// let node8 = graph.addNode("8");
//
// node0.addEdge(node1, 15);
// node0.addEdge(node2, 13);
// node0.addEdge(node3, 5);
// node1.addEdge(node5, 8);
// node1.addEdge(node7, 11);
// node2.addEdge(node3, 18);
// node2.addEdge(node4, 3);
// node2.addEdge(node5, 6);
// node3.addEdge(node4, 4);
// node3.addEdge(node8, 18);
// node4.addEdge(node5, 1);
// node4.addEdge(node6, 9);
// node4.addEdge(node8, 14);
// node5.addEdge(node6, 16);
// node5.addEdge(node7, 17);
// node6.addEdge(node7, 7);
// node6.addEdge(node8, 10);
// node7.addEdge(node8, 12);

// 20 end point

let node0 = graph.addNode("0");
let node1 = graph.addNode("1");
let node2 = graph.addNode("2");
let node3 = graph.addNode("3");
let node4 = graph.addNode("4");
let node5 = graph.addNode("5");
let node6 = graph.addNode("6");
let node7 = graph.addNode("7");
let node8 = graph.addNode("8");
let node9 = graph.addNode("9");
let node10 = graph.addNode("10");
let node11 = graph.addNode("11");
let node12 = graph.addNode("12");
let node13 = graph.addNode("13");
let node14 = graph.addNode("14");
let node15 = graph.addNode("15");
let node16 = graph.addNode("16");
let node17 = graph.addNode("17");
let node18 = graph.addNode("18");
let node19 = graph.addNode("19");
let node20 = graph.addNode("20");

node0.addEdge(node2, 4);
node0.addEdge(node3, 1);
node1.addEdge(node2, 6);
node1.addEdge(node4, 5);
node2.addEdge(node0, 4);
node2.addEdge(node1, 6);
node2.addEdge(node3, 3);
node2.addEdge(node4, 4);
node2.addEdge(node5, 6);
node3.addEdge(node0, 1);
node3.addEdge(node2, 3);
node3.addEdge(node5, 12);
node3.addEdge(node6, 7);
node4.addEdge(node1, 5);
node4.addEdge(node2, 4);
node4.addEdge(node5, 10);
node4.addEdge(node16, 9);
node5.addEdge(node2, 6);
node5.addEdge(node3, 12);
node5.addEdge(node4, 10);
node5.addEdge(node11, 8);
node6.addEdge(node3, 7);
node6.addEdge(node7, 2);
node6.addEdge(node8, 4);
node6.addEdge(node9, 6);
node6.addEdge(node10, 8);
node11.addEdge(node5, 8);
node11.addEdge(node12, 12);
node11.addEdge(node13, 11);
node11.addEdge(node14, 10);
node11.addEdge(node15, 9);
node16.addEdge(node4, 9);
node16.addEdge(node17, 7);
node16.addEdge(node18, 8);
node16.addEdge(node19, 6);
node16.addEdge(node20, 4);

console.log(graph.getAllNodes());

let bellman = bellman_ford(graph, node0, node20);

console.log(bellman);