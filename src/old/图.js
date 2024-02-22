import Queue from './queue.js';
import Dictionary from './字典.js';
function Graph() {
	this.vertexes = [];
	this.edges = new Dictionary();
	Graph.prototype.addVertex = function (v) {
		this.vertexes.push(v);
		this.edges.set(v, []);
	};
	Graph.prototype.addEdge = function (v1, v2) {
		if ((this.edges.get(v1) === this.edges.get(v2)) === undefined)
			console.log('【?】please input right point:');
		else {
			this.edges.get(v1).push(v2);
			//begin无向图
			this.edges.get(v2).push(v1);
			//end
		}
	};
	//邻接表形式打印
	Graph.prototype.toString = function () {
		console.log('++++++++++++++++++++++++++++++++');
		console.log('【!】以邻接表形式打印:');
		this.vertexes.forEach((item) => console.log(item, ':', ...this.edges.get(item)));
		console.log('----------------------------------');
	};
	//图的遍历
	Graph.prototype.initializeColor = function () {
		var colors = [];
		this.vertexes.forEach((item) => (colors[item] = 'white'));
		return colors;
	};
	//BFS(V为初始顶点)
	Graph.prototype.bfs = function (V, hander) {
		console.log('【!】广度优先遍历(BST):');
		let colors = this.initializeColor();
		let queue = new Queue();
		queue.enqueue(V);
		while (!queue.isEmpty()) {
			let v = queue.dequeue();
			let vl = this.edges.get(v);
			colors[v] = 'gray';
			vl.forEach((item) => {
				if (colors[item] == 'white') {
					colors[item] = 'gray';
					queue.enqueue(item);
				}
			});
			hander(v);
			colors[v] = 'black';
		}
	};
	//DFS(V为初始顶点)
	Graph.prototype.dfs = function (V, hander) {
		console.log('【!】深度优先遍历(DST):');
		let colors = this.initializeColor();
		this.dfsVisit(V, colors, hander);
	};
	Graph.prototype.dfsVisit = function (V, colors, hander) {
		colors[V] = 'gray';
		hander(V);
		let vl = this.edges.get(V);
		vl.forEach((item) => (colors[item] == 'white' ? this.dfsVisit(item, colors, hander) : 1));
	};
}
A = new Graph();
A.addVertex('A');
A.addVertex('B');
A.addVertex('C');
A.addVertex('D');
A.addVertex('E');
A.addVertex('F');
A.addVertex('G');
A.addVertex('H');
A.addVertex('I');
A.addVertex('J');
// a = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H')
A.addEdge('A', 'B');
A.addEdge('A', 'C');
A.addEdge('A', 'D');
A.addEdge('B', 'E');
A.addEdge('B', 'F');
A.addEdge('C', 'D');
A.addEdge('C', 'G');
A.addEdge('D', 'G');
A.addEdge('D', 'H');
A.addEdge('E', 'I');
// console.log(A)
// A.toString()
let str = '';
A.bfs(A.vertexes[0], (v) => (str += v + ' '));
console.log(str);
str = '';
A.dfs(A.vertexes[0], (v) => (str += v + ' '));
console.log(str);
