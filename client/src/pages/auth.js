import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password, name)
            }
            user.setUser(data)
            console.log(data)
            navigate(SHOP_ROUTE)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите Ваш email..."
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    { isLogin ?
                        <></>
                        :
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите Ваше имя..."
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </>
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите Ваш пароль..."
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        type="password"
                    />
                </Form>
                <Form className="d-flex justify-content-between mt-2 align-items-center">
                    {isLogin ?
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                        </div>
                        :
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                    }
                    <Button
                        onClick={click}
                        className="mt-3 align-self-end"
                        variant={"outline-dark"}
                    >
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;