import React from 'react';
import {Dropdown, NavItem, NavLink} from 'react-bootstrap-v5';
import LoginForm from '../forms/LoginForm';

export default function Account() {
    return (
        <>
            <Dropdown as={NavItem} id={`dropdown`} aria-expanded="true">
                <Dropdown.Toggle as={NavLink} className="text-uppercase">Account</Dropdown.Toggle>
                <Dropdown.Menu className="shadow end-0" style={{width: 300}}>
                    <LoginForm/>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
