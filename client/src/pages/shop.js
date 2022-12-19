import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/typeBar";
import BrandBar from "../components/brandBar";
import DeviceList from "../components/deviceList";
import Pages from "../components/pages";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect( () => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 3).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
        }, []
    )

    useEffect( () => {
            fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 4).then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            })
        }, [device.page, device.selectedType, device.selectedBrand]
    )

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;