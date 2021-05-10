import * as React from "react";
import {requestService} from "../../services/RequestService";
import {Modal} from "../modals/Modal";
import "./SignUp.scss"

export class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSignUp: false,
            errorMessage: '',
            login: '',
            email: '',
            password: '',
            confirm: '',
            error: ''
        }
        this.showSignUp = this.showSignUp.bind(this)
        this.hideSignUp = this.hideSignUp.bind(this)
        this.signUp = this.signUp.bind(this)
        this.dataCheck = this.dataCheck.bind(this)
        this.stateUpdate = this.stateUpdate.bind(this)
    }

    stateUpdate(){
        this.setState(this.state)
    }

    showSignUp() {
        this.state.showSignUp = true
        this.stateUpdate()
    }

    hideSignUp() {
        this.state.password = ''
        this.state.confirm = ''
        this.state.showSignUp = false
        this.stateUpdate()
    }

    signUp() {
        if (this.dataCheck()) {
            requestService.sendPostRequest(
                'api/signup',
                {
                    login: this.state.login,
                    email: this.state.email,
                    password: this.state.password
                })
                .then(r => {
                    if (r.code === 1) {
                        this.state.login = ''
                        this.state.email = ''
                        this.state.password = ''
                        this.state.confirm = ''
                        this.state.showSignUp = false
                    } else
                        this.state.errorMessage = r.message
                    this.stateUpdate()
                })
        }
    }

    dataCheck(){
        let result = true
        if (this.state.login === "") {result = false; this.state.errorMessage = 'Please enter login'}
        if (this.state.email === "") {result = false; this.state.errorMessage = 'Please enter e-mail'}
        if (this.state.password === "") {result = false; this.state.errorMessage = 'Please enter password'}
        if (this.state.confirm === "") {result = false; this.state.errorMessage = 'Please enter confirm'}
        if (this.state.password !== this.state.confirm) {result = false; this.state.errorMessage = 'Passwords do not match'}
        this.stateUpdate()
        return result
    }

    render() {
        return <>
            {this.state.showSignUp &&
            <Modal>
                <label className="signUp-label">
                    <p>Login</p>
                    <input className="signUp-input" type="text" onChange={e => this.state.login = e.target.value} defaultValue={this.state.login}/>
                </label>
                <label className="signUp-label">
                    <p>e-mail</p>
                    <input className="signUp-input" type="text" onChange={e => this.state.email = e.target.value}  defaultValue={this.state.email}/>
                </label>
                <label className="signUp-label">
                    <p>Password</p>
                    <input className="signUp-input" type="password"
                           onChange={e => this.state.password = e.target.value}/>
                </label>
                <label className="signUp-label">
                    <p>Confirm</p>
                    <input className="signUp-input" type="password"
                           onChange={e => this.state.confirm = e.target.value}/>
                </label>
                <div className="buttons">
                    <button className="signUp-button" onClick={this.signUp}>Submit</button>
                    <button className="signUp-button" onClick={this.hideSignUp}>Cancel</button>
                </div>
                <div>
                    {this.state.errorMessage}
                </div>
            </Modal>
            }
            {!this.props.isLogin &&
                <span className="signUp-link" onClick={this.showSignUp}>
                    SignUp
                </span>
            }
        </>
    }

}