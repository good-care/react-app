import * as React from "react";
import {requestService} from "../../services/RequestService";

export class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this)
        this.state = {
            userData: {
                username: '',
                money: 0
            },
            errorMessage: ''
        }
    }

    setErrorMessage(message) {
        let state = this.state
        state.errorMessage = message
        this.setState(state)
    }

    setUserData(userData) {
        let state = this.state
        state.userData = userData
        this.setState(state)
    }

    getData() {
        if (this.props.token && this.props.token !== "")
            requestService.sendPostRequest('api/userdata?userId=5', null, this.props.token)
                .then(r => {
                    if (r.code === 1) {
                        this.setUserData(r.data)
                    } else
                        this.setErrorMessage(r.message)
                })
        else
            this.setErrorMessage('Please Login first')
    }

    render() {
        return <>
            <button onClick={this.getData}>
                Get Data
            </button>
            <div>
                <span>Username:</span>{this.state.userData.username}
            </div>
            <div>
                <span>Money:</span>{this.state.userData.money}
            </div>
            <div>
                {this.state.errorMessage}
            </div>

        </>;
    }
}