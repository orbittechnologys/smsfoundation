import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';
import Table from '../../components/Table';
import SearchableDropdown from '../SearchableDropdown';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const MasterTable = () => {
  const [openTab, setOpenTab] = useState(1);
  const color = "red";

  const [subjects, setSubjects] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [medium, setMedium] = useState([]);

  const [dropMedium, setDropMedium] = useState([]);
  const [dropSyllabus, setDropSyllabus] = useState([]);

  const [formSyllabus, setFormSyllabus] = useState("");
  const [formRef, setFormRef] = useState("");
  const [formMedium, setFormMedium] = useState("");

  const [showSyllabus, setShowSyllabus] = useState(false);
  const [showMedium, setShowMedium] = useState(false);
  const [showSubject, setShowSubject] = useState(false);
  
  const [editSyllabus,setEditSyllabus] = useState(false);
  const [editMedium,setEditMedium] = useState(false);
  const [editSubject,setEditSubject] = useState(false);

  const [selectedMedium, setSelectedMedium] = useState(null);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [standard, setStandard] = useState(0);
  const [subjectName, setSubjectName] = useState("");

  const [dropdownData, setDropdownData] = useState(null);
  const [dropdownType, setDropdownType] = useState("");

  const columnsSyllabus = [
    { label: "Name", accessor: "name" },
    { label: "Reference", accessor: "reference" },
    { label: "Date Created", accessor: "createdAt" },
  ];

  const columnsMedium = [
    { label: "Name", accessor: "name" },
    { label: "Reference", accessor: "reference" },
    { label: "Date Created", accessor: "createdAt" },
  ];

  const columnsSubject = [
    { label: "Name", accessor: "name", filterable: true },
    { label: "Board", accessor: "syllabus", filterable: true },
    { label: "Medium", accessor: "medium", filterable: true },
    { label: "Class", accessor: "standard", filterable: false },
    { label: "Chapters", accessor: "noOfChapter", filterable: false },
    
];

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}subject/getAllSubjects`);
      setSubjects(res.data.subjects);

      const res2 = await axios.get(`${BASE_URL}syllabus/getAll`);
      setSyllabus(res2.data.syllabus);
      const transformedSyllabus = res2.data.syllabus.map((syllabus) => ({
        value: syllabus.name,
        label: syllabus.name,
        id: syllabus._id,
      }));

      setDropSyllabus(transformedSyllabus);

      const res3 = await axios.get(`${BASE_URL}medium/getAll`);
      setMedium(res3.data.mediums);
      const transformedMediums = res3.data.mediums.map((medium) => ({
        value: medium.name,
        label: medium.name,
        id: medium._id,
      }));

      setDropMedium(transformedMediums);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSyllabus = async (e) => {
    e.preventDefault();

    const reqBody = {
      name: formSyllabus,
      reference: formRef
    };

    try {
      await axios.post(`${BASE_URL}syllabus/add`, reqBody);
      alert('Syllabus Added Successfully !!!');
      setShowSyllabus(false);
      setFormSyllabus(""); setFormRef("");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMedium = async (e) => {
    e.preventDefault();

    const reqBody = {
      name: formMedium,
      reference: formRef
    };

    try {
      await axios.post(`${BASE_URL}medium/add`, reqBody);
      alert('Medium Added Successfully !!!');
      setShowMedium(false);
      setFormMedium(""); setFormRef("");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();

    if (!selectedMedium || !selectedSyllabus || !standard  || subjectName === "") {
      alert('Please fill all the details');
      return;
    } else {
      const reqBody = {
        "standard": standard.value,
        "medium": selectedMedium.value,
        "syllabus": selectedSyllabus.value,
        "name": subjectName
      };

      try {
        await axios.post(`${BASE_URL}subject/addSubject`, reqBody);
        alert('Subject added successfully');
        setShowSubject(false);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                Board
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
                    className='bg-orange-600 px-4 py-4 rounded-lg text-white font-semibold text-sm'>Add Board</button>

                  <Table data={syllabus} columns={columnsSyllabus} label={"SYLLABUS"} setEditSyllabus={setEditSyllabus} />
                </div>

                {/* Medium */}

                <div className={openTab === 2 ? "block" : "hidden"} id="link2">

                  <button
                    onClick={() => setShowMedium(true)}
                    className='bg-orange-600 px-4 py-4 rounded-lg text-white font-semibold text-sm'>Add Medium</button>

                  <Table data={medium} columns={columnsMedium} label={"MEDIUM"} />
                </div>

                {/* Subject */}
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">

                  <button
                    onClick={() => setShowSubject(true)}
                    className='bg-orange-600 px-4 py-4 rounded-lg text-white font-semibold text-sm'>Add Subject</button>

                  <Table data={subjects} columns={columnsSubject} label={"SUBJECT"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Syllabus */}
      {showSyllabus && (
        <div className='flex justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <form onSubmit={handleAddSyllabus}>

              <label htmlFor="name">Board Name :</label><br />
              <input type="text" id='name' placeholder='Board Name' value={formSyllabus} onChange={(e) => setFormSyllabus(e.target.value)}
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md' />

              <label htmlFor="ref">Reference :</label><br />
              <input type="text" id='ref' placeholder='Reference' value={formRef} onChange={(e) => setFormRef(e.target.value)}
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md' />

              <div className='flex justify-between items-center mt-4'>
                <button
                  onClick={() => setShowSyllabus(false)}
                  className='bg-gray-500 px-4 py-2 rounded-lg text-white font-semibold text-sm'>Cancel</button>

                <button type='submit' className='bg-orange-600 px-4 py-2 rounded-lg text-white font-semibold text-sm'>Add Board</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editSyllabus && (
        <div className='flex justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <form onSubmit={handleAddSyllabus}>

              <label htmlFor="name">Board Name :</label><br />
              <input type="text" id='name' placeholder='Board Name' value={formSyllabus} onChange={(e) => setFormSyllabus(e.target.value)}
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md' />

              <label htmlFor="ref">Reference :</label><br />
              <input type="text" id='ref' placeholder='Reference' value={formRef} onChange={(e) => setFormRef(e.target.value)}
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md' />

              <div className='flex justify-between items-center mt-4'>
                <button
                  onClick={() => setShowSyllabus(false)}
                  className='bg-gray-500 px-4 py-2 rounded-lg text-white font-semibold text-sm'>Cancel</button>

                <button type='submit' className='bg-orange-600 px-4 py-2 rounded-lg text-white font-semibold text-sm'>Add Board</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Medium */}
      {showMedium && (
        <div className='flex justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <form onSubmit={handleAddMedium}>

              <label htmlFor="name">Medium Name :</label><br />
              <input type="text" id='name' placeholder='Medium Name' value={formMedium} onChange={(e) => setFormMedium(e.target.value)}
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md' />

              <label htmlFor="ref">Reference :</label><br />
              <input type="text" id='ref' placeholder='Reference' value={formRef} onChange={(e) => setFormRef(e.target.value)}
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md' />

              <div className='flex justify-between items-center mt-4'>
                <button
                  onClick={() => setShowMedium(false)}
                  className='bg-gray-500 px-4 py-2 rounded-lg text-white font-semibold text-sm'>Cancel</button>

                <button type='submit' className='bg-orange-600 px-4 py-2 rounded-lg text-white font-semibold text-sm'>Add Medium</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {editMedium && (
        <div className='flex justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <form onSubmit={handleAddSyllabus}>

              <label htmlFor="name">Board Name :</label><br />
              <input type="text" id='name' placeholder='Board Name' value={formMedium} onChange={(e) => setFormMedium(e.target.value)}
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md' />

              <label htmlFor="ref">Reference :</label><br />
              <input type="text" id='ref' placeholder='Reference' value={formRef} onChange={(e) => setFormRef(e.target.value)}
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md' />

              <div className='flex justify-between items-center mt-4'>
                <button
                  onClick={() => setShowMedium(false)}
                  className='bg-gray-500 px-4 py-2 rounded-lg text-white font-semibold text-sm'>Cancel</button>

                <button type='submit' className='bg-orange-600 px-4 py-2 rounded-lg text-white font-semibold text-sm'>Add Board</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Subject */}
      {showSubject && (
        <div className='flex justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <form onSubmit={handleAddSubject}>
              <label htmlFor="name">Subject Name :</label><br />
              <input type="text" id='name' placeholder='Subject Name' value={subjectName} onChange={(e) => setSubjectName(e.target.value)}
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md' />

              <label htmlFor="standard">Class :</label>
              
              <input type="number" id='name' placeholder='Class' value={subjectName} onChange={(e) => setSubjectName(e.target.value)}
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md' />
              <label className='mt-2'>Medium :</label>
              <SearchableDropdown
                options={dropMedium}
                onSelect={setSelectedMedium}
                selectedOption={selectedMedium}
                isClearable
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md'
              />

              <label className='mt-2'>Syllabus :</label>
              <SearchableDropdown
                options={dropSyllabus}
                onSelect={setSelectedSyllabus}
                selectedOption={selectedSyllabus}
                isClearable
                className='mt-2 w-full bg-gray-100 px-4 py-2 rounded-md'
              />

              <div className='flex justify-between items-center mt-4'>
                <button
                  onClick={() => setShowSubject(false)}
                  className='bg-gray-500 px-4 py-2 rounded-lg text-white font-semibold text-sm'>Cancel</button>

                <button type='submit' className='bg-orange-600 px-4 py-2 rounded-lg text-white font-semibold text-sm'>Add Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default MasterTable;
