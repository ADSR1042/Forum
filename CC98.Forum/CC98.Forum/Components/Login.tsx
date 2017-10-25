﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as $ from 'jquery';

export class Login extends React.Component<null, LoginState> {
    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            loginPassword: '',
            loginMessage: '',
            isLogining: false
        };

	    this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    shake(element: HTMLElement) {
        element.classList.add('shake');
        setTimeout(() => { element.classList.remove('shake') }, 500);
        return element;
    }

    handleNameChange(e) {
        this.setState({
            loginName: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            loginPassword: e.target.value
        });
    }
    
    async handleLogin(e) {
        e.preventDefault();
        //如果在登陆中则无视提交
        if (this.state.isLogining) {
            return false;
        }

        if (!(this.state.loginName || this.state.loginPassword)) {
            this.setState({
                loginMessage: '请输入用户名和密码'
            });
            this.shake(document.getElementById('loginName')).focus();
            this.shake(document.getElementById('loginPassword'));
            return false;
        } else if (!this.state.loginName) {
            this.setState({
                loginMessage: '请输入用户名'
            });
            this.shake(document.getElementById('loginName')).focus();

            return false;
        } else if (!this.state.loginPassword) {
            this.setState({
                loginMessage: '请输入密码'
            });
            this.shake(document.getElementById('loginPassword')).focus();

            return false;
        }else {
            this.setState({
                loginMessage: '登陆中',
                isLogining: true
            }); 

            const url = 'http://openid.cc98.org/connect/token';

            const requestBody = {
                'client_id': '8a1bd823-c3cf-44c0-6498-08d50009f244',
                'client_secret': 'fc95e3fc-da10-4e19-9394-3e9f5df0f2c6',
                'grant_type': 'password',
                'ResponseType': 'token',
                'scope': 'openid',
                'username': this.state.loginName,
                'password': this.state.loginPassword
            };

            let response = await fetch(url, {
                method: 'POST',
                body: $.param(requestBody)
            });

            let data = await response.json();

            console.log(data);
        }
        
    }

    render() {
        return (
            <div className="login">
                <div>
                    <img src="/images/login.png" />
                    <div>
                        <img src="/images/login_welcome.png" />
                        <form onSubmit={this.handleLogin}>
                            <div className="login-form">
                                <p>用户名</p><input type="text" id="loginName" onChange={this.handleNameChange} value={this.state.loginName} />
                            </div>
                            <div className="login-form">
                                <p>密码</p><input type="password" id="loginPassword" onChange={this.handlePasswordChange} />
                            </div>
                            <p id="loginMessage">{this.state.loginMessage}</p>
                            <button type="submit" disabled={this.state.isLogining}>登陆账号</button>
                        </form>
                        <p><span>还没账号？我要 <a href="">注册</a></span></p>
                    </div>
                </div>
            </div>
            );
    }
}

/**
 * 登陆页状态
 */
class LoginState {
    /**
    * 用户名
    */
    loginName: string;
    /**
    * 密码
    */
    loginPassword: string;
    /**
    * 登陆信息
    */
    loginMessage: string;
    /**
    * 登陆状态
    */
    isLogining: boolean;
}