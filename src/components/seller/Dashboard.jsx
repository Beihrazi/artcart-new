import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Footer2 from '../common/Footer2'
import Header from '../common/Header'
import AddProduct from './dashboardCompo/AddProduct'
import ManageOrders from './dashboardCompo/ManageOrders'
import ManageProducts from './dashboardCompo/ManageProducts'
import SellerRegistration from './SellerRegistration'

const buttons=[
    {
        name:"Complete your profile", 
        type:"button",
        id:"complete-profile",
    },
    ,
    {
        name:"Add Product",
        type:"button",
        id:"add-product"
    },
    {
        name:"Manage Orders",
        type:"button",
        id:"manage-orders"
    },
    {
        name:"Manage Products",
        type:"button",
        id:"manage-products"
    }
]






const Dashboard = () => {

   const navigate =  useNavigate();
    

    const [btID,SetbtID] =useState("add-product");
    
    const handleClick = (e) =>{
        SetbtID(e.target.id);
        
    }
    return (
        <Wrapper>
            <Header/>
            <div className='container'>
                <div className='con1'>
                    <div className='firstSec'>
                            {buttons.map((button, index) => (
                                <button key={index} id={button.id} type={button.type} onClick={handleClick}>{button.name}</button>
                            ))}
                        
                    </div>
                    <VerticalLine />
                    <div className='secondSec'>
                        {console.log(btID)}
                        {btID === "add-product" && <AddProduct />}
                        {btID === "complete-profile" && navigate("/seller/completeprofile")}
                       
                        {btID === "manage-orders" && <ManageOrders />}
                        {btID === "manage-products" && <ManageProducts />}
                    </div>

                </div>
            </div>
            <Footer2 />
        </Wrapper>
    )
}

export default Dashboard

const Wrapper = styled.section`
    overflow-y: scroll;
    height: 98vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.100), rgba(0,0,0,0.4)),url('.public/images/nature.jpg');
    background-size: cover;
    background-position: center;
    justify-content: center;
    align-items: center;
    .container{
        height:1000px
        background-color: white;
       display:flex;
        
      }

    .foo{
        mergin-top: 80px;
    }

    .con1{
        height:700px;
        display:flex;
    }

    .firstSec{
       
        width: 200px;
        padding:20px;
        margin-top:200px;
    }

    .secondSec{
        
        border: 1px solid black;
        border-radius:10px;
        padding:20px;
        margin:30px;
        width:1150px
    }

    button{
        width: 100%;
        height: 40px;
        background-color: #18a021;
        border: 1px solid #ccc;
        color: white;
        text-transform: uppercase;
        margin-bottom: 20px;
        transition: transform 0.5s;
        cursor: pointer;
    
    }

    button:hover{
        background-color: black;
        border-radius:7px;
    }

`

const VerticalLine = styled.div`
  border-left: 3px solid #333; 
  height: 70%; 
  margin-top:70px;
  

  `;
