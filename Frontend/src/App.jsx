import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
function App() {
  const [allgoals, setAllGoals] = useState()
  const [show,setshow] = useState(false)
const handler = (e) => {
  setshow(true)
  useEffect(() =>{
    axios.get("http://localhost:8000/api/v1/users/goals")
    .then((res) => {
      console.log(res.data.data);
      setAllGoals(res.data.data)
    })
    .catch((er)=>{
      console.log(er)
    })
  },[])
}
  return (
   <>
   <h1>{allgoals?.[0]?.name}</h1>
   {allgoals?.map((data)=>(
    <div
    key={data._id}
    >
      <h2>{data.name}</h2>
    </div>
   ))}
   </>

  )
}

export default App
