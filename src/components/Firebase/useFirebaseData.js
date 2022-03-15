import responsiveObserve from "antd/lib/_util/responsiveObserve";
import { useRef } from "react";
import { useEffect, useState } from "react";

function useFirebaseData(pathToData, keyIdName) {
  const [dataObj, setDataObj] = useState({});
  const [data,setData] = useState([])
  const [isMounted,setIsMounted] = useState(false)
  const mountRef = useRef(false)
  useEffect(()=>{
    mountRef.current = true
    return ()=>{
      mountRef.current = false
    }
  })
  useEffect(() => {
    fetch(
      `https://customermanager-2affc-default-rtdb.asia-southeast1.firebasedatabase.app/${pathToData}.json`
    ).then(res => res.json()).then(data=> mountRef.current ? setDataObj(data): null);
  }, []);
  useEffect(()=>{
    setData(dataObj ? Object.entries(dataObj).map(([key,value])=> ({...value,[keyIdName]:key})) : [])
  },[dataObj])
  
  return [data];
}

export default useFirebaseData;
