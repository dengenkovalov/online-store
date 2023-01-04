import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {createType} from "../../http/deviceAPI";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const [item, setItem] = useState('')

    const addType = () => {
        createType({name: value, item: item}).then(() => {
            setValue('')
            setItem('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-2 mb-2"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        placeholder={'Введите название типа'}
                    />
                    <Form.Control
                        className="mt-2 mb-2"
                        value={item}
                        onChange={event => setItem(event.target.value)}
                        placeholder={'Введите название экземпляра'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                <Button variant={'outline-success'} onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;