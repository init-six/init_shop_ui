import React,{Component} from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login.less";
import logo from "./images/init_logo.jpg";
import {reqLogin,reqRegister} from '../../api';
import {useNavigate} from 'react-router-dom';

const Item = Form.Item 

export default function Login(){


    const history = useNavigate();

    const handleFormSubmit=async (values)=>{
        const {email,password}=values
        const response = await reqLogin(email,password)
        //redirect to admin page
        console.log('success:',response)
        history('/admin')
    };

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
                      onFinish={handleFormSubmit}
                    >
                    <Item
                      name="email"
                      className="login-form-useremail"
                      rules={[
                          { required: true, message: 'Please input your Email!' },
                          { type:'email',message:"Please input a valid email"},
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="User Email" />
                    </Item>

                    <Item
                      name="password"
                      className="login-form-password"
                      rules={[
                          { required: true, message: 'Please input your Password!' },
                          { min: 4, message: 'Minimum 4 character!' },
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
                      <a href="">Register</a>
                    </Item>
                </Form>
            </section>
        </div>
    )
}
