import React from "react";
import { Stage, Layer } from "react-konva";
import Node from "./components/Node";
import { StageContext } from "./context";
import "normalize.css";
import "./App.css";

function App() {
  const stage = React.useRef();

  const stageFunctions = {
    setCursor: cursor => (stage.current.container().style.cursor = cursor),
    resetCursor: () => (stage.current.container().style.cursor = "default")
  };

  return (
    <div className="App">
      <h1>Experimental Conditions Editor</h1>
      <div style={{background: "#62646a"}}>
        <Stage
          width={900}
          height={800}
          style={{
            backgroundSize: "20px 20px",
            backgroundImage:
              "linear-gradient(to right, #484a4f 1px, transparent 1px), linear-gradient(to bottom, #484a4f 1px, transparent 1px)"
          }}
          ref={stage}
        >
          <Layer>
            <StageContext.Provider value={stageFunctions}>
              <Node title="if/then" />
              <Node title="Field Value" />
              <Node title="Visibility" />
            </StageContext.Provider>
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;
