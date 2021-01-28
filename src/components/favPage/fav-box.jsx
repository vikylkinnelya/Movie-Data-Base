import React from 'react';

const FavBox = ({ FavList }) => {
    console.log(FavList)
    return (
        <div className='overlay d-flex align-items-center justify-content-center'>
            <FavList />
        </div>
    )
}

export default FavBox