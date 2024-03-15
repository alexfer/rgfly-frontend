import React from 'react';
import {Card, Col, Row} from 'react-bootstrap-v5';
import ContactForm from "../forms/ContactForm";

export default function Contact(params) {
    document.title = params.title;

    return (
        <>
            <section className="container mt-lg-2">
                <Row>
                    <Card className='shadow card-body col-12'>
                        <h4 className="ps-2 border-start border-3 border-danger mb-3">{params.title} Us</h4>
                        <Row>
                            <Col xs={12}>
                                <ContactForm show={false}/>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </section>
        </>
    )
}
