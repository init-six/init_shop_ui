import React,{Component} from 'react';
import './index.less';
import logo from "../../assets/images/init_logo2.png";
import {Link} from 'react-router-dom';
import { Menu, Button,Layout } from 'antd';
import {
  BarChartOutlined,
  MailOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const {Sider} = Layout;
const { SubMenu } = Menu;

export default class LeftNav extends Component{
    state={
        collapes:false
    };

    onCollapse = collapsed => {
      this.setState({ collapsed });
    };

    render(){
        const { collapsed } = this.state;
        return(
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} >
            <Link to='/admin' className="left-nav">
                <header className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    {collapsed?'':<h1>init</h1>}
                </header>
            </Link>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="1" icon={<HomeOutlined/>}>
                  Dashboard
              </Menu.Item>
              <SubMenu key="2" icon={<AppstoreOutlined />} title="Product">
                <Menu.Item key="9">Category</Menu.Item>
                <Menu.Item key="10">Product</Menu.Item>
              </SubMenu>
              <Menu.Item key="3" icon={<UserOutlined />}>
                  User
              </Menu.Item>
              <Menu.Item key="4" icon={<ShoppingCartOutlined />}>
                  Orders
              </Menu.Item>
              <Menu.Item key="5" icon={<BarChartOutlined />}>
                  Chart
              </Menu.Item>
              <Menu.Item key="6" icon={<MailOutlined />}>
                  Emails
              </Menu.Item>
            </Menu>
            </Sider>
        )
    }
}
