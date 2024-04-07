import axios from 'axios';
import  { useEffect, useState } from 'react'
import { BASE_URL } from '../../constants';
import Table from '../../components/Table';
import SearchableDropdown from '../SearchableDropdown';

const MasterTable = () => {

    const [openTab, setOpenTab] = useState(1);
    const color = "red";

    const [subjects,setSubjects] = useState([]);
    const [syllabus,setSyllabus] = useState([]);
    const [medium,setMedium] = useState([]);

    const [dropMedium,setDropMedium] = useState([]);
    const [dropSyllabus,setDropSyllabus] = useState([]);

    const [formSyllabus,setFormSyllabus] = useState("");
    const [formRef,setFormRef] = useState("");

    const [formMedium,setFormMedium] = useState("");

    const [showSyllabus,setShowSyllabus] = useState(false);
    const [showMedium,setShowMedium] = useState(false);
    const [showSubject,setShowSubject] = useState(false);

    const [selectedMedium,setSelectedMedium] = useState(null);
    const [selectedSyllabus,setSelectedSyllabus] = useState(null);
    const [standard,setStandard] = useState(0);
    const [subjectName,setSubjectName] = useState("");

    const columnsSyllabus = [
        { label: "Name", accessor: "name", sortable: true },
        { label: "Reference", accessor: "reference", sortable: true },
        { label: "Date Created", accessor: "createdAt", sortable: true }
      ];

    const columnsMedium = [
      { label: "Name", accessor: "name", sortable: true },
      { label: "Reference", accessor: "reference", sortable: true },
      { label: "Date Created", accessor: "createdAt", sortable: true }
    ];

    const columnsSubject = [
      { label: "Name", accessor: "name", sortable: true },
      { label: "Syllabus", accessor: "syllabus", sortable: true },
      { label: "Medium", accessor: "medium", sortable: true },
      { label: "Standard", accessor: "standard", sortable: true },
      { label: "Chapters", accessor: "noOfChapter", sortable: true },
    ]

    const fetchData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}subject/getAllSubjects`);
            setSubjects(res.data.subjects);

            const res2 = await axios.get(`${BASE_URL}syllabus/getAll`);
            setSyllabus(res2.data.syllabus);
            const transformedSyllabus = res2.data.syllabus.map((syllabus) => ({
              // value: school._id,
              value: syllabus.name,
              label: syllabus.name, 
              id : syllabus._id,
            }));
            
            setDropSyllabus(transformedSyllabus);

            const res3 = await axios.get(`${BASE_URL}medium/getAll`);
            setMedium(res3.data.mediums);
            const transformedMediums = res3.data.mediums.map((medium) => ({
              // value: school._id,
              value: medium.name,
              label: medium.name, 
              id : medium._id,
            }));

            setDropMedium(transformedMediums);

            // console.log(res.data,res2.data,res3.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchData();
    },[]);


    const handleAddSyllabus = async(e) => {
      e.preventDefault();
      
      const reqBody = {
        name:formSyllabus,
        reference: formRef
      }

      console.log(reqBody);

      try {
        const res = await axios.post(`${BASE_URL}syllabus/add`,reqBody);
        console.log(res.data);
        alert('Syllabus Added Successfully !!!');
        setShowSyllabus(false);
        setFormSyllabus("");setFormRef("");

        fetchData();
      } catch (error) {
        console.log(error);
      }
    }

    const handleAddMedium = async(e) => {
      e.preventDefault();
      
      const reqBody = {
        name:formMedium,
        reference: formRef
      }

      console.log(reqBody);

      try {
        const res = await axios.post(`${BASE_URL}medium/add`,reqBody);
        console.log(res.data);
        alert('Medium Added Successfully !!!');
        setShowMedium(false);
        setFormMedium("");setFormRef("");
        
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }

    const handleAddSubject = async (e) => {
      e.preventDefault();

      if(!selectedMedium || !selectedSyllabus || standard == 0 || subjectName == ""){
        alert('Please fill all the details');
        return;
      }else{
        const reqBody = {
          "standard": standard,
          "medium": selectedMedium.value,
          "syllabus": selectedSyllabus.value,
          "name": subjectName
      }
      console.log(reqBody);

      const res = await axios.post(`${BASE_URL}subject/addSubject`,reqBody);
      console.log(res.data);
      alert('Subject added successfully');
      setShowSubject(false);
      fetchData();
      }
      
    }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Syllabus
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                 Medium
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                 Subject
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">

                {/* Syllabus  */}

                <div className={openTab === 1 ? "block" : "hidden"} id="link1">

                  <button
                  onClick={() => setShowSyllabus(true)}
                  className='bg-orange-600 px-4 py-4 rounded-lg text-white font-semibold text-sm'>Add Syllabus</button>
                  
                  <Table data={syllabus} columns={columnsSyllabus} label={"SYLLABUS"}/>
                </div>

                {/* Medium */}

                <div className={openTab === 2 ? "block" : "hidden"} id="link2">

                <button
                  onClick={() => setShowMedium(true)}
                  className='bg-orange-600 px-4 py-4 rounded-lg text-white font-semibold text-sm'>Add Medium</button>
                  
                  <Table data={medium} columns={columnsMedium} label={"MEDIUM"}/>
                </div>

                {/* Subject */}
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">

                <button
                  onClick={() => setShowSubject(true)}
                  className='bg-orange-600 px-4 py-4 rounded-lg text-white font-semibold text-sm'>Add Subject</button>

                  <Table data={subjects} columns={columnsSubject} label={"SUBJECT"}/>
                </div>

                {showSyllabus && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="px-4 py-6">
                <div className="flex items-start justify-between">
                  <div className="text-lg font-semibold">Add Syllabus</div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowSyllabus(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
                <form
                    onSubmit={handleAddSyllabus}
                    className="bg-gray-200 rounded-lg p-5 mx-auto"
                  >
                    <div>
                      <label
                        htmlFor="rest_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Enter Syllabus
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter Syllabus"
                          value={formSyllabus}
                          onChange={(e) => setFormSyllabus(e.target.value.toUpperCase())}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        />
                        
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="rest_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Enter Reference
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter Reference"
                          value={formRef}
                          onChange={(e) => setFormRef(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-5"
                        type="submit"
                      >
                        {" "}
                        Add Syllabus
                      </button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      )}

{showMedium && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="px-4 py-6">
                <div className="flex items-start justify-between">
                  <div className="text-lg font-semibold">Add Medium</div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowMedium(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
                <form
                    onSubmit={handleAddMedium}
                    className="bg-gray-200 rounded-lg p-5 mx-auto"
                  >
                    <div>
                      <label
                        htmlFor="rest_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Enter Medium
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter Medium"
                          value={formMedium}
                          onChange={(e) => setFormMedium(e.target.value.toUpperCase())}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        />
                        
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="rest_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Enter Reference
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter Reference"
                          value={formRef}
                          onChange={(e) => setFormRef(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-5"
                        type="submit"
                      >
                        {" "}
                        Add Medium
                      </button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      )}

{showSubject && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="px-4 py-6">
                <div className="flex items-start justify-between">
                  <div className="text-lg font-semibold">Add Subject</div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowSubject(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
                <form
                    onSubmit={handleAddSubject}
                    className="bg-gray-200 rounded-lg p-5 mx-auto"
                  >
                    <div>
                      <label
                        htmlFor="rest_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Enter Syllabus
                      </label>
                      <SearchableDropdown
                          options={dropSyllabus}
                          placeholder="Select Syllabus"
                          onChange={setSelectedSyllabus}
                      />
                    </div>
                    <div className='my-2'>
                      <label
                        htmlFor="rest_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Enter Medium
                      </label>
                      <SearchableDropdown
                          options={dropMedium}
                          placeholder="Select Medium"
                          onChange={setSelectedMedium}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="rest_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Enter Standard
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Enter Standard"
                          value={standard}
                          onChange={(e) => setStandard(e.target.value)}
                          maxLength={2}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="rest_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Enter Subject Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter Subject"
                          value={subjectName}
                          onChange={(e) => setSubjectName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-5"
                        type="submit"
                      >
                        {" "}
                        Add Subject
                      </button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MasterTable