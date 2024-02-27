import React from 'react';
import {Link} from "react-router-dom";
import {Nav, NavItem} from 'react-bootstrap-v5';
import {Account} from "../sections";

export default class Navs extends React.Component {
    constructor() {
        super();
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    };

    forceUpdateHandler() {
        this.forceUpdate();
    };

    navs = {
        '/services': 'Services',
        '/questions': 'Questions',
        '/features': 'Features',
        '/contact': 'Contact',
        '/about': 'About',
        '/profile': 'Profile'
    };

    getToken = () => {
        return localStorage.getItem('token') === null;
    };

    getNavs = () => {
        let navs = Object.keys(this.navs);
        if (this.getToken()) {
            return navs.splice(0, 5);
        }
        return navs;
    };

    account = (key) => {
        if (this.getToken()) {
            return (
                <Account/>
            );
        }
        return (
            <NavItem as="li" key={key}>
                <Link className="nav-link mx-2 text-uppercase" onClick={this.logout}>Logout</Link>
            </NavItem>
        );
    };

    logout = () => {
        localStorage.clear();
        this.forceUpdateHandler();
    }

    render() {
        return (
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <Nav as="ul" className="me-auto mt-2">
                    {this.getNavs().map(key => (
                        <NavItem as="li" key={key}>
                            <Link className="nav-link mx-2 text-uppercase" to={key}>{this.navs[key]}</Link>
                        </NavItem>
                    ))}
                    {this.account()}
                </Nav>
            </div>
        );
    }
}
