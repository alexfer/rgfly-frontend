import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {Button, Container, Navbar} from 'react-bootstrap-v5';
import {About, Contact, Features, Home, Navs, Profile, Questions, Services} from './content/components/pages';
import ToastMessage from "./content/components/toast/ToastMessage";
import React from "react";

const App = () => (
    <Container>
        <Router>
            <Navbar expand="lg"
                    className="navbar-dark navbar-inverse px-3 bg-transparent centerOnMobile justify-content-end">
                <Link to="/" className="navbar-brand fs-4 fw-medium">RgFly</Link>
                <Button
                    data-bs-toggle="collapse"
                    className="navbar-toggler"
                    data-bs-target="#navbar"
                    aria-controls="navbar"
                    aria-expanded="false"
                    aria-label="..."
                    type="button">
                    <span className="navbar-toggler-icon"></span>
                </Button>
                <Navs/>
            </Navbar>
            <div className="container-fluid position-absolute h-25 bg-danger top-0 start-0 z-n1"></div>
            <div className="main-container mb-xxl-5">
                <Routes>
                    <Route path="/" element={<Home title={`Homepage`}/>}/>
                    <Route path="/services" exact={true} element={<Services title={`Services`}/>}/>
                    <Route path="/questions" exact={true} element={<Questions title={`Questions`}/>}/>
                    <Route path="/features" exact={true} element={<Features title={`Features`}/>}/>
                    <Route path="/contact" exact={true} element={<Contact title={`Contact`}/>}/>
                    <Route path="/about" exact={true} element={<About title={`About`}/>}/>
                    {localStorage.getItem('token') !== null ? <Route path="/profile" exact={true} element={<Profile title={`Profile`}/>}/> : null}
                </Routes>
            </div>
        </Router>
        <ToastMessage type="success" message="Your message sent suceesfully."/>
    </Container>
)

export default App;
