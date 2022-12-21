import React, {useContext} from 'react';
import {Context} from '../index';
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button, Navbar, Nav, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.setItem('token', '')
        user.setUser({})
        navigate(SHOP_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: "lightgray"}} to={SHOP_ROUTE}>ГаджетДом</NavLink>
                    { user.isAuth ?
                        <Nav className="ml-auto" style={{color: "lightgray"}}>
                            { user.isAdmin ?
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                >
                                    Админ-панель
                                </Button>
                                :
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => navigate(BASKET_ROUTE)}
                                >
                                    Корзина
                                </Button>
                            }
                            <Button
                                variant={"outline-light"}
                                onClick={() => logOut()}
                                className="ml-2"
                            >
                                Выйти
                            </Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{color: "lightgray"}}>
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(LOGIN_ROUTE)}
                            >
                                Авторизация
                            </Button>
                        </Nav>
                    }
            </Container>
        </Navbar>
    );
});

export default NavBar;