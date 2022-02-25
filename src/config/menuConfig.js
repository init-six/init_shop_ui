import React from 'react';
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

const menuList=[
  {
    title:'Dashboard',
    path:'/admin/home',
    key:'1',
    icon: <HomeOutlined/>
  },
  {
    title:'Shop',
    path:'/shop',
    key:'2',
    icon: <AppstoreOutlined/>,
    children:[
        {
          title:'Category',
          path:'/admin/category',
          key:'3',
          icon: <ProfileOutlined/>
        },
        {
          title:'Product',
          key:'4',
          path:'/admin/product',
          icon: <ShoppingOutlined/>
        }
    ]
  },
  {
    title:'User',
    path:'/admin/user',
    key:'5',
    icon: <UserOutlined/>
  },
  {
    title:'Order',
    path:'/admin/order',
    key:'6',
    icon: <ShoppingCartOutlined/>
  },
  {
    title:'Chart',
    path:'/chart',
    key:'7',
    icon: <BarChartOutlined/>,
    children:[
        {
          title:'Bar',
          path:'/admin/bar',
          key:'8',
          icon: <BarChartOutlined/>
        },
        {
          title:'Pie',
          key:'9',
          path:'/admin/pie',
          icon: <PieChartOutlined/>
        },
        {
          title:'Line',
          key:'10',
          path:'/admin/line',
          icon: <LineChartOutlined/>
        }
    ]
  }
]

export default menuList
