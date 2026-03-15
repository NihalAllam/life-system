// Recursive subtask tree — depth capped at 3
function TreeNode({ node, depth = 0 }) {
  if (depth > 3) return null;

  return (
    <div className="tree-node" style={{ paddingLeft: depth * 14 }}>
      <div className="tree-node__row">
        {depth > 0 && <span className="tree-node__connector">└</span>}
        <span className="tree-node__title">{node.title}</span>
      </div>
      {node.children?.map(child => (
        <TreeNode key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function TaskTree({ tasks = [] }) {
  if (!tasks.length) return null;
  return (
    <div className="task-tree">
      {tasks.map(task => (
        <TreeNode key={task.id} node={task} />
      ))}
    </div>
  );
}
