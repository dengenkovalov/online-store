import React, {useContext} from 'react';
import Button from "react-bootstrap/Button";
import {changeQuantity} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {action} from "mobx";
import {Context} from "../../index";

const BasketChangeItem = observer(({basketDevice}) => {
    const {device} = useContext(Context)

    const incQuantity = action(() => {
        basketDevice.quantity++
        basketDevice.sum = basketDevice.quantity * basketDevice.device.price
        device.setTotalSum(device.totalSum + basketDevice.device.price)

        changeQuantity(basketDevice.basketId, basketDevice.device.id, basketDevice.quantity, basketDevice.sum)
    })

    const decQuantity = action(() => {
        if (basketDevice.quantity > 1) {
            basketDevice.quantity--
            basketDevice.sum = basketDevice.quantity * basketDevice.device.price
            device.setTotalSum(device.totalSum - basketDevice.device.price)

            changeQuantity(basketDevice.basketId, basketDevice.device.id, basketDevice.quantity, basketDevice.sum)
        }
    })

    return (
        <div>
            <Button variant={'outline-dark'} onClick={incQuantity}>+</Button>
            <input
                type={"text"}
                min={1}
                step={1}
                value={basketDevice.quantity}
                size={1}
                readOnly={true}
            />
            <Button variant={'outline-dark'} onClick={decQuantity}>-</Button>
            <label>{'=   ' + basketDevice.sum + ' руб.'}</label>
        </div>
    );
});

export default BasketChangeItem;