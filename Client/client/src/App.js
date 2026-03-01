import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Loading from './Components/Loading';

const App = () => {
  const [output, setOutput] = useState("");
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [dispImage, setDispImage] = useState();
  const [image, setImage] = useState("");

  const inputStyle = {
    opacity:"0",
    width: "0.1px",
    height: "0.1px",
    position: "absolute",
    backgroundColor: "#7873f5",
  }

  const handleClick = async ()=>{
    setOutput("");
    setLoding(true);
    setError(false);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("prompt", prompt);
    try{
       await axios.post("https://image-sense-server.vercel.app/", formData).then(response=>{setOutput(response.data.message); setLoding(false)});
    }
    catch(error){
      setLoding(false)
      setError(true);
    }
  }

  const imageSelected = (event)=>{
      setImage(event.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = ()=>{
          setDispImage(reader.result);
        }
    }

  return (
    <div>
      <h1>ImageSense</h1>
      <div className="input-window">
       <img src={dispImage} height={100} width={100} className='img' alt=""/>
        <input text="text" placeholder='Message ImageSense......' onChange={(e)=>{setPrompt(e.target.value)}} className='prompt'/>
        <div className="file-input ">
          <input type="file" accept="image/*" onChange={imageSelected} id="file" className="file" style={inputStyle}/>
          <label for="file">
            Select file
            <p className="file-name"></p>
          </label>
          <button onClick={handleClick} className="btn-hover color-1">Submit</button>
        </div>
      </div>
      <div className="output">
        <p className="output-heading">Output : </p>
        <div className="output-txt">
          {loding ? <Loading/> : <ReactMarkdown>{output}</ReactMarkdown>}
        </div>
        <p className="error-txt">{error? "Server is Busy Now :( Please Try Again":""}</p>
      </div>
    </div>
  )
}

export default App;
