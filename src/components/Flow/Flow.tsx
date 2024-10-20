import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { FlowProps } from "../../types";
import css from "./Flow.module.css";

const Flow: React.FC<FlowProps> = ({ graphData }) => {
  const { initialEdges, initialNodes } = graphData;
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className={css.flowDiv}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange as (changes: NodeChange[]) => void}
        onEdgesChange={onEdgesChange as (changes: EdgeChange[]) => void}
        onConnect={onConnect}
        className={css.flow}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Flow;
