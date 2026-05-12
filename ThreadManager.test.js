const ThreadManager = require('./ThreadManager');

describe('ThreadManager Unit Tests (LeanFork Logic)', () => {
  let manager;

  beforeEach(() => {
    manager = new ThreadManager();
  });

  test('should add root node', () => {
    // Arrange & Act
    manager.addNode("root", null, "Root content");
    // Assert
    expect(manager.nodes.has("root")).toBe(true);
    // Technique: EP (Positive)
  });

  test('should throw error for empty content', () => {
    // Arrange, Act & Assert
    expect(() => manager.addNode("1", null, "   ")).toThrow("Content cannot be empty");
    // Technique: BVA (Boundary)
  });

  test('should throw error for missing parent', () => {
    expect(() => manager.addNode("child", "absent", "text")).toThrow("Parent node not found");
    // Technique: EP (Negative)
  });

  test('should prevent duplicate IDs', () => {
    manager.addNode("1", null, "First");
    expect(() => manager.addNode("1", null, "Second")).toThrow("Node with this ID already exists");
    // Technique: EP (Negative)
  });

  test('should return correct path', () => {
    manager.addNode("1", null, "A");
    manager.addNode("2", "1", "B");
    expect(manager.getPathToRoot("2")).toEqual(["1", "2"]);
    // Technique: EP (Positive)
  });

  test('should return 0 depth for non-existent node', () => {
    expect(manager.getMaxDepth("99")).toBe(0);
    // Technique: BVA
  });

  test('should calculate max depth correctly', () => {
    manager.addNode("1", null, "A");
    manager.addNode("2", "1", "B");
    manager.addNode("3", "2", "C");
    expect(manager.getMaxDepth("1")).toBe(3);
    // Technique: EP (Positive)
  });

  test('should allow multiple children for one parent', () => {
    manager.addNode("1", null, "Parent");
    manager.addNode("2", "1", "Child 1");
    manager.addNode("3", "1", "Child 2");
    expect(manager.nodes.get("1").children).toHaveLength(2);
    // Technique: EP (Positive)
  });

  test('should allow single character content', () => {
    const node = manager.addNode("1", null, "X");
    expect(node.content).toBe("X");
    // Technique: BVA
  });

  test('should return path of length 1 for root', () => {
    manager.addNode("root", null, "text");
    expect(manager.getPathToRoot("root")).toEqual(["root"]);
    // Technique: BVA
  });

  test('should return empty path for non-existent node', () => {
    expect(manager.getPathToRoot("ghost")).toEqual([]);
    // Technique: EP (Negative)
  });
});