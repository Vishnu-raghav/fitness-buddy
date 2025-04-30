import { useState } from "react";
import {useSelector,useDispatch} from "react-redux"
import {Link,useNavigate} from "react-router-dom"
import { registerThunk } from "../features/auth/authThunk";
import { useForm } from "react-hook-form";

function SignUp(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {loading,error} = useSelector(state => state.auth)
    const {register,handleSubmit} = useForm()
    const [localError,setLocalError] = useState("")

    const singup = async (data) =>{
       setLocalError("")
       try {
        await dispatch(register(data)).unwrap()
        navigate('/')
       } catch (error) {
        setLocalError(error.message || "signup failed")
       }
    }
    
    return(
        <div>
            <form action=""></form>
        </div>
    )
}

export default SignUp