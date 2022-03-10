import { useState } from "react";

function useCustomerFormState(newRegister) {
    const [isEditing, setIsEditing] = useState(newRegister ? true:false);
    return ( {isEditing,setIsEditing} );
}

export default useCustomerFormState;