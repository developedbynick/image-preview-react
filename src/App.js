// import logo from './logo.svg';
import "./App.css";
import { useState, useRef } from "react";

function App() {
  const inputFileRef = useRef();
  const [imgSrc, setImgSrc] = useState("");
  const [imgTitle, setImageTitle] = useState("");
  const handleInputWindow = () => {
    inputFileRef.current.click();
  };
  const handleImageSubmission = (e) => {
    const files = [...e.target.files];
    files.forEach((file) => {
      // 0) Formatting and setting title.
      const title = file.name.split("-").join(" ");
      console.log(title);
      setImageTitle(title.substr(0, 25));
      //1) Validating
      if (!file.type.startsWith("image/"))
        throw new Error("File/s are not type  of image.");
      // 2) Intializing a file reader to read image file
      const FR = new FileReader();
      // 3) Reading file.(It will take time to read, so we need an event for 'load')
      FR.readAsDataURL(file);
      // 4) Listening for file reading completion
      FR.addEventListener("load", function (data) {
        // 4.1) Setting the result as the image source.
        setImgSrc(this.result);
      });
    });
  };
  return (
    <div className="App">
      <div className="drag-n-drop-container">
        <nav>
          <h2>Browse your device to preview images!</h2>
          <input
            type="file"
            onChange={handleImageSubmission}
            ref={inputFileRef}
            style={{ display: "none" }}
          />
          <button onClick={handleInputWindow}>Browse computer files</button>
        </nav>
        <div className="img_preview">
          {imgSrc.length > 0 && (
            <img src={imgSrc} alt={imgTitle} className="preview" />
          )}
          {imgTitle.length > 0 && (
            <p className="img_title">
              {imgTitle}
              {imgTitle.length > 25 && "..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
