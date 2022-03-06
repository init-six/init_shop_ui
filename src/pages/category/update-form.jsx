import React,{useEffect} from 'react'
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'

const Item=Form.Item

const Option=Select.Option

export default function UpdateForm(props){
    const categoryName=props.categoryName
    
    useEffect(()=>{
        props.form.setFieldsValue({
            categoryName:categoryName
        })
    },[categoryName])

    return(
        <Form form={props.form}>
            <Item name="categoryName">
                <Input placeholder='Input Category Name'/>
            </Item>
        </Form>
    )
}
