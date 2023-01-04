import React, {useContext} from 'react';
import Col from "react-bootstrap/Col";
import BasketItem from "./basketItem";
import {Context} from "../../index";

const BasketList = () => {
    const {device} = useContext(Context)

    const getBrand = (id) => {
        for (let i = 0; i < device.brands.length; i++) {
            if (device.brands[i].id === id)
                return device.brands[i]
        }

        return {name: 'Ноунейм'}
    }

    return (
        <Col>
            {device.basketDevices.map(device =>
                <BasketItem key={device.id} basketDevice={device}  brand={getBrand(device.device.brandId)}/>
            )}
        </Col>
    );
};

export default BasketList;