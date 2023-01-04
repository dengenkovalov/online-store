import React, {useCallback} from 'react';
import Button from "react-bootstrap/Button";
import {deleteBasketDevice} from "../../http/deviceAPI";

const BasketDeleteButton = ({basketDevice}) => {

    const onClick = useCallback(() => {
        deleteBasketDevice(basketDevice.basketId, basketDevice.device.id)
            .then(() => window.location.reload())
    }, []);

    return (
        <Button style={{width: 90}} variant={'outline-danger'} onClick={onClick}>
            Удалить
        </Button>
    );
};

export default BasketDeleteButton;