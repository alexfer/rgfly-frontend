import React from 'react';
import {Link} from "react-router-dom";
import {Card, Col, Row} from 'react-bootstrap-v5';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        document.title = this.props.title;
    }
    render() {
        return (
            <section className="container mt-lg-2">
                <Row>
                    <Card className='card-body shadow col-12'>
                        <h4 className="ps-2 border-start border-3 border-danger mb-3">Home</h4>
                        <Row>
                            <Col xs={12}>
                                <h5 className='mb-3'>Home</h5>
                                <p className='ln-1'>Welcome to <Link
                                    target='_blank'
                                    to="http://www.rgrly.net">rgrly.net</Link>
                                </p>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </section>
        )
    }
}
