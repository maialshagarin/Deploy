import React,{useState} from 'react';
import './App.css';
import Navigation from "./components/navigation";
import Register from "./components/Register"
import {Route} from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import NewArticle from "./components/NewArticle"

export default function App() {
  const [token, setToken] = useState("")
  const getToken = (str)=>{
    setToken(str)
    console.log(token)
  }
  return (
    <>
      <div className="mainBody">
        <Navigation token={token}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" render={()=><Login getToken={getToken}/>}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/newArticle" render={()=><NewArticle token={token}/>} />
      </div>
    </>
  );
}
