import axios from "axios";
import React,{useState} from "react";
import "./../App.css";

const NewArticle = ({token})=>{
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [response, setResponse] = useState();
    return (<>
        <div className="newArticle">
            <p>NewArticle:</p>
            <input className="sections" type="text" placeholder="Title here" onChange={(e)=>{
                setTitle(e.target.value)
            }}/>
            <textarea className="sections" name="description" placeholder="Description here" style={{height: "100px"}} onChange={(e)=>{
                setDescription(e.target.value)
            }}></textarea>
            <button className="sections reglog_button" onClick={async ()=>{
                try{
                    const articleSave = await axios.post("/articles",{
                        title,
                        description
                    },{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    console.log(articleSave);
                    setResponse(<div className="regResponse sections">The article has been created successfully</div>);
                } catch(err){
                    console.log(err)
                    setResponse(<div className="regResponse sections">Error happened while creating a new article, please try again</div>);
                }
            }}>Create New Article</button>
            {response}
        </div>
        
    </>)
}

export default NewArticle