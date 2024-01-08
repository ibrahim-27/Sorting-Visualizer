import React from "react";
import Canvas from "./components/Canvas";
import def_img from "../src/assets/img.jpg";
import { Icon } from '@iconify/react';

function App() {
  const inputRef = React.useRef(null);
  const [img, setImg] = React.useState(def_img);

  const HandleFileChange = () => {
    const file = inputRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  }

  return (
    <div className="bg-[#0D090A] h-screen flex flex-col justify-center items-center">
      <Canvas imageUrl={img} />
      <button onClick={()=>{inputRef.current.click()}} className="mt-4 flex items-center gap-2 text-[#521945] py-1 px-2 rounded bg-gray-300"><Icon className="text-lg" icon="material-symbols:file-upload" />Upload an Image</button>
      <input type="file" accept="image/*" ref={inputRef} className="hidden" id="file" onChange={HandleFileChange} />
    </div>
  );
}

export default App;
