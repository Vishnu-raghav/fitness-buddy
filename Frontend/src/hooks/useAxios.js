import {useState} from "react"
import  { Axios } from "axios"

const useAxios = () => {
    const [data,setData] = useState()
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    const sendRequest = async ({url,method = 'GET',body = null,headers  = {}}) =>{
        setLoading(true)
        setError(null)
        try {
            const response = await Axios({
                url,
                method,
                data:body,
                headers 
            })
            setData(response.data.data)
        } catch (error) {
            setError(error.message || "something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return {data,loading,error,sendRequest}
}

export default useAxios