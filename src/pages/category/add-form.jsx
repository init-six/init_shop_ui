import React from 'react'
import {Form,Select,Input} from 'antd'

const Item=Form.Item

const Option=Select.Option

export default function AddForm(){
    return(
        <Form>
            <Item>
            <Select defaultValue="0">
                <Option value='0'>A</Option>
                <Option value='1'>B</Option>
                <Option value='2'>C</Option>
            </Select>
            </Item>
            <Item>
            <Input placeholder='Input Category Name'/>
            </Item>
        </Form>
    )
}
