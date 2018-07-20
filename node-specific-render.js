const Node = {
  init: function(value) {
    this.value = value;
    this.children = [];
    return this;
  },
  addChild: function(node) {
    this.children.push(node);
    return this;
  }
};

// recursive call uses child node's value.render as fn
function traverseTree(fn, node, depth = 0) {
  return fn(
    node,
    // TODO: depth + 1 === maxDepth don't render children
    node.children.map(child =>
      traverseTree(child.value.render, child, depth + 1)
    ),
    depth
  );
}

const Div = (node, children, depth) => {
  return (
    <div style={{ marginLeft: `${depth * 4}px` }}>
      <b>{node.value.value}</b>
      {children}
    </div>
  );
};

const List = (node, children, depth) => {
  return (
    <ul>
      <li>
        {node.value.value}
        {children}
      </li>
    </ul>
  );
};

const branch1 = Object.create(Node)
  .init({ id: 2, value: "Two", render: Div })
  .addChild(
    Object.create(Node)
      .init({ id: 4, value: "Four", render: List })
      .addChild(
        Object.create(Node)
          .init({ id: 5, value: "Five", render: Div })
          .addChild(
            Object.create(Node).init({ id: 6, value: "Six", render: List })
          )
      )
  );
const branch2 = Object.create(Node)
  .init({ id: 3, value: "Three", render: Div })
  .addChild(
    Object.create(Node)
      .init({ id: 7, value: "Seven", render: List })
      .addChild(
        Object.create(Node)
          .init({ id: 8, value: "Eight", render: Div })
          .addChild(
            Object.create(Node).init({ id: 9, value: "Nine", render: List })
          )
      )
  );
const root = Object.create(Node)
  .init({ id: 1, value: "Root", render: Div })
  .addChild(branch1)
  .addChild(branch2);

const treeView = traverseTree(root.value.render, root);
ReactDOM.render(treeView, document.querySelector("#app"));
