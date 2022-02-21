import React,{Component} from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login.less";
import logo from "./images/init_logo.jpg";
import {reqReadCategories} from '../../api'

const Item = Form.Item 

export default class Login extends Component{
    handleFormSubmit=(event)=>{
        console.log(event);
        reqReadCategories().then(response=>{
            console.log('success',response)
        }).catch(error=>{
            console.log('failed',error)
        });
    }
    render(){
        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>Init Login</h1>
                </header>
                <section className="login-content">
                    <h2>Admin Login</h2>
                     <Form
                          name="normal_login"
                          className="login-form"
                          initialValues={{ remember: true }}
                          onFinish={(values)=>this.handleFormSubmit(values)}
                        >
                        <Item
                          name="username"
                          className="login-form-username"
                          rules={[
                            { required: true, message: 'Please input your Username!' },
                            { min: 4, message: 'Minimum 4 character!' },
                            { max:12, message: 'Maximum 12 character!' },
                            { pattern:/^[a-zA-Z0-9_]+$/, message: 'only allow upper case,lower case,numbers and _ !' },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Item>

                        <Item
                          name="password"
                          className="login-form-password"
                          rules={[
                              { required: true, message: 'Please input your Password!' },
                              { min: 4, message: 'Minimum 4 character!' },
                              { max:12, message: 'Maximum 12 character!' },
                              { pattern:/^[a-zA-Z0-9_]+$/, message: 'only allow upper case,lower case,numbers and _ !' },
                            ]}
                        >
                          <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                          />
                        </Item>
                          {/*
                          <Form.Item>
                            <a className="login-form-forgot" href="">
                              Forgot password
                            </a>
                          </Form.Item>
                        */}
                        <Item>
                          <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                          </Button>
                          {/*Or <a href="">register now!</a>*/}
                        </Item>
                         <Item>
                          <a href="">Login Using Microsoft</a>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}
