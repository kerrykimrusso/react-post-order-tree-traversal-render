const Node = {
  init: function(value) {
    this.value = value;
    this.children = [];
    return this;
  },
  addChild: function(node) {
    this.children.push(node);
    return this;
  },
};

function postOrderDfsTraversal(fn, node, depth = 0) {
  return fn(
    node, 
    node.children.map(childNode => 
      postOrderDfsTraversal(fn, childNode, depth + 1)
    ), 
    depth
  );
}

class PoDfsTraversal extends React.Component {
  static defaultProps = {
    depth: 0,
  }

  render() {
    const {node, children: renderFn, depth} = this.props;
    return renderFn(
      node,
      node.children.map(childNode => 
        <PoDfsTraversal 
          key={childNode.value.id} 
          node={childNode}
          depth={depth + 1}
        >{renderFn}</PoDfsTraversal>
      ), 
      depth
    )
  }
}

function List({id, children, ...rest}) {
  return (
    <ul id={`list_${id}`} {...rest}>
      {children}
    </ul>
  );
}

List.Item = ({id, children, ...rest}) => (
  <li id={`item_${id}`} {...rest}>
      {children}
  </li>
);

function Badge({qty}) {
  return (
    <small style={{
        background: '#ccc',
        borderRadius: '.3rem',
        padding: '.15rem .3rem',
        fontSize: '.6rem',
        verticalAlign: 'middle',
        marginLeft: '0.25rem',
      }}>{qty}</small>
  );
}
    
function renderList(node, renderedChildren, depth) {
  // max depth to render
  if(depth >= 5) return null;
  
  const { id, value } = node.value;

  const listItem = (
    <List.Item key={id} id={id} style={{pointerEvents: 'all'}}>
      <div style={{pointerEvents: 'none'}}>
        <div className='content'>
          <input type='checkbox' style={{marginRight: '.5rem', pointerEvents: 'all'}} />
          <strong>{value}</strong> 
          <Badge qty={`depth ${depth}`}/> 
          {renderedChildren.length > 0 && <Badge qty={`children ${renderedChildren.length}`} />}
        </div>
        <List id={id}>
          {renderedChildren}
        </List>
      </div>
    </List.Item>
  );
  
  // root of tree so render main wrapper
  if(depth === 0) return (
    <List key={id} id={id} onClick={e => {
        jQuery(e.target.querySelector('ul')).slideToggle(100);
    }}>
      {listItem}
    </List>
  );
  
  return listItem;
}

const branch1 = Object.create(Node).init({id: 2, value: 'Two'})
  .addChild(
    Object.create(Node).init({id: 4, value: 'Four'}).addChild(
      Object.create(Node).init({id: 5, value: 'Five'}).addChild(
        Object.create(Node).init({id: 6, value: 'Six'})
      )
    )
  )
const branch2 = Object.create(Node).init({id: 3, value: 'Three'})
  .addChild(
    Object.create(Node).init({id: 7, value: 'Seven'}).addChild(
      Object.create(Node).init({id: 8, value: 'Eight'}).addChild(
        Object.create(Node).init({id: 9, value: 'Nine'})
      )
    ).addChild(
      Object.create(Node).init({id: 10, value: 'Ten'}).addChild(
        Object.create(Node).init({id: 11, value: 'Eleven'})
      )
    ).addChild(
      Object.create(Node).init({id: 12, value: 'Twelve'}).addChild(
        Object.create(Node).init({id: 13, value: 'Thirteen'})
      )
    )
  )
const root = Object.create(Node).init({id: 1, value: 'Root'})
  .addChild(branch1)
  .addChild(branch2); 

// Example #1: As a regular function
const treeView = postOrderDfsTraversal(renderList, root);
// ReactDOM.render(treeView, document.querySelector('#app'))

    
// Example #2: As a react component
ReactDOM.render(
  <PoDfsTraversal node={root}>
    {renderList}
  </PoDfsTraversal>, 
document.querySelector('#app'))