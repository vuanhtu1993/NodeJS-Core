import {Graph, bellman_ford} from './graph';

const graph = new Graph();
let node0 = graph.addNode("0");
let node1 = graph.addNode("1");
let node2 = graph.addNode("2");
let node3 = graph.addNode("3");
let node4 = graph.addNode("4");
let node5 = graph.addNode("5");
let node6 = graph.addNode("6");
let node7 = graph.addNode("7");
let node8 = graph.addNode("8");

node0.addEdge(node1, 15);
node0.addEdge(node2, 13);
node0.addEdge(node3, 5);
node1.addEdge(node5, 8);
node1.addEdge(node7, 11);
node2.addEdge(node3, 18);
node2.addEdge(node4, 3);
node2.addEdge(node5, 6);
node3.addEdge(node4, 4);
node3.addEdge(node8, 18);
node4.addEdge(node5, 1);
node4.addEdge(node6, 9);
node4.addEdge(node8, 14);
node5.addEdge(node6, 16);
node5.addEdge(node7, 17);
node6.addEdge(node7, 7);
node6.addEdge(node8, 10);
node7.addEdge(node8, 12);
console.log(graph.getAllNodes());

let bellman = bellman_ford(graph, node0, node8);

console.log(bellman);