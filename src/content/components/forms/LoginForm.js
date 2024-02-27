import React from "react";
import {Alert, Button, Container, Form, FormControl} from 'react-bootstrap-v5';
//import {AES} from 'crypto-js';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {},
            validated: false,
            error: false,
            message: null
        };
    }

    url = 'https://dev.moniheal.com/api/login_check';

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState(values => ({...values, [name]: value}));
    };

    authorize = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({
            validated: true
        });

        const inputs = {
            username: this.state.username,
            password: this.state.password
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputs)
        };

        const { REACT_APP_AUTH_SECRET } = process.env;
        
        if (form.checkValidity() === true) {

            fetch(this.url, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json') || undefined;
                    const data = isJson && await response.json();

                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        this.setState({
                            error: true,
                            message: error
                        });
                        form.reset();
                        return Promise.reject(error);
                    }

                    form.reset();
                    this.setState({
                        validated: false,
                        error: false,
                        message: null
                    });

                    console.log(REACT_APP_AUTH_SECRET);

                    setTimeout(() => {
                        document.getElementById('dropdown').click();
                    }, 700);
                })
                .catch(err => {
                    //console.log(process.env);
                    console.log(err);
                });
        }
        event.preventDefault();
    }

    render() {
        return (
            <Container>
                {this.state.error ? <Alert className={`m-2 bg-opacity-50`} variant={`danger`}>{this.state.message}</Alert>: null}
                <Form method="post" noValidate validated={this.state.validated} onSubmit={this.authorize}
                      className="m-3">
                    <Form.Group className="mb-3" controlId={`username`}>
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="phone" name="username" onChange={this.handleChange} required
                                      placeholder="Username"/>
                        <FormControl.Feedback type="invalid">
                            Email address is required.
                        </FormControl.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId={`password`}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.handleChange} required
                                      placeholder="Password"/>
                        <FormControl.Feedback type="invalid">
                            Password is required.
                        </FormControl.Feedback>
                    </Form.Group>
                    <Form.Group className="py-1 text-end">
                        <Button type="submit" className="btn btn-primary">SignIn</Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}