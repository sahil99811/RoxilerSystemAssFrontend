import React, { useState } from 'react'
import TemplateForm from '../components/auth/TemplateForm'
import LoginForm from '../components/auth/LoginForm'
import SignupForm from '../components/auth/SignupForm'

export default function Auth() {
  const [form,setForm]=useState(true)
  return (
    <div style={{display:"flex"}}>
      <TemplateForm/>
      <div style={{width:"35%",height:"100vh"}}>
        {
        form?<LoginForm />:<SignupForm />
        }
       <div style={{display:'flex',flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        <p>{form?"Have no account yet?":"Have an account ?"}</p>
        <button onClick={()=>setForm(!form)} style={{width:"50px",height:"25px",backgroundColor:"inherit",border:"none",color:"blue",cursor:"pointer"}}>{form?"Register":"Log in"}</button>
       </div>
      </div>  
    </div>
  )
}
