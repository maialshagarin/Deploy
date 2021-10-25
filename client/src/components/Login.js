import axios from "axios";
import React,{useState} from "react";
import "./../App.css";
import { useHistory } from "react-router-dom";

const Login = ({getToken})=>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [logResponse, setLogResponse] = useState();
    let history = useHistory();
    
    return(<>
        <div className="login">
            <p>Login:</p>
            <input className="sections" type="text" placeholder="email here" onChange={(e)=>{
                setEmail(e.target.value)
            }} />
            <input className="sections" type="password" placeholder="password here" onChange={(e)=>{
                setPassword(e.target.value)
            }} />
            <button className="sections reglog_button" onClick={async()=>{
                try {
                    const resp = await axios.post("/login",{
                        email,
                        password
                    })
                    history.push("/dashboard");
                    getToken(resp.data.token)
                }
                catch (err) {
                    if(err.response.status === 404){
                        setLogResponse(<div className="logResponse sections">The email doesn't exist</div>);
                    }
                    if (err.response.status === 403){
                        setLogResponse(<div className="logResponse sections">The password you've entered is incorrect</div>);
                    }
                }
            }} >Login</button>
            {logResponse}
        </div>
    </>)
}

export default Login