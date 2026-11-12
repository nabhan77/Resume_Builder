import React from 'react'
import { MdAttachEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div style={{height:'400px',backgroundColor:"black"}} className='d-flex justify-content-center align-items-center flex-column text-light'>
        <h1 style={{marginTop:10}}>Contact Us</h1>
        <h5 style={{marginTop:10}} className='mt-3'><MdAttachEmail />resumebuilder@gmail.com</h5>
        <h5 style={{marginTop:10}} className='me-2'><FaPhoneAlt />9876543210</h5>
        <h4 style={{marginTop:10,marginBottom:10}}>Connect With Us</h4>
        <div className='d-flex justify-content-center align-items-center my-3'>
    <FaWhatsapp style={{marginRight:10}} className='mx-2 fs-3'/>
    <FaFacebook style={{marginRight:10}} className='mx-2 fs-3'/>
    <FaInstagram style={{marginRight:10}} className='mx-2 fs-3'/>
        </div>
        <p style={{marginTop:10}}>Designed & Built with React ❤️</p>
    </div>
  )
}

export default Footer
