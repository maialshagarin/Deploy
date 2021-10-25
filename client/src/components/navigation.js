import React from "react";
import "./../App.css";
import {Link} from "react-router-dom"

const Navigation = ({token})=>{
    console.log(token)
    return (
        <div style={{display:"flex", gap:"16px"}} className="navigation">
            {!token 
            ? <Link to="/login" className="logreg">Login</Link> 
            : <Link to="/dashboard" className="dashnew">Dashboard</Link>}
            {!token 
            ? <Link to="/register" className="logreg">Register</Link>
            : <Link to="/newArticle" className="logreg">new Article</Link>}
        </div>
    )
};

export default Navigation