import React, { useRef, useEffect, useState } from "react";

const Canvas = ({ imageUrl }) => {
  const [ShuffledArray, setShuffledArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [isSorting, setIsSorting] = useState(false);
  const canvasRef = useRef(null);
  const width = 400;
  const height = 250;
  const delay = 1;

  {
    /* Extract RGB values */
  }
  const ExtractRGBValues = (imageData) => {
    const { data } = imageData;
    const rgbArray = [];

    for (let i = 0; i < data.length; i += 4) {
      const order = i / 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      rgbArray.push({ order, r, g, b });
    }

    return rgbArray;
  };

  {
    /* Create New Image Data */
  }
  const CreateNewImageData = (rgbArray, width, height, context) => {
    const newImageData = context.createImageData(width, height);
    const imgData = newImageData.data;

    for (let i = 0; i < imgData.length; i += 4) {
      const rgb = rgbArray[i / 4];
      imgData[i] = rgb.r;
      imgData[i + 1] = rgb.g;
      imgData[i + 2] = rgb.b;
      imgData[i + 3] = 255; // Alpha value (255 means fully opaque)
    }

    return newImageData;
  };

  {
    /* Shuffle the array */
  }
  const Shuffle = (array) => {
    const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
    setShuffledArray(shuffledArray);
  };

  {
    /* Bubble Sort Visualizer */
  }
  const BubbleSort = async (array) => {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {

        if (array[j].order > array[j + 1].order) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }

      if(i%50 === 0){
        await new Promise((resolve) => setTimeout(resolve, delay));
        setSortedArray([...array]);
      }
    }

    setSortedArray([...array]);

    return array;
  };

  {
    /* Selection Sort Visualizer */
  }
  const SelectionSort = async (array) => {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      let min_idx = i;
      for (let j = i + 1; j < n; j++) {
        if (array[j].order < array[min_idx].order) {
          min_idx = j;
        }
      }
      // Swap array[min_idx] and array[i]
      const temp = array[min_idx];
      array[min_idx] = array[i];
      array[i] = temp;

      if(i%50 === 0){
        await new Promise((resolve) => setTimeout(resolve, delay));
        setSortedArray([...array]);
      }
    }

    setSortedArray([...array]);

    return array;
  };

  {
    /* Insertion Sort Visualizer */
  }
  const InsertionSort = async (array) => {
    const n = array.length;

    for (let i = 1; i < n; i++) {
      let key = array[i];
      let j = i - 1;

      while (j >= 0 && array[j].order > key.order) {
        array[j + 1] = array[j];
        j = j - 1;
      }
      array[j + 1] = key;

      if(i%50 === 0){
        await new Promise((resolve) => setTimeout(resolve, delay));
        setSortedArray([...array]);
      }
    }

    setSortedArray([...array]);

    return array;
  };

  {
    /* Use Effect for first Render */
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const rgbArray = ExtractRGBValues(imageData);

      Shuffle(rgbArray);
    };
  }, [imageUrl]);

  {
    /* Use Effect for Shuffled Array */
  }
  useEffect(() => {
    // console.log(ShuffledArray.length > 0)
    if (ShuffledArray.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const newImageData = CreateNewImageData(
        ShuffledArray,
        width,
        height,
        ctx
      );

      ctx.putImageData(newImageData, 0, 0);
      // console.log("here")
    }
    // console.log(ShuffledArray)
  }, [ShuffledArray]);

  useEffect(() => {
    setShuffledArray(sortedArray);
  }, [sortedArray]);

  const OnSortClick = async () => {
    setIsSorting(true);
    console.log(true);
    if (selectedAlgorithm === "bubble") {
      await BubbleSort(ShuffledArray);
    } else if (selectedAlgorithm === "selection") {
      await SelectionSort(ShuffledArray);
    } else if (selectedAlgorithm === "insertion") {
      await InsertionSort(ShuffledArray);
    }

    setIsSorting(false);
  };

  return (
    <div className="h-3/4 w-full mx-auto border border-black md:w-4/5 lg:w-2/3 flex items-center justify-center bg-[#521945] text-white">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center mb-16">
          Sorting Algorithms Visualizer
        </h1>
        <canvas
          ref={canvasRef}
          className="border border-black shadow-lg mb-4"
          style={{
            maxWidth: "100%",
            borderRadius: "8px",
          }}
        />
          <div className="flex flex-col gap-2 items-center justify-center md:flex-row">
            <div className="flex gap-2 ">
              <button
                onClick={() => {
                  OnSortClick();
                }}
                className="bg-[#EAF2EF] hover:bg-[#0D090A] text-[#521945] font-bold py-2 px-6 rounded disabled:opacity-50 disabled:bg0gray-400 disabled:cursor-not-allowed"
                disabled={isSorting}
              >
                Sort
              </button>
              <button
                onClick={() => {
                  Shuffle(sortedArray);
                }}
                className="bg-[#EAF2EF] hover:bg-[#0D090A] text-[#521945] font-bold py-2 px-6 rounded disabled:opacity-50 disabled:bg0gray-400 disabled:cursor-not-allowed"
                disabled={isSorting}
              >
                Shuffle
              </button>
            </div>
            <select
              className="text-[#521945] px-2 py-1 rounded"
              value={selectedAlgorithm}
              onChange={(e) => {
                setSelectedAlgorithm(e.target.value);
              }}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
            </select>
          </div>
      </div>
    </div>
  );
};

export default Canvas;