import React, { useContext } from 'react'
import { DatabaseContext } from '../Context/DatabaseContext'


function TokenForm() {
  
  const {name,phone,setName,setPhone,handleSubmit} = useContext(DatabaseContext);

  return (
    <div className="container mt-4 token-from">
        <h3>Add Patient</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" value ={name} onChange={(e)=>setName(e.target.value)} className="form-control my-1" id="nameInput" placeholder='Name' />
          <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control my-1" id="phoneInput" placeholder='Phone' />
          <button type="submit" className='btn btn-info'>GENERATE TOKEN</button>
        </form>
    </div>
  )
}

export default TokenForm