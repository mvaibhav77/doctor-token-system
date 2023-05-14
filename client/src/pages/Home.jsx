import React, { useContext, useEffect } from 'react'
import TokenForm from '../components/TokenForm'
import { DatabaseContext } from '../Context/DatabaseContext'

function Home() {
  const {patients,handleTokenChange,currentToken} = useContext(DatabaseContext);
  let i=0;

  useEffect(()=>{
    // Logging patinets to console for testing
    console.log(patients);
  },[patients])

  return (
    <div className='container patients mx-auto my-4'>
      <h1 className='mb-3'>Token Dashboard for doctor's clinic</h1>
      <div className="patientDetails">
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope = 'col'>#</th>
              <th scope = 'col'>Name</th>
              <th scope = 'col'>Phone</th>
              <th scope = 'col'>Token</th>
            </tr>
          </thead>
          <tbody>
            {(patients.length!==0) ? patients.map((patient)=>{
              if(currentToken === patient.token){
                return (
                  <tr className='table-danger'  key={patient.token}>
                    <th scope='row'>{++i}</th>
                    <td>{patient.name}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.token}</td>
                  </tr>
                  )
              }else{
                return (
                  <tr key={patient.token}>
                    <th scope='row'>{++i}</th>
                    <td>{patient.name}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.token}</td>
                  </tr>
                )
              }
            }) : (
              <tr>
                <td colSpan={4}><h3>No patient till now...</h3></td>
              </tr>
            )}
            
          </tbody>
        </table>
        <button className='btn btn-success' onClick={handleTokenChange}>NEXT TOKEN</button>
      </div>
      <TokenForm/>
    </div>
  )
}

export default Home