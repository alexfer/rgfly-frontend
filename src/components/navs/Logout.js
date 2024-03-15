import React from "react";
import {Link} from "react-router-dom";
import {NavItem} from "react-bootstrap-v5";

const Logout = () => {
    return (
        <NavItem as="li">
            <Link className="nav-link mx-2 text-uppercase">Logout</Link>
        </NavItem>
    )
}

export default Logout;
