import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react-lite";
import BasketPay from "../components/basket/basketPay";
import BasketList from "../components/basket/basketList";
import BasketEmpty from "../components/basket/basketEmpty";
import {fetchBasket, fetchBrands} from "../http/deviceAPI";

const Basket = observer(() => {
    const {device, user} = useContext(Context)

    useEffect( () => {
            fetchBrands().then(data => device.setBrands(data))
            fetchBasket(user.isUser.id)
                .then(data => {
                    device.setBasketDevices(data.rows)
                    const totalSum = device.basketDevices.reduce((sum, item) => sum + item.sum, 0)
                    device.setTotalSum(totalSum)
                })
        }, []
    )

    return (
        <Container>
            { !(device.basketDevices.length) ?
                <Form className="align-items-center mt-4">
                    <BasketEmpty/>
                </Form>
                :
                <Form>
                    <BasketList />
                    <BasketPay />
                </Form>
            }
        </Container>
    );
});

export default Basket;