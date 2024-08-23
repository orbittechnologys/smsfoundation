import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { BASE_URL } from "../../constants";
import SearchableMultiDropdown from "../SearchableMultiDropdown";
import { toast } from "react-toastify";


const EditInstructor = () => {

    const {instructorId} = useParams();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [school, setSchool] = useState([]);
    const [medium, setMedium] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState("");
    const [qualification, setQualification] = useState("");
    // const [selectedSchool, setSelectedSchool] = useState("NO");
    const [selectedSchool, setSelectedSchool] = useState([]); // Initialize selectedSchool as null
    const [dropSchool, setDropSchool] = useState([]);
    const [showModel, setShowModel] = useState(false);


    const handleSchoolChange = (selectedOptions) => {
        // selectedOptions will be an array of { value, label } objects
        console.log(selectedOptions);
        setSelectedSchool(selectedOptions || []); // Handle null by setting to empty array
      };

      const fetchSchool = async () => {
        try {
          const res = await axios.get(`${BASE_URL}school/getAllSchools`);

          const transformedSchools = res.data.schools.map((school) => ({
            // value: school._id,
            value: school.medium,
            district: school.district,
            label: school.name + " " + school.district,
            id: school._id,
          }));
          console.log(transformedSchools);
          setDropSchool(transformedSchools);
        } catch (error) {
          console.log(error);
        }
      };
      
    const fetchInstructor = async(instructorId) => {
        try {
            console.log(instructorId);
            const res = await axios.get(`${BASE_URL}instructor/id/${instructorId}`);
            console.log(res.data);
            setName(res.data.instructor.firstName);
            setLastName(res.data.instructor.lastName);
            setMiddleName(res.data.instructor.middleName);
            setGender(res.data.instructor.gender);
            setEmail(res.data.instructor.user?.email);
            setPassword(res.data.instructor.user?.password);
            setSchool(res.data.instructor.school);
            setMedium(res.data.instructor.medium);
            setPhone(res.data.instructor?.user?.phone);
            setQualification(res.data.instructor.qualification);

            const transformedSchools = res.data.instructor.school.map((school)=> ({
              value: school.medium,
              district: school.district,
              label: school.name + " " + school.district,
              id: school._id,
            }))
            console.log(transformedSchools);
            setSelectedSchool(transformedSchools);

        } catch (error) {
            console.log(error);
        }
    }

    const handelDeleteClick = () => {
      setShowModel(true);
    }
  
    const handelDeleteCancle = () => {
      setShowModel(false);
    }
  
    const handelConfirmDelete = async () => {
      try {
        const response = await axios.delete(`${BASE_URL}instructor/deleteInstructor/${instructorId}`);
        console.log(instructorId);
        console.log(response.data);
        if(response.status === 200) {
          toast.success("School deleted successfully");
          setShowModel(false);
          navigate("/admin/allInstructor");
        } 
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete the school");
      }
    }

    useEffect(()=> {
        if(instructorId){
            fetchInstructor(instructorId);
            fetchSchool();
        }
            
    },[instructorId])

    const navigate = useNavigate();

    const editInstructorApi = async (reqbody) => {
      try {
        const res = await axios.post(`${BASE_URL}instructor/editInstructor`,reqbody);
        console.log(res.data);
        alert('Edited Instructor Successfully');
        navigate('/admin/Allinstructor')
      } catch (error) {
        console.log(error);
        alert('Error occured while editing instructor');
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const reqbody = {
        instructorId,
        firstName: name,
        lastName: lastName,
        middleName: middleName,
        email: email,
        phone,
        qualification,
        gender: gender,
        // school: selectedSchool,
        school: selectedSchool.map(school => school.id),// Access value property of selectedSchool
  
        medium: Array.isArray(selectedSchool) ? selectedSchool[0].value : `ENGLISH`,
      };

      console.log(reqbody);
      editInstructorApi(reqbody);
    }

  return (
    <>
      <div className="my-5">
        <p className="font-semibold text-2xl">Edit Instructor</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                First Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="First Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Middle Name
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Middle Name"
                required
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <select
                name=""
                id=""
                className="mt-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="NONE">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phoneNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                // onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="qualification"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Qualification
              </label>
              <input
                type="text"
                id="qualification"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                required
                // onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="John"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <h1>Schools</h1>

          <ul>
            {selectedSchool?.map((school) => {
              return <li key={school.id}>{school.label}</li>;
            })}
          </ul>

          <div className="">
            <label
              htmlFor="schoolMul"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              School
            </label>
            <SearchableMultiDropdown
              options={dropSchool}
              onChange={handleSchoolChange} //
              placeholder="Select School"
              // defaultValue={selectedSchool}
            />
          </div>
        </div>

        <div className="flex justify-start items-center">
          <button
            type="submit"
            className="mt-5 text-orange-500  hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Edit Instructor
          </button>
        </div>
      </form>
      <button
        onClick={handelDeleteClick}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mt-4"
      >
        Delete Instructor
      </button>
      {showModel && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the instructor?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handelDeleteCancle}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handelConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditInstructor