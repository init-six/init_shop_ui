import React from 'react'
import {Typography,Form,Select,Input,Cascader} from 'antd'

const {Text}=Typography

const Item=Form.Item

const Option=Select.Option

export default function AddForm(props){
    const navCategory=props.navCategory
    const nav=navCategory==""?"Default Category":navCategory.join("/")
    return(
        <Form form={props.form}>
            <Text>{nav}</Text>
            <Item name="categoryName">
                <Input placeholder='Input Category Name'/>
            </Item>
        </Form>
    )
}
