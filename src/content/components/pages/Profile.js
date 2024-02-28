import React from 'react';
import {Card, Col, ListGroup, Row} from "react-bootstrap-v5";
import getProfile from "../requests/User";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: {}, values: props.values};
    }

    componentDidMount() {
        this.renderProfile();
    }

    renderProfile = async () => {
        try {
            const data = await getProfile();
            this.setState({
                data: data
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        console.log(this.state.data);
        return (
            <>
                <section className="container mt-lg-2">
                    <Row>
                        <Card className='card-body shadow col-12'>
                            <h4 className="ps-2 border-start border-3 border-danger mb-3">Profile</h4>
                            <Row>
                                <Col xs={12}>
                                    <ListGroup as="ul" variant='flush'>
                                        <ListGroup.Item as="li">{this.state.data.fullName}</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                </section>
            </>
        )
    }
}
