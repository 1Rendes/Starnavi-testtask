import { render, screen } from "@testing-library/react";
import Flow from "../components/Flow";
import { GraphData } from "../types";

const mockGraphData: GraphData = {
  initialNodes: [
    {
      id: "node-1",
      type: "input",
      position: { x: 0, y: 0 },
      data: { label: "Node 1" },
    },
    {
      id: "node-2",
      type: "default",
      position: { x: 100, y: 100 },
      data: { label: "Node 2" },
    },
  ],
  initialEdges: [
    {
      id: "edge-1",
      source: "node-1",
      target: "node-2",
    },
  ],
};

test("renders Flow component with nodes and edges", () => {
  render(<Flow graphData={mockGraphData} />);

  expect(screen.getByText("Node 1")).toBeInTheDocument();
  expect(screen.getByText("Node 2")).toBeInTheDocument();
});
