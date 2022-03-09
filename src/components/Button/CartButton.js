import { Button } from "antd"

const CartButton = ({onButtonClick, text, htmlType}) => {
    return <Button htmlType={htmlType} type="primary" >
        {text}
    </Button>
}

export default CartButton