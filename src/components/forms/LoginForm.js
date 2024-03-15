import React, {useState} from "react";
import {Alert, Button, Container, Form, FormControl} from 'react-bootstrap-v5';
import {AES} from 'crypto-js';

export default function LoginForm({updateNav}) {

    const [inputs, setInputs] = useState({});
    const [validate, setValidated] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(null);

    const url = process.env.REACT_APP_API_HOST + '/api/login_check';

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs(values => ({...values, [name]: value}));
    };

    const authorize = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        const inputsObj = {
            username: inputs.username,
            password: inputs.password
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputsObj)
        };

        const {REACT_APP_AUTH_SECRET} = process.env;

        if (form.checkValidity() === true) {

            fetch(url, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json') || undefined;
                    const data = isJson && await response.json();

                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        setError(true);
                        setMessage(error);
                        form.reset();
                        return Promise.reject(error);
                    }

                    const token = AES.encrypt(data.token, REACT_APP_AUTH_SECRET.toString());

                    localStorage.setItem('token', token);

                    form.reset();
                    setValidated(false);
                    setError(false);
                    setMessage(null);

                    setTimeout(() => {
                        document.getElementById('dropdown').click();
                        document.location.reload();
                    }, 300);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        event.preventDefault();
    }
    return (
        <>
            <Container>
                {error ?
                    <Alert className={`m-2 bg-opacity-50`} variant={`danger`}>{message}</Alert> :
                    null}
                <Form method="post" noValidate validated={validate} onSubmit={authorize}
                      className="m-3">
                    <Form.Group className="mb-3" controlId={`username`}>
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="phone" name="username" onChange={handleChange} required
                                      placeholder="Username"/>
                        <FormControl.Feedback type="invalid">
                            Email address is required.
                        </FormControl.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId={`password`}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleChange} required
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
        </>
    )
}
