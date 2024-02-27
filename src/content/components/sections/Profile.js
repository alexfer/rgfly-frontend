import React from 'react';
import {AES, enc} from 'crypto-js';
import {jwtDecode} from 'jwt-decode';
import {Card, Col, Row} from "react-bootstrap-v5";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.secret = process.env.REACT_APP_AUTH_SECRET;
        this.state = {
            data: {},
            values: props.values
        };
        this.token = localStorage.getItem('token');
    }

    componentDidMount() {
        let bytes;
        if (this.token !== null) {
            bytes = AES.decrypt(this.token, this.secret);
            const decrypted = bytes.toString(enc.Utf8);
            const data = jwtDecode(decrypted);
            this.setState({
                data: data
            });
        }
        return false;
    }

    title() {
        const data = this.state.data;
        let title;

        for (let item in data.user) {
            title = data.user[item].uk;
            break;
        }
        return (
            <h5 className='mb-3'>{title}</h5>
        )
    }

    details() {

    }

    render() {
        return (
            <section className="container mt-lg-2">
                <Row>
                    <Card className='card-body shadow col-12'>
                        <h4 className="ps-2 border-start border-3 border-danger mb-3">Profile</h4>
                        <Row>
                            <Col xs={12}>
                                {this.title()}
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </section>
        )
    }
}
