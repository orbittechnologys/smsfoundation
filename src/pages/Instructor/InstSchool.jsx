import axios from "axios";
import { useEffect, useState } from "react"
import { BASE_URL } from "../../constants";


const InstSchool = () => {

    const [schoolDoc,setSchoolDoc] = useState(null);

    const fetchSchool = async (userId) => {
        
        const res = await axios.get(`${BASE_URL}instructor/getByUserId/${userId}`);
        console.log(res.data);
        if(Array.isArray(res.data.instructorDoc?.school)){
            setSchoolDoc(res.data.instructorDoc?.school[0])
        }
    }

    useEffect(() => {
        fetchSchool(sessionStorage.getItem('user_id'));
    },[])
  return (
    <div>InstSchool

        <p>{JSON.stringify(schoolDoc)}</p>
    </div>
  )
}

export default InstSchool