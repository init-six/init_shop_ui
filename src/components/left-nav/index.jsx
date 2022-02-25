import React,{Component} from 'react';
import './index.less';
import logo from "../../assets/images/init_logo2.png";
import {Link} from 'react-router-dom';
import { Menu, Button,Layout } from 'antd';
import menuList from '../../config/menuConfig'

const {Sider} = Layout;
const { SubMenu } = Menu;

export default class LeftNav extends Component{
    state={
        collapes:false
    };

    getMenuNodes=(menuList)=>{
        return menuList.map(item=>{
            if (!item.children){
                return(
                    <Menu.Item icon={item.icon} key={item.key} >
                        <Link to={item.path}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }else{
                return(
                    <SubMenu icon={item.icon} title={item.title} key={item.key}>
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
        })
    }

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
              {this.getMenuNodes(menuList)}
            </Menu>
            </Sider>
        )
    }
}
