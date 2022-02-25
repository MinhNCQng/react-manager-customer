import { useState } from "react";

function useCustomerFormState(customerInfo,newRegister) {
    console.log(newRegister)
    const [isEditing, setIsEditing] = useState(newRegister ? true:false);
    const [customerData, setCustomerData] = useState(customerInfo);
    return ( {customerData,isEditing,setIsEditing,setCustomerData} );
}

export default useCustomerFormState;