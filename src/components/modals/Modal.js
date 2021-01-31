import React from "react";
import "./Modal.scss"

export class Modal extends React.Component {
    static defaultProps = {
        show: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
        }
        this.className = this.state.show ? "modal d-block" : "modal d-none";
    }

    render() {
        return <>
            <div className='modal-background'/>
            <div className="modal-window-position">
                <div className="modal-window">
                    {this.props.children}
                </div>
            </div>

        </>
    }
}