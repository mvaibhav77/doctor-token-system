import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');

const DatabaseContext = createContext();

const ContextProvider = ({children})=>{
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [currentToken, setCurrentToken] = useState('');
  const [token, setToken] = useState(101);
  const [patients, setPatients] = useState([]);
  const url1 = 'http://localhost:5000/patients';
  const url2 = 'http://localhost:5000/currentToken';

  useEffect(()=>{
    getPatients();
    getCurrentToken();
  },[])


// Get patients and storing them in patients list
  const getPatients = async ()=>{
    try {
      const res = await fetch(url1, {
        method: 'GET',
        headers: {"Content-Type" : "application/json"}
      })
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  }


// Getting current token
  const getCurrentToken = async ()=>{
    try {
      const res = await fetch(url2, {
        method:'GET',
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await res.json();
      socket.emit('changeToken', (data.token))
      
      if(data.token){
        setCurrentToken(data.token);
        socket.emit('tokenChange', data.token);
      }else{
        setCurrentToken('T-101');
        socket.emit('tokenChange', 'T-101');

      }

      if(patients[0]){
        setCurrToken(patients[0].token);
        socket.emit('tokenChange', patients[0].token);
      }

      return data.token;

    } catch (error) {
      console.log(error)
    }
  }


// Setting curr token from database
  const setCurrToken = async (token)=>{
    try {
      await fetch(`${url2}/${token}`,{
        method: 'PATCH',
        headers: {"Content-Type": "application/json"}
      })
      setCurrentToken(token);
    } catch (error) {
      console.log(error)
    }
  }

// Changing Current Token
  const handleTokenChange= ()=>{
    patients.forEach((patient)=>{
      if(patient.token === currentToken && patient.token !== patients[patients.length-1].token){
        setCurrToken(`T-${Number(patient.token.substring(2,5))+1}`)
        socket.emit("tokenChange", `T-${Number(patient.token.substring(2,5))+1}`);
      }
    })
  }

// Adding New patients 
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      if(name.length< 50 && name.length>1){
        if(patients.length>0){
          setToken(Number(patients[patients.length - 1].token.substring(2,5))+1)
        }
        // setToken(Number(token)+1);
        const body = {pname:name,phone,token:`T-${token}`};
        const res = await fetch(url1, {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        })
        const data = await res.json();
        console.log('submitted');
        console.log('Worked',data);
        window.location.reload();
      }else{
        alert('Enter proper name and appropriate phone number');
      }

    } catch (error) {
      console.log(error)
    }
  }



  
  return (
    <DatabaseContext.Provider value={{
      name,
      setName,
      setPhone,
      phone,
      handleSubmit,
      getPatients,
      patients,
      handleTokenChange,
      currentToken,
    }}>
      {children}
    </DatabaseContext.Provider>
  )
}


export {ContextProvider, DatabaseContext}