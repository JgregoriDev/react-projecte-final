import React,{useState} from "react";
import "../assets/style/toast.css"
function Toast({ message}) {

	const [Message, setMessage] = useState("");
  
  const valor=(element)=>{

  }
	return (<div className="missatge">
    {message}
  </div>);
}

export default Toast;
