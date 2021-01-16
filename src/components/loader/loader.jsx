import React from 'react';
import {Spin} from 'antd';
import 'antd/dist/antd.css'

const Loader = () => (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <Spin />
    </div>
)

export default Loader;

