import * as React from "react";
import {requestService} from "../../services/RequestService";
import {Modal} from "../modals/Modal";
import "./Login.scss"

export class Login extends React.Component {

    static defaultProps = {
        setToken: () => {
        },
        isLogin: false,
    }

    constructor(props) {
        super(props);

        this.state = {
            showLogin: false,
            errorMessage: '',
            login: '',
            password: '',
            error: ''
        }
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.showLogin = this.showLogin.bind(this)
        this.hideLogin = this.hideLogin.bind(this)
        this.stateUpdate = this.stateUpdate.bind(this)
    }

    stateUpdate(){
        this.setState(this.state)
    }

    showLogin() {
        this.state.showSignUp = true
        this.stateUpdate()
    }

    hideLogin() {
        this.state.showSignUp = false
        this.stateUpdate()
    }

    login() {
        requestService.sendPostRequest(
            'api/signin',
            {
                login: this.state.login,
                password: this.state.password
            })
            .then(r => {
                if (r.code === 1) {
                    this.props.setToken(r.message)
                    this.state.errorMessage = ''
                    this.state.showSignUp = false
                } else
                    this.state.errorMessage = r.message
                this.stateUpdate()
            })
    }

    logout() {
        this.props.setToken("")
    }

    render() {
        return <>
            {this.state.showSignUp &&
            <Modal>
                <label className="login-label">
                    <p>Login</p>
                    <input className="login-input" type="text" onChange={e => this.state.login = e.target.value}/>
                </label>
                <label className="login-label">
                    <p>Password</p>
                    <input className="login-input" type="password"
                           onChange={e => this.state.password = e.target.value}/>
                </label>
                <div className="login-buttons">
                    <button className="login-button" onClick={this.login}>Submit</button>
                    <button className="login-button" onClick={this.hideLogin}>Cancel</button>
                </div>
                <div>
                    {this.state.errorMessage}
                </div>
            </Modal>
            }
            <span className="login-link" onClick={this.props.isLogin ? this.logout : this.showLogin}>
                {this.props.isLogin ? 'Logout' : 'Login'}
            </span>
        </>
    }

}