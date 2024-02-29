import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Image, ListGroup, Row, Spinner} from 'react-bootstrap-v5';
import {Link} from "react-router-dom";

export default function Features() {

    const [isStart, setIsStart] = useState(false);
    const url = 'https://reqres.in/api/users';
    const [data, setData] = useState([]);

    function Loading() {
        return <Spinner className="position-absolute start-50 top-50" animation="grow"/>;
    }

    useEffect(() => {
        document.title = 'RgFly - Features';
        if (isStart) {
            fetch(url)
                .then(async (response) => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    setData(data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        setIsStart(false);
    }, [isStart]);

    function handleClick(item) {
        alert(item.first_name + ' ' + item.last_name);
    }

    return (
        <>
            <section className="container mt-lg-2">
                <Row>
                    <Card className="card-body shadow col-12">
                        <h4 className="ps-2 border-start border-3 border-danger mb-3">Features</h4>
                        <Row>
                            <Col xs={12}>
                                <ListGroup as="ul" variant='flush'>
                                    {data?.map((item, index) => {
                                        const choice = () => {
                                            handleClick(item)
                                        };
                                        return (
                                            <ListGroup.Item as="li" action key={index}>
                                                <div className="d-flex mt-2 w-100">
                                                    <div className="ms-2 me-xxl-5 text-center text-truncate">
                                                        <Image
                                                            className="rounded-circle"
                                                            src={item.avatar}
                                                            alt={`${item.first_name} ${item.last_name}`} width={42}/>
                                                    </div>
                                                    <Link onClick={choice} className="mt-2 text-start">
                                                        {item.first_name} {item.last_name}
                                                    </Link>
                                                    <div className="ms-auto mt-2">{item.email}</div>
                                                </div>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                                <Button variant="dark" className='w-100 rounded-1 shadow-sm mt-4'
                                        onClick={() => setIsStart(true)}>Load</Button>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </section>
        </>
    );
}
