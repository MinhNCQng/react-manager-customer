import { useRef } from "react";
const useEditTable = ()=>{
    const dataRef = useRef()
    const getTableValues = ()=>dataRef.current.getTableData()
    const getValidateValues = ()=>dataRef.current.getValidate()
    const setTableValues = (tableValues) => dataRef.current.setTableValues(tableValues)
    return {dataRef,getTableValues,getValidateValues,setTableValues}
}

export default useEditTable;