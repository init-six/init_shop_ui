import React,{Component} from 'react'
import {Card,Button,Table} from 'antd'
import { PlusOutlined} from '@ant-design/icons';
import LinkButton from './../../components/link-button'

export default class Category extends Component{
    render(){
        const title='categories'
        const extra=(
        <Button icon={<PlusOutlined />} type='primary'>
            Add
        </Button>
        )
        const dataSource = [
          {
            key: '1',//uuid
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },
          {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
          },
        ];
        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Action',
            dataIndex: '',
            width:'30%',
            key: 'action',
            render:()=>(
                <span>
                    <LinkButton>Update</LinkButton>
                    <LinkButton>View</LinkButton>
                </span>
            )
          },
        ];
        return(
            <Card title={title} extra={extra}>
                <Table 
                bordered
                dataSource={dataSource} 
                columns={columns} />
            </Card>
        )
    }

}
