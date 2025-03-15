class KnowledgeGraph {
    constructor() {
        this.nodes = new Set();
        this.edges = new Map();
    }

    addNode(node) {
        this.nodes.add(node);
    }

    addEdge(source, target, relationship) {
        if (!this.nodes.has(source)) this.addNode(source);
        if (!this.nodes.has(target)) this.addNode(target);

        const edgeKey = `${source}-${target}`;
        if (!this.edges.has(edgeKey)) {
            this.edges.set(edgeKey, { relationship, weight: 1 });
        } else {
            const edge = this.edges.get(edgeKey);
            edge.weight += 1;
        }
    }

    getConnections(node) {
        const connections = [];
        this.edges.forEach((value, key) => {
            const [source, target] = key.split('-');
            if (source === node) {
                connections.push({ target, ...value });
            }
        });
        return connections;
    }

    getAllNodes() {
        return Array.from(this.nodes);
    }
}

export default KnowledgeGraph;