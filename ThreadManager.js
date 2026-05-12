class ThreadManager {
  constructor() {
    this.nodes = new Map();
  }

  // Метод 1: Додавання вузла (Логіка: перевірка контенту та ієрархії)
  addNode(id, parentId, content) {
    if (!content || !content.trim()) throw new Error("Content cannot be empty");
    if (this.nodes.has(id)) throw new Error("Node with this ID already exists");
    if (parentId !== null && !this.nodes.has(parentId)) throw new Error("Parent node not found");

    const newNode = { id, parentId, content, children: [] };
    this.nodes.set(id, newNode);

    if (parentId) {
      this.nodes.get(parentId).children.push(id);
    }
    return newNode;
  }

  // Метод 2: Пошук шляху до кореня (Логіка: цикл по ієрархії)
  getPathToRoot(nodeId) {
    const path = [];
    let currentId = nodeId;
    while (currentId !== null) {
      const node = this.nodes.get(currentId);
      if (!node) break;
      path.push(node.id);
      currentId = node.parentId;
    }
    return path.reverse();
  }

  // Метод 3: Глибина гілки (Логіка: рекурсія)
  getMaxDepth(startNodeId) {
    const node = this.nodes.get(startNodeId);
    if (!node) return 0;
    if (node.children.length === 0) return 1;
    const depths = node.children.map(childId => this.getMaxDepth(childId));
    return 1 + Math.max(...depths);
  }
}

module.exports = ThreadManager;