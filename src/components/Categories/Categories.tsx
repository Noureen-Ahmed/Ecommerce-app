import React, { useEffect, useState } from 'react'
import Style from './Categories.module.css'
import ClipLoader from "react-spinners/ClipLoader";
import useProducts from '../../Hooks/useProducts';
export default function Categories() {
    let {data,isError,isLoading,error}=useProducts();
    if(isLoading){
        return <div className="py-8 w-full flex justify-center">
                <ClipLoader
            color='green'
            aria-label="Loading Spinner"
            data-testid="loader"
        />   </div> 
    }
    if(isError){
        return <div className="py-8 w-full flex justify-center">
            {/* <h3>{(err as Error)=}</h3> */}
        </div> 
    }
    return (
        <>
        <h1>Categories</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ab eius dolorum doloremque impedit nulla veritatis dolorem officia delectus?</p>
        </>
    )
}
