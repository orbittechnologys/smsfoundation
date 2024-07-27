import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import sfLogo from "../assets/sflogo.png";
import mainSvg from "../assets/undraw_starlink_3r0a.svg";
import syncImg from "../assets/sync.png";
import ethernetImg from "../assets/lan.png";
import wifiImg from "../assets/wifi.png";

const StatusPage = () => {
  const navigate = useNavigate();

  const [staticIp, setStaticIp] = useState("192.168.1.2");
  const [ethIp, setEthIp] = useState("N/A");
  const [wlanIp, setWlanIp] = useState("N/A");

  const toggleOnlineMode = async () => {
    try {
      const res = await axios.post("http://localhost:4000/switchOnline");
      console.log(res.data);
      alert("Switched to Online mode, Students cannot access page");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const toggleOfflineMode = async () => {
    try {
      const res = await axios.post("http://localhost:4000/switchOffline", {
        ip: staticIp,
      });
      console.log(res.data);
      alert("Switched to Offline mode, Students can access page");
      alert(`Visit http://${staticIp}:5173`);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const fetchIps = async () => {
    try {
      const res = await axios.get("http://localhost:4000/getIpConfig");
      console.log(res.data);
      setEthIp(res.data.ethIp);
      setWlanIp(res.data.wlanIp);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch Ips");
    }
  };

  useEffect(() => {
    fetchIps();
  }, []);

  return (
    <>
      <div className="bg-[#F7F6F3] min-h-screen w-full p-5 flex flex-col items-center font-poppins">
        <div className="flex justify-center items-center w-full py-4 border-b border-gray-300 mb-8">
          <img src={sfLogo} alt="logo" className="h-16" />
          <div className="mx-5 h-10 border-l border-gray-500"></div>
          <div>
            <p className="text-orange-600 font-bold text-3xl">SEHGAL</p>
            <p className="text-orange-400 text-lg font-semibold">Foundation</p>
          </div>
        </div>

        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold text-[#140342] mb-4">
            Network Status
          </h2>
          <div className="flex items-center gap-3 mb-3">
            <img src={ethernetImg} alt="Ethernet" className="h-5 w-5" />
            <span className="text-lg font-medium text-gray-700">
              Ethernet IP: <span className="font-bold">{ethIp}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <img src={wifiImg} alt="Wi-Fi" className="h-5 w-5" />
            <span className="text-lg font-medium text-gray-700">
              Wi-Fi IP: <span className="font-bold">{wlanIp}</span>
            </span>
          </div>
        </div>

        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-[#140342] mb-4">
            Connection Mode
          </h2>
          <button
            onClick={() => toggleOnlineMode()}
            type="button"
            className="flex items-center justify-center w-full px-6 py-3 mb-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-transform duration-200 ease-in-out"
          >
            <img src={syncImg} alt="Sync Icon" className="h-6 w-6 mr-2" />
            Connect Online - For Syncing Data
          </button>
          <div className="flex lg:flex-nowrap md:flex-nowrap flex-wrap justify-center items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <input
              type="text"
              value={staticIp}
              onChange={(e) => setStaticIp(e.target.value)}
              placeholder="Enter Static IP"
              className="flex-grow px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              onClick={() => toggleOfflineMode()}
              type="button"
              className="px-5 py-2 text-white bg-gradient-to-r from-red-400 to-red-500 font-semibold rounded-lg shadow-md hover:bg-red-500 hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 whitespace-nowrap"
            >
              Connect Offline
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusPage;
















// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router';

// const StatusPage = () => {
//     const navigate = useNavigate();

//     const [staticIp, setStaticIp] = useState("192.168.1.2");
//     const [ethIp,setEthIp] = useState("N/A");
//     const [wlanIp,setWlanIp] = useState("N/A");

//     const toggleOnlineMode = async() => {
//         try {
//             const res = await axios.post('http://localhost:4000/switchOnline');
//             console.log(res.data);
//             alert('Switched to Online mode, Students cannot access page');
//             navigate('/');
//         } catch (error) {
//             console.log(error);
//             alert('Something went wrong');
//         }
//     }

//     const toggleOfflineMode = async () => {
//         try {
//             const res = await axios.post('http://localhost:4000/switchOffline',{
//                 ip:staticIp
//             });
//             console.log(res.data);
//             alert('Switched to Offline mode, Students can access page');
//             alert(`Visit http://${staticIp}:5173`);
//         } catch (error) {
//             console.log(error);
//             alert('Something went wrong');
//         }
//     }

//     const fetchIps = async () => {
//         try {
//             const res = await axios.get('http://localhost:4000/getIpConfig');
//             console.log(res.data);
//             setEthIp(res.data.ethIp);
//             setWlanIp(res.data.wlanIp);
//         } catch (error) {
//             console.log(error);
//             alert('Failed to fetch Ips');
//         }
//     }

//     useEffect(() => {
//        fetchIps(); 
//     },[])

//    return (
//     <div>
//         <h1>StatusPage</h1>
//         <div>
//             <h1>Ethernet IP : {ethIp}</h1>
//             <h1>Wireless Lan IP: {wlanIp}</h1>
//         </div>
//         <div className='ml-20 my-10'>
//             <button onClick={()=> toggleOnlineMode()} type='button' className='px-4 py-2 bg-green-400 rounded-lg hover:scale-125'>Connect Online - For Syncing Data</button>
//         </div>
//         <div  className='ml-20 my-10'>
//             <input type='text' value={staticIp} onChange={(e) => setStaticIp(e.target.value)}/>
//             <button onClick={()=> toggleOfflineMode()} type='button' className='px-4 py-2 bg-red-400 rounded-lg'>Connect Offline</button>
//         </div>
        
//     </div>
//   )
// }

// export default StatusPage
