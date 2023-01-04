import React, {useEffect, useState, useContext} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigstar.png'
import {useNavigate, useParams} from 'react-router-dom'
import {addBasketDevice, fetchOneDevice} from "../http/deviceAPI";
import {Context} from "../index";
import {BASKET_ROUTE} from "../utils/consts";

const DevicePage = () => {
    const {user} = useContext(Context)
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect( () => {
        fetchOneDevice(id).then(data => setDevice(data))
        }, [id]
    )

    const addToBasket = () => {
        addBasketDevice(user.isUser.id, device.id, device.price)
            .then(() => navigate(BASKET_ROUTE))
    }

    const pathURL = process.env.REACT_APP_API_URL + '/' + device.img

    return (
        <Container className="mt-4">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={pathURL}/>
                </Col>
                <Col md={4}>
                    <Form className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 250, height:250, backgroundSize: 'cover', fontSize: 64}}
                        >
                            {device.rating}
                        </div>
                    </Form>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{device.price} руб.</h3>
                        { user.isAuth ?
                            <Button variant={'outline-dark'} onClick={addToBasket}>
                                Добавить в корзину
                            </Button>
                            :
                            <></>
                        }
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h2>Характеристики</h2>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;