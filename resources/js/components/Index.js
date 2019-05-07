import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SideBar from './SideBar';
import MessageBoard from './MessageBoard';
import { Row, Col } from 'antd';
import styled from 'styled-components'




class Index extends Component {
    render() {
        return (
        <div className="hoge" style={{display: 'flex', justifyContent: 'start'}}>
            <SideBar />
            <MessageBoard />
        </div>
        );
    }
}


if (document.getElementById('test')) {
    ReactDOM.render(<Index />, document.getElementById('test'));
}
