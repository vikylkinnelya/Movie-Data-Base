import React from 'react';
import {Spin} from 'antd';


const Loader = () => (
    <>
        <Spin style={{ margin: '5% 50% 0 35%', textAlign: 'center', position: 'absolute', zIndex: '100' }}/>
    </>
)

export default Loader;

