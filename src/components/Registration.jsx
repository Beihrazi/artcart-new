import React from 'react';
import styled from 'styled-components';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NavLink ,useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import TextError from './TextError';
import axios from "axios";
import { BASE_URL } from './common/config';

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = values => {
    values["role"] = "seller"
    const url = window.location.href;
    const d = url.split("/")
    const r = d[3];

    if(r==='seller')
      values["role"] = "seller"
    else
    values["role"] = "customer"
    console.log(values)
    // console.log( values)
    axios.post(`${BASE_URL}/auth/signup`, values)
     .then(res => {
       console.log("res",res.data)
     })
     .then(err => console.log(err))
};

const validationSchema = Yup.object({
  email: Yup.string().required("Email Required").email("Invalid Email Format"),
  password: Yup.string().required("Password Required").min(8, 'Password must be at least 8 characters'),
});

const Registration = () => {
 
  const url = window.location.href;
  const d = url.split("/")
  let s = d[3];
  return (
    <Wrapper>
      <div className="container">
        <div className="imageSection">
          <div className="content">
            <h1>Join the largest artwork community</h1>
            <p id='content-p'>Get free access to millions peice of art, showcase, promote, sell & share your work with other members in the ArtWork Community.</p>
          </div>
        </div>

        <div className="registrationSection">

          <Formik 
          initialValues = {initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          >
           
          <Form>
          <h2 className="title">Join ArtWork</h2>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field
                type='email'
                id="email"
                name='email'
              />
              <ErrorMessage name='email' component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="password">Password</label>
              <Field
                type='password'
                id="password"
                name='password'
                
              />
              <ErrorMessage name='password' component={TextError} />
            </div>
            
            <button type='submit'>Submit</button>
            <p>Already a member? <NavLink className="log-in" to={s==='seller'?'/seller/login':'/login'}>Log in</NavLink></p>
          </Form>

         
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default Registration

const Wrapper = styled.div`
  height: 97vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.365), rgba(0,0,0,0.5)),url('./images/nature.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .container{
    width: 900px;
    height: 680px;
    background-color: white;
    display: flex;
    
  }
  .imageSection{
    flex: 1;
    background-image: linear-gradient(rgba(0, 0, 0, 0.486), rgba(0, 0, 0, 0.42)),url('./images/flower.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
  }
  .content{
    margin: 30px;
    height: 60%;
    
    
  }
  h1{
    width: 80%;
    font-size: 40px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 1.2;
    color: #fff;
    margin-bottom: 30px;
  }
  #content-p{
    font-size: 20px;
    color: #fdfdfde5;
  }
  .registrationSection{
    background: #f8f8fef3;

    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 0px;
    border-radius: 1px solid black;
    
  }
  
  .title{
    font-weight: bold;
    font-size: 35px;
    margin-bottom: 40px;
  }
  label{
    font-size: 18px;
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
  }
  input[type='password'],
  input[type='email']{
    display: block;
    width: 300px;
    padding: 6px 12px;
    font-size: 16px;
    line-height: 1.4;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    
  }
  p{
    font-size: 18px;
  }
  .form-control{
    margin-bottom: 20px;
  }
  button{
    width: 100%;
    height: 40px;
    background-color: #2c5c66;
    border: 1px solid #ccc;
    color: white;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
 
  .log-in{
    font-weight: 3000;
    color: #24da24;
    text-decoration: none;
  }
  .error{
    color: red
  }
`
