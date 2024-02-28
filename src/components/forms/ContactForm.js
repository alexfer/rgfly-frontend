import React from "react";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap-v5";


export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {},
            validated: false
        };
    }

    url = 'https://reqres.in/api/posts';

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState(values => ({...values, [name]: value}));
    };

    handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        const inputs = {
            email: this.state.email,
            name: this.state.name,
            subject: this.state.subject,
            phone: this.state.phone,
            message: this.state.message,
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputs)
        };

        this.setState({
            validated: true
        });

        if (form.checkValidity() === true) {
            fetch(this.url, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }

                    form.reset();
                    this.setState({
                        validated: false
                    });

                    //console.log(data);

                    // setTimeout(() => {
                    //     setShow(false);
                    // }, 3000);

                })
                .catch(err => {
                    console.log(err);
                });
        }
        event.preventDefault();
    }

    render() {
        return (
            <Form method={`post`}
                  className={`form-contact`}
                  noValidate
                  validated={this.state.validated}
                  onSubmit={this.handleSubmit}>
                <Row className={`p-3`}>
                    <Col md={6}>
                        <FormGroup role={`form`} className={`mb-3`} controlId={`name`}>
                            <FormLabel>Your name</FormLabel>
                            <FormControl
                                name={`name`}
                                type={`text`}
                                placeholder={`Enter your name`}
                                onChange={this.handleChange}
                                required
                            />
                            <FormControl.Feedback type={`invalid`}>
                                Please choose a name.
                            </FormControl.Feedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup role={`form`} className={`mb-3`} controlId={`email`}>
                            <FormLabel>Email address</FormLabel>
                            <FormControl
                                onChange={this.handleChange}
                                name={`email`}
                                type={`email`}
                                placeholder={`Enter your email`}
                                required
                            />
                            <FormControl.Feedback type={`invalid`}>
                                Please enter valid email address.
                            </FormControl.Feedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup role={`form`} className={`mb-3`} controlId={`phone`}>
                            <FormLabel>Your phone</FormLabel>
                            <FormControl
                                onChange={this.handleChange}
                                name={`phone`}
                                type={`text`}
                                placeholder={`Enter your phone`}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup role={`form`} className={`mb-3`} controlId={`subject`}>
                            <FormLabel>Subject</FormLabel>
                            <FormControl
                                type={`text`}
                                name={`subject`}
                                onChange={this.handleChange}
                                placeholder={`Describe your question..."`}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup role={`form`} className={`mb-3`} controlId={`message`}>
                            <FormLabel>Message</FormLabel>
                            <FormControl
                                as={`textarea`}
                                name={`message`}
                                onChange={this.handleChange}
                                placeholder={`Your message`}
                                rows={6}
                                required
                            />
                            <FormControl.Feedback type={`invalid`}>
                                Please enter a message.
                            </FormControl.Feedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Col md={12} className={`text-center my-4`}>
                    <Button variant={`primary`} type={`submit`}>
                        Send
                    </Button>
                </Col>
            </Form>
        )
    }
}
