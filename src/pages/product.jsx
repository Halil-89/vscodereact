import Header from '../components/header/header';
import React from 'react'
import Edit from "../components/products/edit"

const product = () => {
    return (
        <>
            <Header />
            <div className='px-6'>
                <h1 className='text-4xl font-bold text-center mb-4'>
                    <Edit/>
                </h1>

            </div>
        </>
    )
}

export default product