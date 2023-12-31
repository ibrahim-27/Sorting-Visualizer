import React from "react";
import Canvas from "./components/Canvas";
import img from "../src/assets/sui.jpg";

function App() {
  return (
    <div className="bg-[#0D090A] h-screen flex items-center">
      <Canvas imageUrl={img} />
    </div>
  );
}

export default App;
