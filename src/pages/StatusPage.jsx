import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const StatusPage = () => {
    const navigate = useNavigate();

    const [staticIp, setStaticIp] = useState("192.168.1.2");
    const [ethIp,setEthIp] = useState("N/A");
    const [wlanIp,setWlanIp] = useState("N/A");

    const toggleOnlineMode = async() => {
        try {
            const res = await axios.post('http://localhost:4000/switchOnline');
            console.log(res.data);
            alert('Switched to Online mode, Students cannot access page');
            navigate('/');
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    }

    const toggleOfflineMode = async () => {
        try {
            const res = await axios.post('http://localhost:4000/switchOffline',{
                ip:staticIp
            });
            console.log(res.data);
            alert('Switched to Offline mode, Students can access page');
            alert(`Visit http://${staticIp}:5173`);
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    }

    const fetchIps = async () => {
        try {
            const res = await axios.get('http://localhost:4000/getIpConfig');
            console.log(res.data);
            setEthIp(res.data.ethIp);
            setWlanIp(res.data.wlanIp);
        } catch (error) {
            console.log(error);
            alert('Failed to fetch Ips');
        }
    }

    useEffect(() => {
       fetchIps(); 
    },[])

   return (
    <div>
        <h1>StatusPage</h1>
        <div>
            <h1>Ethernet IP : {ethIp}</h1>
            <h1>Wireless Lan IP: {wlanIp}</h1>
        </div>
        <div className='ml-20 my-10'>
            <button onClick={()=> toggleOnlineMode()} type='button' className='px-4 py-2 bg-green-400 rounded-lg hover:scale-125'>Connect Online - For Syncing Data</button>
        </div>
        <div  className='ml-20 my-10'>
            <input type='text' value={staticIp} onChange={(e) => setStaticIp(e.target.value)}/>
            <button onClick={()=> toggleOfflineMode()} type='button' className='px-4 py-2 bg-red-400 rounded-lg'>Connect Offline</button>
        </div>
        
    </div>
  )
}

export default StatusPage