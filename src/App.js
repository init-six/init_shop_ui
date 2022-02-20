import React,{Component} from 'react';
import {message,Button} from 'antd';

export default class App extends Component{
  //arrow protect "this" works
  handleClick=()=>{
    message.success('success ...')
  }
  render(){
    return <Button type="primary" onClick={this.handleClick}>PrimaryButton</Button>
  }
}
