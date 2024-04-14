import { useEffect, useState } from "react"
import axios from "axios";
import { BASE_URL, csvUrl } from "../../constants";
import SearchableDropdown from "../SearchableDropdown";

const UploadStudent = () => {

    const [dropSchool,setDropSchool] = useState([]);
    const [selectedSchool,setSelectedSchool] = useState(null);
    const [file,setFile] = useState(null);

    const fetchSchool = async () => {

        try {
          const res = await axios.get(`${BASE_URL}school/getAllSchools`);
          console.log(res.data.schools);
          const transformedSchools = res.data.schools.map((school) => ({
            // value: school._id,
            value: school.medium,
            district: school.district,
            label: school.name + " " + school.district,
            syllabus: school.syllabus,
            id: school._id,
          }));
          setDropSchool(transformedSchools);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=> {
        fetchSchool();
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);  // 'file' is the field name expected by the server
    
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
    
        try {
            const res = await axios.post(`${BASE_URL}student/uploadStudentsCSV/${selectedSchool.id}`, formData, config);
            console.log(res.data);  // Handle the response data from the server
            alert('Students uploaded successfully')
        } catch (error) {
            console.error("Error uploading file:", error.response.data);
        }
    }

  return (
    <div className="p-5">
        <div className="flex justify-between">
             <h1 className="text-3xl font-semibold p-4">Upload Students CSV</h1>
             <a href={csvUrl} 
             className="bg-orange-500 hover:bg-orange-400 p-3 h-2/3 text-white rounded-lg font-semibold"
             target="_blank"
             rel="noopener noreferrer"
            >
                    Download CSV
                </a>
        </div>
        
        <div className="">
                <label
                  htmlFor="standard"
                  className="block mb-2 text-xl font-medium text-gray-900 "
                >
                  School
                </label>
                <SearchableDropdown
                  options={dropSchool}
                  onChange={setSelectedSchool} // Use setSelectedSchool directly
                  placeholder="Select School"
                />
        </div>

        {selectedSchool ? (
            <form className="p-5 rounded-lg shadow-lg m-5 w-1/3 mx-auto" onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept=".csv, application/vnd.ms-excel, text/csv"
                    required
                />
                <button className="bg-orange-500 hover:bg-orange-400 p-3 rounded-lg font-semibold">
                    Upload
                </button>
            </form>
        )   :``

        }
        
    </div>
  )
}

export default UploadStudent