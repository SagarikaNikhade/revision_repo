import React, { useState } from 'react'

const RegisterUsestate = () => {
  const [form , setForm] = useState({
    name : "",
    email : "",
    password : "",
    conformedPassword : ""
  });

  const handleSubmit = (e) =>{
   e.preventDefault();

   let obj = {
    name : "",
    email : "",
    password : "",
    conformedPassword : ""
  }
   localStorage.setItem("form",obj)
  }

  return (
    <div>
      <h1>My name is {form.name}</h1>
      <br/>
      <input type="text" placeholder='name' value={form.name} onChange={(e)=>setForm({...form,name :e.target.value})}/>
      <br/>
      <input type="text" placeholder='email' value={form.email} onChange={(e)=>setForm({...form,email :e.target.value})}/>
      <br/>
      <input type="text" placeholder='password' value={form.password} onChange={(e)=>setForm({...form,password :e.target.value})}/>
      <br/>
      <input type="text" placeholder='conformPassword' value={form.conformedPassword} onChange={(e)=>setForm({...form,conformedPassword :e.target.value})}/>
      <br/>
      <button onSubmit={handleSubmit}>Register</button>
      <br/>
      
    </div>
  )
}

export default RegisterUsestate
