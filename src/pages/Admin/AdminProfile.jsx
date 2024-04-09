import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { BASE_URL } from "../../constants";
import Studentpng from "../../assets/Reading_book_re_kqpk.png";


const AdminProfile = () => {

    const {userId} = useParams();

    const [userDoc, setUserDoc] = useState(null);
    

    const fetchData = async (userId) => {
        try {
            const res = await axios.get(`${BASE_URL}user/id/${userId}`)
            console.log(res.data);
            setUserDoc(res.data.userDoc);
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        if(userId){
            fetchData(userId);
        }
    },[])

  return (
    <div className="flex justify-center items-center h-full w-full my-10">
      {userDoc && (
        <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg">
          <img
            src={Studentpng}
            alt=""
            className="w-full h-64 object-cover object-center"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {userDoc?.username} 
            </h2>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Role : ADMIN 
            </h2>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Phone:</span> {userDoc?.phone}
            </p>
           
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Email:</span> {userDoc?.email}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProfile