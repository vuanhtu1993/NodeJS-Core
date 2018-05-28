//@author Anh Tus

function Graph() {
  this.isWeighted = false;
  this.nodes = []
  this.addNode = addNode;
  this.removeNode = removeNode;
  this.nodeExist = nodeExist;
  this.getAllNodes = getAllNodes;

  function addNode(Name) {
    let temp = new Node(Name);
    this.nodes.push(temp);
    return temp;
  }

  function removeNode(Name) {

    let index = this.nodes.indexOf(Name);
    if (index > -1) {
      this.nodes.splice(index, 1);
      let len = this.nodes.length;

      for (var i = 0; i < len; i++) {
        if (this.nodes[i].adjList.indexOf(Name) > -1) {
          this.nodes[i].adjList.slice(this.nodes[i].adjList.indexOf(Name));
          this.nodes[i].weight.slice(this.nodes[i].adjList.indexOf(Name));
        }
      }
    }

  }

  function nodeExist(Name) {
    let index = this.nodes.indexOf(Name);
    if (index > -1) {
      return true;
    }
    return false;
  }

  function getAllNodes() {
    return this.nodes;
  }

  function getBFSTravaersal() {

  }

  function getBFSTravaersal() {

  }

  function getBFSTravaersal() {

  }

}

function Node(Name) {
  this.name = Name;
  this.adjList = [];
  this.weight = [];
  this.addEdge = addEdge;
  this.compare = compare;

  function addEdge(neighbour, weight) {
    this.adjList.push(neighbour);
    this.weight.push(weight);
  }

  function getAdjList() {
    return adjList;
  }

  function compare(node2) {
    return this.weight - node2.weight;
  }
}

function bellman_ford(graph, source, destination) {
  let previousNode = [];
  let distance = new Array();
  distance[source.name] = 0;
  let nodes = graph.getAllNodes();
  let length = nodes.length;
  for (var i = 0; i < length; i++) {
    if (nodes[i] != source) {
      distance[nodes[i].name] = Number.POSITIVE_INFINITY;
    }
  }

  for (var k = 0; k < length; k++) {
    for (var j = 0; j < length; j++) {
      let u = nodes[j];
      let adjList = u.adjList;
      for (var i = 0; i < adjList.length; i++) {
        let v = adjList[i];
        if (distance[u.name] != Number.POSITIVE_INFINITY) {
          let alt = distance[u.name] + u.weight[i];
          if (alt < distance[v.name]) {

            previousNode[v.name] = u.name;
            distance[v.name] = alt;
          }
        }
      }
    }
  }

  for (var j = 0; j < length; j++) {
    let u = nodes[j];
    let adjList = u.adjList;
    for (var i = 0; i < adjList.length; i++) {
      let v = adjList[i];
      if (distance[u.name] != Number.POSITIVE_INFINITY) {
        let alt = distance[u.name] + u.weight[i];
        if (alt < distance[v.name]) {
          return null;
        }
      }
    }
  }
  console.log(distance, previousNode);
  return distance[destination.name];

}

module.exports = {
  Graph, bellman_ford,
};