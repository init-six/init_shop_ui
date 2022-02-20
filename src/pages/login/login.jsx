import React,{Component} from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login.less";
import logo from "./images/init_logo.jpg";

const Item = Form.Item 

export default class Login extends Component{
    handleFormSubmit=(event)=>{
        console.log(event);
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
                          rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} className="login-form-username" placeholder="Username" />
                        </Item>
                        <Item
                          name="password"
                          rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                          <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            className="login-form-password"
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
