import * as React from "react";
import {Clock} from "../clock/Clock";
import {AssetList} from "../assetslist/AssetList";
import {Login} from "../login/Login";
import {SignUp} from "../signup/SignUp";
import {requestService} from "../../services/RequestService";
import {UserData} from "../userdata/UserData";
import {Cookies} from "react-cookie";

export class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.setToken = this.setToken.bind(this)
        this.stateUpdate = this.stateUpdate.bind(this)
        this.state = {
            token: '',
            isLogin: false,
            errorMessage: '',
            userData: {
                username: '',
                money: 0
            }
        }
        this.cookies = new Cookies();
        this.state.token = this.cookies.get('GoodCare token')
    }

    componentDidMount() {
        this.getUserData()
    }

    stateUpdate() {
        this.setState(this.state)
    }

    setToken(token) {
        this.state.token = token
        this.cookies.set('GoodCare token', this.state.token)
        this.getUserData()
    }

    getUserData() {
        if (this.state.token && this.state.token !== "")
            requestService.sendPostRequest('api/userdata?userId=5', null, this.state.token)
                .then(r => {
                    if (r.code === 1) {
                        this.state.errorMessage = ''
                        this.state.userData = r.data
                        this.state.isLogin = true
                    } else {
                        this.state.errorMessage = r.message
                    }
                    this.stateUpdate()
                })
        else {
            this.state.isLogin = false
            this.stateUpdate()
        }
    }

    render() {
        return <>
            <div>
                {this.state.isLogin && <span>Hello, {this.state.userData.username}!</span>}
                <Login
                    setToken={this.setToken}
                    isLogin={this.state.isLogin}
                />
                <span> </span>
                <SignUp
                    isLogin={this.state.isLogin}
                />
            </div>
            <div>
                <span>{this.state.errorMessage}</span>
            </div>
            <div>
                <Clock/>
            </div>
            <div>
                <UserData token={this.state.token}/>
            </div>
            <div>
                <AssetList/>
            </div>
        </>;

    }
}