import React,{Component,useState} from 'react';
import './index.less';
import logo from "../../assets/images/init_logo2.png";
import {Link,useLocation} from 'react-router-dom';
import { Menu, Button,Layout } from 'antd';
import menuList from '../../config/menuConfig'

const {Sider} = Layout;
const { SubMenu } = Menu;

export default function LeftNav(){

    const [collapsed,setCollapsed]=useState(false);

    const getMenuNodes=(menuList)=>{
        return menuList.map(item=>{
            if (!item.children){
                return(
                    <Menu.Item icon={item.icon} key={item.path} >
                        <Link to={item.path}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }else{
                return(
                    <SubMenu icon={item.icon} title={item.title} key={item.path}>
                        {
                            getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
        })
    }

    const onCollapse = ()=> {
        setCollapsed(!collapsed);
    };

    const path=useLocation().pathname;
    return(
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} >
        <Link to='/admin' className="left-nav">
            <header className="left-nav-header">
                <img src={logo} alt="logo"/>
                {collapsed?'':<h1>init</h1>}
            </header>
        </Link>
        <Menu
          defaultSelectedKeys={[path]}
          mode="inline"
          theme="dark"
        >
          {getMenuNodes(menuList)}
        </Menu>
        </Sider>
    )
}
