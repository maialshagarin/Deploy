import axios from "axios";
import React,{useState,useEffect} from "react";
import "./../App.css";

const Dashboard = ()=>{
    const [articles, setArticles] = useState();
    useEffect(()=>{
        axios.get("/articles")
                .then((response)=>{
                    console.log(response)
                    setArticles(<div className="shownArticles">{response.data.map((elem,i)=>{
                        return(<div className="article">
                            <h2 className="title">{elem.title} <span className="moreDetails">More Details</span> </h2>
                            <p>{elem.description}</p>
                        </div>)
                    })}</div>)
                }).catch((err)=>{
                    console.log(err)
                })
    },[])
    return (<>
        <div className="dashboard">
            <p>Dashboard</p>
            <button className = "reglog_button sections" onClick={()=>{
                axios.get("/articles")
                .then((response)=>{
                    console.log(response)
                    setArticles(<div className="shownArticles">{response.data.map((elem,i)=>{
                        return(<div className="article">
                            <h2 className="title">{elem.title} <span className="moreDetails">More Details</span> </h2>
                            <p>{elem.description}</p>
                        </div>)
                    })}</div>)
                }).catch((err)=>{
                    console.log(err)
                })
            }}>Get All Articles</button>
            {articles}
        </div>
    </>)
}

export default Dashboard