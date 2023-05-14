import React, { useContext, useEffect, useState } from 'react'
// import { DatabaseContext } from '../Context/DatabaseContext'
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');

function Token() {
  // const {currentToken} = useContext(DatabaseContext);
  const [currToken, setCurrToken] = useState('');

  // Tried to update token using Context but failed //
  // useEffect(()=>{
  //     setCurrToken(currentToken)
  //     console.log(currentToken)
  // },[currentToken])

  // Using socket to change current token in token screen //
  socket.on('broadcastToken', currentToken=>{
    setCurrToken(currentToken);
  })

  return (
    <div className='container text-center my-5'>
      <h3>Current Token</h3>
      <h1 className='font-big'>{currToken}</h1>
    </div>
  )
}

export default Token