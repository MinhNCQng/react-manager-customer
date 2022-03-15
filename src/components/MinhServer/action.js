import { baseFunctionURL, baseTableURL, configHeaders } from "./config"

const getFromServer = async (tableName) => {
    const res = await fetch(`${baseTableURL}${tableName}`,{
        method:"GET",
        headers: configHeaders,
    })
    const data = await res.json()
    return data
}

const postToServer = (tableName, dataObj)=>{
    fetch(`${baseTableURL}${tableName}`,{
        method:"POST",
        headers: configHeaders,
        body:JSON.stringify(dataObj)
    })
}

const callServerFunc = async (functionName, paramsReq) => {
    const res = await fetch(`${baseFunctionURL}${functionName}`,{
        method:"POST",
        headers:configHeaders,
        body:JSON.stringify(paramsReq)
    })
    const data = await res.json()
  
    return data.result;
}

const updateDbTable = (tableName,recordUpdateId,dataUpdate) => {
    fetch(`${baseTableURL}${tableName}/${recordUpdateId}`,{
        method:"PUT",
        headers: configHeaders,
        body:JSON.stringify(dataUpdate)
    })
}

const getSearchedTable = async (tableName,paramsReq) => {
    const res = await fetch(`${baseTableURL}${tableName}?`+new URLSearchParams(paramsReq),{
        method:"GET",
        headers: configHeaders
    })
    const data = await res.json()
    return data.results
}

const addNewCustomer = (customerInfo) => {
    postToServer("Customers",customerInfo)
}

const getAllCustomer = async ()=> {
    const customers = await getFromServer("Customers")
    return customers
}


export {addNewCustomer,getAllCustomer,getFromServer,postToServer,updateDbTable, callServerFunc, getSearchedTable}