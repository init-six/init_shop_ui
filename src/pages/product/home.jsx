import React,{useEffect,useState} from 'react'
import {Card,Select,Input,Button,Icon,Table} from 'antd'
import {PlusOutlined} from '@ant-design/icons';

const Option=Select.Option

export default function ProductHome(){
    const [columns,setColumns]=useState([])

    const dataSource = [
      {
        key: '1',
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
    

    const initColumns=()=>{
        const columns = [
          {
            title: 'Product Name(SPU)',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Description',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: 'Status',
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: 'Action',
            dataIndex: 'address',
            key: 'address',
          },
        ];
        setColumns(columns)
    }

    useEffect(()=>{
        initColumns()
    },[])
    const title=(
        <span>
            <Select value='0'>
                <Option value='0'>Search By Name</Option>
                <Option value='1'>Search By Details</Option>
            </Select>
            <Input placeholder="keywords" style={{width:150,margin:'0 10px'}}/>
            <Button type='primary'>Search</Button>
        </span>
    )

    const extra=(
        <Button type='primary' icon={<PlusOutlined/>}>
            Add Product
        </Button>
    )

    return(
        <Card title={title} extra={extra}>
            <Table 
                dataSource={dataSource}
                columns={columns}
            />
        </Card>
    )
}
