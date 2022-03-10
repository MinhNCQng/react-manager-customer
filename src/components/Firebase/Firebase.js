import { message } from "antd";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, set, update } from "firebase/database";
import firebaseConfig from "./FirebaseConfig";

const fb = initializeApp(firebaseConfig);

const fbStore = getDatabase(fb);

const addNewItem = (pathToItem, value, disableToast = false) => {
  const listRef = ref(fbStore, pathToItem);
  const jobRef = push(listRef);

  set(jobRef, value)
  disableToast || message.success("Add completed!")
  return jobRef.key
  
};

const updateItem = (pathToItem, value,disabledMessage) => {
    update(ref(fbStore, pathToItem), value);
    !disabledMessage && message.success("Update completed!")
};

const deleteItem = (pathToItem) => {
    set(ref(fbStore,pathToItem),{})
}

const getCurrentDayString = ()=> 
  new Date().toLocaleDateString('en-GB',{
    month:'2-digit',
    day: '2-digit',
    year:"numeric"
})

const getDataJSON = async (path,keyId) => {
  return fetch(`${firebaseConfig.databaseURL}/${path}.json`).then(res => res.json()).then(data => getDataArray(data,keyId))
}

const getDataArray = (dataDict = {}, keyId) => {
  if (!dataDict) return []
  return Object.entries(dataDict).map(([key,value]) => ({...value,[keyId]:key}))
}

export { fbStore, addNewItem, updateItem, deleteItem, getCurrentDayString, getDataJSON };
