import axios from "axios";
import { useEffect, useState } from "react"
import { BASE_URL } from "../../constants";


const EditStudent = () => {

    const [query,setQuery] = useState('');

    const [instructor,setInstructor] = useState(null);

    const [students,setStudents] = useState([]);
    const [selectedStudent,setSelectedStudent] = useState(null);

    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [rollNo,setRollNo] = useState(null);
    const [standard,setStandard] = useState(null);

    const [password,setPassword] = useState(null);

    const fetchInstructorByUserId = async (userId) => {
        try {
            const res = await axios.get(`${BASE_URL}instructor/getByUserId/${userId}`);
            console.log(res.data);
            setInstructor(res.data.instructorDoc);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchInstructorByUserId(sessionStorage.getItem('user_id'));
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStudents([]);
        console.log(query);
        console.log(instructor);
        const res = await axios.get(`${BASE_URL}student/getStudentQuerySchool`,{
            headers: {
                query: query,
                school: instructor?.school?._id
              }
        })
        console.log(res.data);
        setStudents(res.data.students);
    }

    const handleStudentSelect = (student)=> {
        console.log(student,"selected")
        setStudents([])
        setSelectedStudent(student);
        setFirstName(student?.firstName)
        setLastName(student?.lastName);
        setRollNo(student?.rollNo);
        setStandard(student?.standard);
    }

    const handleStudentUpdate = async(e) => {
        e.preventDefault();


        const reqBody = {
            "studentId": selectedStudent?._id,
            "firstName": firstName,
            "lastName": lastName,
            "rollNo": rollNo,
            "standard": standard
        }

        console.log(reqBody)

        try {
            const res = await axios.post(`${BASE_URL}student/updateStudent`,reqBody);
            console.log(res.data);
            alert('Student Updated successfully');
            setSelectedStudent(null);
        } catch (error) {
            console.log(error);
        }
    }

    const handleResetPassword = async(e) => {
        e.preventDefault();
        
        const reqBody = {
            "studentId": selectedStudent?._id,
            "newPassword": password
        }
        console.log(reqBody);

        try {
            const res = await axios.post(`${BASE_URL}student/resetPassword`,reqBody);
            console.log(res.data);
            alert('Password changed successfully');
            setSelectedStudent(null);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>

<form className="max-w-md mx-auto" onSubmit={handleSubmit}>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input 
        onChange={(e)=> setQuery(e.target.value)}
        type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Student" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
    </form>
    {Array.isArray(students) && students.length > 0 ? (
        <div className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
        <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
            {students?.map((student,index)=> {
                return(
                    <li key={index} onClick={() => handleStudentSelect(student)}>
                    <p  className="block px-4 py-2 hover:bg-gray-100  ">{student?.firstName} {student?.lastName}</p>
                  </li>
                )
            })}
         
        </ul>
    </div>
    ):``}

    {selectedStudent? (
        <form onSubmit={handleStudentUpdate}>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
            <input type="text" placeholder="Roll No" value={rollNo} onChange={(e)=> setRollNo(e.target.value)}/>
            <input type="number" placeholder="Standard" value={standard} onChange={(e)=> setStandard(e.target.value)}/>
            <button type="submit">Update</button>
        </form>
    ):``}

    {selectedStudent? (
        <form onSubmit={handleResetPassword}>
            <p>Reset Password</p>
            <input type="password" placeholder="Enter new Password"  onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit"> Reset Password</button>
        </form>
    ):``}
    


    </div>
  )
}

export default EditStudent