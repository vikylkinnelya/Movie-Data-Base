import React from 'react';
import { Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons'
import './add-favorites.css'

const AddFavorites = () => {

    

    return (
        <>
            <Button
                className='overlay like'
                type="primary"
                shape='circle'
                icon={<HeartOutlined style={{ fontSize: '23px', marginTop: '2px' }} />}
            >
            </Button>
        </>
    )
}

export default AddFavorites;



