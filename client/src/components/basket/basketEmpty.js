import React from 'react';
import {Card} from "react-bootstrap";

const BasketEmpty = () => {

    // TODO: Apply CSS to CARD

    return (
        <Card
            className="d-flex align-items-center mt-4"
            style={{width: 300, height: 150, fontSize: 22}}
            border={'light'}
            text={'danger'}
        >
            <div>Корзина пуста</div>
        </Card>
    );
};

export default BasketEmpty;