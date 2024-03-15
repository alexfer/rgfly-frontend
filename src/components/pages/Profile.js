import React, {useEffect, useState} from 'react';
import {Card, Col, ListGroup, Row} from "react-bootstrap-v5";
import getProfile from "../requests/User";

export default function Profile(params) {

    document.title = params.title;

    const [data, setData] = useState([]);

    useEffect(() => {
        getProfile().then(data => {
            setData(data);
        });
    }, []);

    return (
        <>
            <section className="container mt-lg-2">
                <Row>
                    <Card className='card-body shadow col-12'>
                        <h4 className="ps-2 border-start border-3 border-danger mb-3">{params.title}</h4>
                        <Row>
                            <Col xs={12}>
                                <ListGroup as="ul" variant='flush'>
                                    <ListGroup.Item as="li">{data.fullName}</ListGroup.Item>
                                    <ListGroup.Item as="li">{data.email}</ListGroup.Item>
                                    <ListGroup.Item as="li">{data.phone}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </section>
        </>
    )
}
