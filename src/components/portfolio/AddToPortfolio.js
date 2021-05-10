import * as React from "react";
import {Modal} from "../modals/Modal";
import {requestService} from "../../services/RequestService";

export class AddToPortfolio extends React.Component {
    static defaultProps = {
        assetId: 0,
        assetName: "",
        show: false,
        token: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            purchaseDate: "",
            cost: 0,
            message: "",
            number: 0,
            err: false
        }
        this.addToPortfolio = this.addToPortfolio.bind(this)
    }

    addToPortfolio() {
        if (this.props.token && this.props.token !== ""){

            requestService.sendPostRequest(
                'api/addToPortfolio',
                {
                    assetId: this.props.assetId,
                    purchaseDate: this.state.purchaseDate,
                    cost: this.state.cost,
                    number: this.state.number,
                    name: this.props.assetName
                },
                this.props.token
            )
                .then(r => {
                    if (r.code === 1) {
                        this.state.err = false
                        this.state.message = r.message
                        this.state.show = false
                    } else {
                        this.state.err = true
                        this.state.message = r.message
                    }
                    this.setState(this.state)
                })}
        else {
            this.state.message = 'Please Login first'
            this.setState(this.state)
        }
    }

    render() {
        return <>
            <button on onClick={() => {
                this.state.show = true;
                this.setState(this.state)
            }}>Add
            </button>
            {!this.state.err &&
                <p>Message: {this.state.message}</p>
            }

            {this.state.show &&
            <Modal>
                <p>Please add additional info</p>
                <label>
                    <p>Purchase date</p>
                    <input type="date" onChange={e => this.state.purchaseDate = e.target.value} defaultValue={this.state.purchaseDate}/>
                </label>
                <label>
                    <p>The cost</p>
                    <input type="number" onChange={e => this.state.cost = e.target.value} defaultValue={this.state.cost}/>
                </label>
                <label>
                    <p>Number</p>
                    <input type="number" onChange={e => this.state.number = e.target.value} defaultValue={this.state.number}/>
                </label>

                <div>
                    <button onClick={this.addToPortfolio}>Submit</button>
                    <button onClick={() => {
                        this.state.show = false;
                        this.state.message = "";
                        this.setState(this.state)
                    }}>Cancel
                    </button>
                </div>
                {this.state.err &&
                <p>Message: {this.state.message}</p>
                }
            </Modal>
            }
        </>
    }
}