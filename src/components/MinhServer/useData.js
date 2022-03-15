import { useEffect, useRef } from "react"
import { useState } from "react"
import { getFromServer } from "./action"

const useData = (tableName,idKey) =>{
    const [data,setData] = useState([])
    const mountRef = useRef(true)
    const mapIdKey = (data) => data.map(ele => ({...ele,[idKey]:ele.objectId}))
    useEffect(()=>{
        getFromServer(tableName).then(data => setData(mapIdKey(data.results)))
    },[])
    useEffect(() => {
      mountRef.current = true;
    
      return () => {
        mountRef.current = false;
      }
    })
    
    return [data]
}
export default useData;