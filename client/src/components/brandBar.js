import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Form} from "react-bootstrap";
import {Context} from "../index";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Form className="d-flex">
            <Card
                style={{cursor: 'pointer'}}
                onClick={() => device.setSelectedBrand({})}
                border={device.selectedBrand.id === undefined ? 'danger' : 'light'}
                className="p-2"
            >
                Все бренды
            </Card>
            {device.brands.map(brand =>
                <Card
                    style={{cursor: 'pointer'}}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                    className="p-2"
                >
                    {brand.name}
                </Card>
            )}
        </Form>
    );
});

export default BrandBar;