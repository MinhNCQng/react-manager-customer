import { Button } from "antd"

const CartButton = ({onButtonClick, text}) => {
    return <Button type="primary" onClick={onButtonClick} >
        {text}
    </Button>
}

export default CartButton