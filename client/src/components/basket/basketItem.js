import React, {useCallback} from 'react';
import {Card, Col, Image, Row, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";
import BasketDeleteButton from "./basketDeleteItem";
import BasketChangeItem from "./basketChangeItem";

const BasketItem = ({basketDevice, brand}) => {
    const navigate = useNavigate()

    const viewDevice = useCallback(() => {
        navigate(DEVICE_ROUTE + '/' + basketDevice.device.id)
    }, []);
    console.log(basketDevice.device.id)
    return (
        <Container className="mt-4">
            <Card border={'light'} >
                <Row>
                    <Col md={1}>
                        <Image
                            width={50} height={50} src={process.env.REACT_APP_API_URL + '/' + basketDevice.device.img}
                            onClick={viewDevice}
                            style={{cursor: 'pointer'}}
                        />
                    </Col>
                    <Col md={6}>
                        <div
                            className="d-flex flex-column align-items-left"
                            onClick={viewDevice}
                            style={{cursor: 'pointer'}}
                        >
                            <p>{brand.name + ' ' + basketDevice.device.name}</p>
                       </div>
                    </Col>
                    <Col md={4}>
                        <BasketChangeItem basketDevice={basketDevice}/>
                    </Col>
                    <Col md={1} className="d-flex flex-column align-items-right">
                        <BasketDeleteButton basketDevice={basketDevice}/>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default BasketItem;