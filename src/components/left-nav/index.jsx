import React,{Component} from 'react';
import './index.less';
import logo from "../../assets/images/init_logo2.png";
import {Link} from 'react-router-dom';
import { Menu, Button,Layout } from 'antd';
import {
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  MailOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  ProfileOutlined,
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
                  <Link to='/admin/home'>
                  Dashboard
                  </Link>
              </Menu.Item>
              <SubMenu key="2" icon={<AppstoreOutlined />} title="Shop">
                <Menu.Item key="5" icon={<ProfileOutlined/>}>
                  <Link to='/admin/category'>
                  Category
                  </Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<ShoppingOutlined/>}>
                  <Link to='/admin/product'>
                  Product
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="3" icon={<UserOutlined />}>
                  <Link to='/admin/user'>
                  User
                  </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<ShoppingCartOutlined />}>
                  <Link to='/admin/order'>
                  Orders
                  </Link>
              </Menu.Item>
              <SubMenu key="7" icon={<BarChartOutlined />} title="Chart ">
                <Menu.Item key="8" icon={<BarChartOutlined/>}>
                  <Link to='/admin/bar'>
                      Bar
                  </Link>
                </Menu.Item>
                  <Menu.Item key="9" icon={<PieChartOutlined/>}>
                  <Link to='/admin/pie'>
                      Pie
                  </Link>
                </Menu.Item>
                  <Menu.Item key="10" icon={<LineChartOutlined />}>
                  <Link to='/admin/line'>
                      Line
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
            </Sider>
        )
    }
}
