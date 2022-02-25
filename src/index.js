require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {getAccessUser} from './utils/storage'
import memoryUtils from './utils/memoryUtils'

memoryUtils.user=getAccessUser();

ReactDOM.render(<App/>, document.getElementById('app'));
