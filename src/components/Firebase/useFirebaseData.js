import responsiveObserve from "antd/lib/_util/responsiveObserve";
import { useEffect, useState } from "react";

function useFirebaseData(pathToData, keyIdName) {
  const [dataObj, setDataObj] = useState({});
  const data = Object.entries(dataObj).map(([key,value])=> ({...value,[keyIdName]:key}))
  const resolvePath = (pathUpdateList, dataUpdateObj) => {
    let newDataObj = { ...dataObj };
    let pathUpdateLength = pathUpdateList.length
    let pathUpdate = pathUpdateList.reduce((obj, path, index) => {
      if (index === (pathUpdateLength -1) ) return obj
      if (!obj[path]) obj[path] = {}
      return obj[path]
    }, newDataObj);
    if (pathUpdateLength) pathUpdate[pathUpdateList[pathUpdateLength-1]] = dataUpdateObj;
    else newDataObj = dataUpdateObj;
    setDataObj(newDataObj)
  };
  const handleDataReceived = (received) => {
    if (!received) return;
    let receivedObj = JSON.parse(received);
    let dataUpdateObj = receivedObj.data;
    let pathUpdateList = receivedObj.path
      .split("/")
      .filter((path) => path !== "");
    resolvePath(pathUpdateList, dataUpdateObj);
  };
  useEffect(() => {
    const source = new EventSource(
      `https://customermanager-2affc-default-rtdb.asia-southeast1.firebasedatabase.app/${pathToData}.json`
    );
    source.addEventListener(
      "put",
      (e) => {
        handleDataReceived(e.data);
      },
      false
    );
    return () => source.close();
  }, []);
  return [data];
}

export default useFirebaseData;
