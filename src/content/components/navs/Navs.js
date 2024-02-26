import React from 'react';
import {Link} from "react-router-dom";
import {Nav, NavItem} from 'react-bootstrap-v5';
import {Account} from "../sections";

const navs = {
    '/services': 'Services',
    '/questions': 'Questions',
    '/features': 'Features',
    '/contact': 'Contact',
    '/about': 'About'
};

export default class Navs extends React.Component {


    handleClick = (e) => {
        console.log(e._lastTabNavDirection);
    };

    render() {
        return (
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <Nav as="ul" className="me-auto mt-2">
                    {Object.keys(navs).map(key => (
                        <NavItem as="li" key={key}>
                            <Link className="nav-link mx-2 text-uppercase" to={key}>{navs[key]}</Link>
                        </NavItem>
                    ))}
                    <Account onClik={console.log(this.props)} />
                </Nav>
            </div>
        );
    }
}
