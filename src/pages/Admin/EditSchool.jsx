import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../../constants";
import SearchableDropdown from "../SearchableDropdown";

const EditSchool = () => {
  const { schoolId } = useParams();

  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [principalName, setPrincipalName] = useState("");
  const [principalContact, setPrincipalContact] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState(Number);
  const [Internet, setInternet] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [medium, setMedium] = useState("");
  const [state, setState] = useState("");
  const [projectName, setProjectName] = useState("");
  const [partnerName, setPartnerName] = useState("");

  const [dropMedium, setDropMedium] = useState([]);
  const [dropSyllabus, setDropSyllabus] = useState([]);

  const [selectedMedium, setSelectedMedium] = useState(null);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const res2 = await axios.get(`${BASE_URL}syllabus/getAll`);

      const transformedSyllabus = res2.data.syllabus.map((syllabus) => ({
        // value: school._id,
        value: syllabus.name,
        label: syllabus.name,
        id: syllabus._id,
      }));

      setDropSyllabus(transformedSyllabus);

      const res3 = await axios.get(`${BASE_URL}medium/getAll`);

      const transformedMediums = res3.data.mediums.map((medium) => ({
        // value: school._id,
        value: medium.name,
        label: medium.name,
        id: medium._id,
      }));

      setDropMedium(transformedMediums);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSchool = async (schoolId) => {
    if (schoolId) {
      try {
        console.log(schoolId);
        const res = await axios.get(`${BASE_URL}school/id/${schoolId}`);
        console.log(res.data);

        setSchoolName(res.data.school.name);
        setAddress(res.data.school.address);
        setPrincipalName(res.data.school.principalName);
        setPrincipalContact(res.data.school.principalContact);
        setDistrict(res.data.school.district);
        setMedium(res.data.school.medium);
        setPincode(res.data.school.pincode);
        setInternet(res.data.school.internet);
        setSyllabus(res.data.school.syllabus);
        setState(res.data.school.state);
        setProjectName(res.data.school.projectName);
        setPartnerName(res.data.school.partnerName);
        setSelectedMedium(res.data.school.medium);
        setSelectedSyllabus(res.data.school.medium);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (schoolId) {
      fetchSchool(schoolId);
      fetchData();
    }
  }, [schoolId]);

  const handleEditApi = async (reqbody) => {
    try {
      const res = await axios.post(`${BASE_URL}school/editSchool`, reqbody);
      console.log(res.data);
      alert("School Edited successfully");
      navigate("/admin/Schools");
    } catch (error) {
      console.log(error);
      alert("There was error editing school");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const reqbody = {
      schoolId,
      name: schoolName,
      address: address,
      principalName: principalName,
      principalContact,
      district: district,
      state,
      projectName,
      partnerName,
      pincode: parseInt(pincode),
      internet: Internet,
      syllabus: selectedSyllabus.value ? selectedSyllabus.value : syllabus,
      medium: selectedMedium.value ? selectedMedium.value : medium,
    };
    console.log(reqbody);
    handleEditApi(reqbody);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 mt-5">
        <div>
          <label
            htmlFor="school_name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            School Name
          </label>
          <input
            type="text"
            id="school_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="School Name"
            required
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="principal_name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Principal Name
          </label>
          <input
            type="text"
            id="principal_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Principal Name"
            value={principalName}
            required
            onChange={(e) => setPrincipalName(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="principal_name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Principal Contact
          </label>
          <input
            type="number"
            id="principal_contact"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Principal Contact"
            required
            value={principalContact}
            onChange={(e) => setPrincipalContact(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="School address goes here"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="district"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            District
          </label>
          <input
            type="text"
            id="district"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="district"
            required
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="pincode"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Pincode
          </label>
          <input
            type="number"
            id="pincode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="pincode"
            required
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="state"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            State
          </label>
          <input
            type="text"
            id="state"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="state"
            required
            value={state}
            onChange={(e) => setState(e.target.value.toUpperCase())}
          />
        </div>
        <div>
          <label
            htmlFor="project_name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Project Name
          </label>
          <input
            type="text"
            id="project_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="project_name"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="partner_name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Partner Name
          </label>
          <input
            type="text"
            id="partner_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="partner name"
            required
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="school_status"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            School Status
          </label>
          <select
            id="school_status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option selected>Choose a status</option>
            <option value="AC">ACTIVE</option>
            <option value="INAC">INACTIVE</option>
            <option value="HO">HANDED OVER</option>
          </select>
        </div>
        {/* <div className="">
        <p className="text-xl font-semibold my-5 ">Internet Access</p>
        <div className="flex flex-wrap">
          <div className="flex items-center me-4">
            <input
              id="yes"
              type="radio"
              value={Internet}
              name="Internet"
              className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 "
            //   onChange={handleInternet}
            />
            <label
              htmlFor="yes"
              className="ms-2 text-sm font-medium text-gray-900 "
            >
              Yes
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              id="no"
              type="radio"
              value={Internet}
              name="Internet"
              className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 "
            //   onChange={handleInternet}
            />
            <label
              htmlFor="no"
              className="ms-2 text-sm font-medium text-gray-900 "
            >
              No
            </label>
          </div>
        </div>
      </div> */}
        <div className="col-span-2">
          <p className="text-xl font-semibold my-5">Medium Board</p>
          <div className="flex gap-5">
            <div className="grid gap-5">
              <p className="rounded-2xl px-5 py-1 bg-green-300">{medium}</p>
              <SearchableDropdown
                options={dropMedium}
                placeholder={"Search Medium"}
                onChange={setSelectedMedium}
              />
            </div>
            <div>
              <div className="grid gap-5">
                <p className="rounded-2xl px-5 py-1 bg-green-300">{syllabus}</p>
                <SearchableDropdown
                  options={dropSyllabus}
                  placeholder={"Search Board"}
                  onChange={setSelectedSyllabus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid place-items-center">
        <button
          type="submit"
          className="text-white bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
        >
          Edit School
        </button>
      </div>
    </form>
  );
};

export default EditSchool;
