import { useRef } from "react";
const useEditTable = ()=>{
    const dataRef = useRef()
    const getTableValues = ()=>dataRef.current.getTableValues()
    const getValidateValues = ()=>dataRef.current.getValidateValues()
    const setTableValues = (tableValues) => dataRef.current.setTableValues(tableValues)
    return {dataRef,getTableValues,getValidateValues,setTableValues}
}

export default useEditTable;