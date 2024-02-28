import React from "react";
import {Button, Toast} from "react-bootstrap-v5";

export default class ToastMessage extends React.Component {
    args = {
        message: this.props.message,
        type: this.props.type
    };

    render() {
        return (
            <Toast
                id={`toast`}
                className={`toast position-absolute end-0 bottom-0 text-bg-${this.args.type} mb-3 me-3`}
                role={`alert`} aria-live={`assertive`} aria-atomic="true"
            >
                <div className={`toast-header`}>
                    <strong className={`fw-bold me-auto`}>System message</strong>
                    <Button className={`btn-close`} data-bs-dismiss={`toast`} aria-label={`Close`}></Button>
                </div>
                <Toast.Body>{this.args.message}</Toast.Body>
            </Toast>
        )
    }
}
