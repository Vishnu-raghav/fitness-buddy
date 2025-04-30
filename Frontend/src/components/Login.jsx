import { useState } from "react";
import {useSelector,useDispatch} from "react-redux"
import {Link,useNavigate} from "react-router-dom"
import {loginThunk} from "../features/auth/authThunk.js"
// import {Button} from "./Button.jsx"
// import Input from "./Input.jsx";
import {useForm} from "react-hook-form"

function Login(){
    const Dispatch = useDispatch()
    const navigate = useNavigate()

    const {loading,error} = useSelector(state => state.auth)
    const {register, handleSubmit} = useForm()
    const [localError,setLocalError] = useState("")

    const login = async (data) => {
       setLocalError("")
       try {
        await Dispatch(loginThunk(data)).unwrap();
        navigate('/')
       } catch (error) {
        setLocalError(error.message || "Login Failed")
       }
    }

    return(
        <div className="bg-amber-300 w-full">
            <div>Image</div> 
            <div>
                <h1>Welcome Back</h1>
                <p>lorem*2</p>

                <form onSubmit={handleSubmit(login)}>
                    <div>
                        <div></div>
                    </div>
                </form>

            </div>
        </div>
    )
}


export default Login