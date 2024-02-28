import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Image, ListGroup, Row, Spinner} from 'react-bootstrap-v5';

export default function Features() {

    const [isStart, setIsStart] = useState(false);
    const url = 'https://reqres.in/api/users';
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function Loading() {
        return <Spinner className="position-absolute start-50 top-50" animation="grow" />;
    }

    useEffect(() => {
        document.title = 'RgFly - Features';
        if (isStart) {
            fetch(url)
                .then(async (response) => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    setData(data.data)
                })
                .catch(err => {
                    console.log(err);
                });
        }
        setIsStart(false);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [isStart]);

    if (isLoading) {
        return <Loading />;
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
                                            console.log(item.first_name + ' ' + item.last_name);
                                        };
                                        return (
                                            <ListGroup.Item as="li" onClick={choice} action key={index}>
                                                <div className="d-flex w-100">
                                                    <div className="ms-2 me-xxl-5 text-center text-truncate">
                                                        <Image
                                                            className="rounded-circle"
                                                            src={item.avatar}
                                                            alt={`${item.first_name} ${item.last_name}`} width={42}/>
                                                    </div>
                                                    <div
                                                        className="mx-2 text-start">{item.first_name} {item.last_name}</div>
                                                    <div className="ms-auto mx-2">{item.email}</div>
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
