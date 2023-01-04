import React, {useContext} from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {deleteBasketDevice} from "../../http/deviceAPI";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";

const BasketPay = observer(() => {
    const {device} = useContext(Context)
    const navigate = useNavigate()

    const onCheckOut = () => {
        deleteBasketDevice(device.basketDevices[0].basketId, 0)
            .then(() => navigate(SHOP_ROUTE))
    }

    return (
        <div>
            <hr/>
            <Row>
                <Col md={7}>
                </Col>
                <Col md={3}>
                    <label>{device.totalSum + ' руб.'}</label>
                </Col>
                <Col md={2}>
                    <Button style={{width: 150}} variant={'outline-success'} onClick={onCheckOut}>
                        Оформить заказ
                    </Button>
                </Col>
            </Row>
        </div>
    );
});

export default BasketPay;