import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

const Item=Form.Item;

const Option=Select.Option;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
};

export default function ProductAddUpdate(){
    const [form]=Form.useForm()
    const onFinish=(vales)=>{
        console.log("form values:",values)
    }
    return (
      <Form 
        {...formItemLayout}
        form={form} 
        name="editspu" 
        onFinish={onFinish}
        scrollToFirstError
      >
        <Item name="Name" 
          label="Name" 
          tooltip="SPU Name"
          rules={[{required:true,message:"Please input spu name",whitespace:true,}]}
        >
            <Input/>
        </Item>

        <Item
            name="category"
            label="category"
        >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
        </Item>
         
      </Form>
    );
};
