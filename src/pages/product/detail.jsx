import React,{Component} from 'react'
import {Card,List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';

const Item=List.Item

export default function ProductDetail(){
    const title=(
        <span>
            <ArrowLeftOutlined />
            <span>Product Detail</span>
        </span>
    )
    return(
        <Card title={title} className='product-detail'>
            <List
                itemLayout="vertical"
            >
                <Item>
                    <span className="left"> ProductName:</span>
                    <span>Name Here</span>
                </Item>
                <Item>
                    <span className="left"> Category:</span>
                    <span>Name Here</span>
                </Item>
                <Item>
                    <span className="left"> Description:</span>
                    <span>Name Here</span>
                </Item>
                <Item>
                    <span className="left"> Specifications:</span>
                    <span>Name Here</span>
                </Item>
            </List>
        </Card>
    )
}
