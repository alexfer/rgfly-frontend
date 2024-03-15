import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Nav, NavItem} from 'react-bootstrap-v5';
import {Account} from "../pages";
import navs from './list';

export default function Navs() {

    const [showAccount, setShowAccount] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    /**
     *
     * @returns {boolean}
     */
    const getToken = () => {
        return localStorage.getItem('token') === null;
    };

    /**
     *
     * @param {number} offset
     * @returns {string[]}
     */
    const getNavs = (offset) => {
        if (!getToken()) {
            return Object.keys(navs);
        }
        return Object.keys(navs).slice(0, offset);
    };

    useEffect(() => {
        if (getToken()) {
            setShowAccount(true);
            setShowLogout(false);
        }
    }, [showAccount, showLogout]);


    const logout = (event) => {
        alert(event.currentTarget)
        let owner = event.currentTarget.parentNode;
        let profile = owner.previousElementSibling;
        profile.style.display = 'none';
        owner.style.display = 'none';
        setShowAccount(true);
        setShowLogout(false);
        localStorage.clear();
    }

    return (
        <>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <Nav as="ul" className="me-auto mt-2">
                    {getNavs(5).map(key => (
                        <NavItem as="li" key={key}>
                            <Link className="nav-link mx-2 text-uppercase" to={key}>{navs[key]}</Link>
                        </NavItem>
                    ))}
                    {showAccount ? <Account/> : null}
                    {showLogout ?
                        <NavItem as="li">
                            <Link className="nav-link mx-2 text-uppercase" onClick={logout}>Logout</Link>
                        </NavItem>
                        : null}
                </Nav>
            </div>
        </>
    );
}
