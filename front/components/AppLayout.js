import React, { useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Input, Row, Col, Menu } from 'antd';
import LoginForm from '../containers/LoginForm';
import UserProfile from '../containers/UserProfile';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { LOAD_USER_REQUEST } from '../reducers/user';

const AppLayout = ({ children }) => {
    const { isLoggedIn, me } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onSearch = (value) => {
        Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
      };

    useEffect(() => {
        if(!me){
            dispatch({
                type: LOAD_USER_REQUEST,
            })
        }
    }, []);
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile" prefetch><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                <Input.Search
                    enterButton
                    style={{ verticalAlign: 'middle' }}
                    onSearch={onSearch}
                />
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me
                        ? <UserProfile />
                        : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    { children}
                </Col>
                <Col xs={24} md={6}>
                    <Link href="https://www.github.com/bohaesoju" ><a target="_blank">Made by Uyjoong</a></Link>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node
}

export default AppLayout;
