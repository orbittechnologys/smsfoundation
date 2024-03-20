import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaCircleCheck } from "react-icons/fa6";
import { AiFillMinusCircle } from "react-icons/ai";
import axios from "axios";
// import BASE_URL from "../constants";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router";
//test comment
//test
const AddQuestions = () => {
  const [questionName, setQuestionName] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [marks, setMarks] = useState("");
  const [negativeMark, setNegativeMark] = useState(0);
  const [boxChecked, setBoxChecked] = useState(false);
  const [numOptions, setNumOptions] = useState(4);
  // const [submitDisabled, setSubmitDisabled] = useState(true);
  const [options, setOptions] = useState([
    { option: "", isCorrect: false },
    { option: "", isCorrect: false },
    { option: "", isCorrect: false },
    { option: "", isCorrect: false },
  ]);
  const [finalOptions, setFinalOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  //add upload image logic
  //add question api based on my backend json
  //test the data and get it on questions page

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
  ];

  const handleOptionChange = (index, value) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = { ...newOptions[index], option: value };
      console.log("new options array:", newOptions);

      return newOptions;
    });
  };
  const handleNumOptionsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumOptions(value);
    // If the user selects 4, reset to the default 4 options
    if (value === 4) {
      setOptions([
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
      ]);
    } else {
      // Otherwise, keep the existing options array
      setOptions((prevOptions) => {
        const newOptions = [...prevOptions];
        // If the selected range is greater than 4, add empty options to reach the selected range
        for (let i = prevOptions.length; i < value; i++) {
          newOptions.push({ option: "", isCorrect: false });
        }
        return newOptions;
      });
    }
  };

  const handleRadioClick = (index) => {
    setOptions((prevOptions) => {
      const updatedOptions = prevOptions.map((option, i) => ({
        ...option,
        isCorrect: i === index,
      }));
      console.log("Updated Options:", updatedOptions);
      setFinalOptions(updatedOptions);
      return updatedOptions;
    });
    setSelectedOption(index);
    // setSubmitDisabled(false);
  };

  const emptyInputs = ()=> {
    setHint(null);
    setQuestionName(null);
    setOptionA(null);setOptionB(null); setOptionC(null); setOptionD(null);
    setAnswer(null);
  }

  const addQuestionApiCall = async (reqBody) => {
    try {
      const res =await axios.post(`${BASE_URL}question/addQuestion`,reqBody);
      console.log(res.data);
      alert('Question added successfully');
      emptyInputs();
      const res2 = await axios.get(`${BASE_URL}test/id/${reqBody.testId}`);
      console.log(res2.data);
      setTest(res2.data.test);
      window.scrollTo(0,0);
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  }

  const handleAddQuestion = (e) => {
    e.preventDefault();

    if(optionA && optionB && optionC && optionD && answer && test && marks && hint){
        const reqBody = {
          "testId": test?._id,
          "question": questionName,
          optionA,
          optionB,
          optionC,
          optionD,
          hint,
          answer,
          marks,
      }
      console.log(reqBody);
      addQuestionApiCall(reqBody);
    }else{
      alert('Please fill all the details. Before you proceed to add a question')
    }
  };

  const handleBoxChange = (e) => {
    setBoxChecked(e.target.checked);
  };

  const [standard, setStandard] = useState(null);
  const [medium, setMedium] = useState(null);
  const [syllabus, setSyllabus] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [chapters, setChapters] = useState(null);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [test,setTest] = useState(null);
  const [testName,setTestName] = useState(null);
  const [testDesc,setTestDesc] = useState(null);

  const [answer,setAnswer] = useState(null);
  const [optionA,setOptionA] = useState(null);
  const [optionB,setOptionB] = useState(null);
  const [optionC,setOptionC] = useState(null);
  const [optionD,setOptionD] = useState(null);
  const [hint,setHint] = useState(null);
  
  const navigate = useNavigate();

  const fetchSubjectsApiCall = async (reqBody) => {
    try {
      const res = await axios.post(`${BASE_URL}subject/getSubjects`, reqBody);
      console.log(res.data);
      setSubjects(res.data.subjects);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubjects = () => {
    console.log(syllabus, medium, standard);
    fetchSubjectsApiCall({
      syllabus,
      medium,
      standard,
    });
  };

  useEffect(() => {
    if (standard && medium && syllabus) {
      getSubjects();
    }
  }, [standard, medium, syllabus]);

  const fetchChapters = async (subjectId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}chapter/getChapterBySubject/${subjectId}`
      );
      console.log(res.data);
      setChapters(res.data.chapters);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedSubject) {
      fetchChapters(selectedSubject);
    }
  }, [selectedSubject]);

  const fetchTestForChapter = async(chapterId) => {
    console.log(chapterId);
    try {
      const res = await axios.get(`${BASE_URL}test/getTestsForChapter/${chapterId}`);
      console.log(res.data);
      setTest(res.data.test);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    if(selectedChapter){
      fetchTestForChapter(selectedChapter)
    }
  },[selectedChapter])

  const createTestApiCall = async (reqBody) => {
    try {
      const res = await axios.post(`${BASE_URL}test/addTest`,reqBody);
      console.log(res.data);
      alert('Test Created successfully')
    } catch (error) {
      console.log(error);
      alert('Something went wrong')
    }
  }

  const handleCreateTest = (e)=> {
    e.preventDefault();
    console.log(testName,testDesc,selectedChapter);
    createTestApiCall({
      "chapterId": selectedChapter,
      "testName": testName,
      "desc": testDesc
    })
  }


  return (
    <>
      <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-5">
        <div className="border shadow-md p-5 rounded-xl grid gap-5">
          <div>
            <label
              htmlFor="standard"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Standard
            </label>
            <input
              type="number"
              onChange={(e) => setStandard(e.target.value)}
              min={1}
              max={12}
              id="standard"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div>
            <label
              htmlFor="medium"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Medium
            </label>
            <select
              id="medium"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setMedium(e.target.value)}
            >
              <option selected>Choose a medium</option>
              <option value="ENGLISH">English</option>
              <option value="KANNADA">Kannada</option>
              <option value="MALYALAM">Malyalam</option>
              <option value="TELUGU">Telugu</option>
            </select>
          </div>
        </div>
        <div className="border shadow-md p-5 rounded-xl grid gap-5">
          <div>
            <label
              htmlFor="syllabus"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Syllabus
            </label>
            <select
              id="syllabus"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setSyllabus(e.target.value);
              }}
            >
              <option selected>Choose a Syllabus</option>
              <option value="NCERT">NCERT</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
            </select>
          </div>
          {subjects && (
            <div>
              <label
                htmlFor="syllabus"
                className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Subjects
              </label>
              <select
                id="syllabus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                }}
              >
                <option selected>Choose a Subject</option>
                {subjects?.map((subject, index) => {
                  return <option value={subject?._id}>{subject?.name}</option>;
                })}
              </select>
            </div>
          )}

          {chapters && (
            <div>
              <label
                htmlFor="syllabus"
                className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Chapters
              </label>
              <select
                id="syllabus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setSelectedChapter(e.target.value);
                }}
              >
                <option selected>Choose a Chapter</option>
                {chapters?.map((chapter, index) => {
                  return <option value={chapter?._id}>{chapter?.name}</option>;
                })}
              </select>
            </div>
          )}
        </div>
      </div>

      {selectedChapter ? (
        <div className="my-4">
          Test for the chapter 

          {test ? (
            <div>
              <h1>{test?.name}</h1>
              <h1>{test?.desc}</h1>
              <h1>No of Questions :  {test?.noOfQuestions}</h1>
              <h1>Total Marks: {test?.totalMarks}</h1>
              <h1 onClick={()=> navigate('/admin/preview/'+test?._id)}>Preview</h1>
            </div>
          ):(
            <div>
              <h1>No tests found</h1>
              <form onSubmit={handleCreateTest}>

                  <input type="text" onChange={(e)=> setTestName(e.target.value)} placeholder="Enter Test Name"/>
                  <input type="text" onChange={(e)=> setTestDesc(e.target.value)} placeholder="Enter Test Description"/>
                  <button>Create Test</button>
              </form>
            </div>
          )}
        </div>
      ):``}

      {test ? (
        <form className="w-full mx-12" onSubmit={handleAddQuestion}>
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 text-blue-800">
          Add Question
        </h3>

        <div className="flex w-3/5 justify-center items-center mt-5">
          <div className="w-full">
            <p className="mb-1 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-semibold flex items-center">
              <FaCircleCheck className="text-lime-600" /> Marks
            </p>
            <input
              type="text"
              placeholder=""
              className="w-4/5 px-2  h-10 rounded-xl bg-white border-2 border-gray-400"
              onChange={(e) => {
                setMarks(e.target.value);
              }}
            />
          </div>

        </div>

        <div className="grid gap-8 w-full my-5 ">
          <label className="mr-2 font-semibold text-xl" htmlFor="question1">
            Question:
          </label>
          <div className="flex ml-11">
            <ReactQuill
              theme="snow"
              id="question1"
              value={questionName}
              onChange={(value)=>setQuestionName(value)}
              modules={modules}
              formats={formats}
              className=" mb-10 w-5/6"
            />
          </div>
          </div>

          <div className="grid grid-cols-2 gap-3">

          <div className="flex" >
              <div>
                <label className="text-xl" >
                  A.
                </label>
                <input
                  type="radio"
                  name="option"
                  onChange={(e)=> setAnswer('A')}
                />
              </div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={optionA}
                onChange={(e)=> setOptionA(e)}
                className="ml-4 mb-10 w-5/6"
              />
            </div>
            <div className="flex" >
              <div>
                <label className="text-xl" >
                  B.
                </label>
                <input
                  type="radio"
                  name="option"
                  onChange={(e)=> setAnswer('B')}
                />
              </div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={optionB}
                onChange={(e)=> setOptionB(e)}
                className="ml-4 mb-10 w-5/6"
              />
            </div>
            <div className="flex" >
              <div>
                <label className="text-xl" >
                  C.
                </label>
                <input
                  type="radio"
                  name="option"
                  
                  onChange={(e)=> setAnswer('C')}
                />
              </div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={optionC}
                onChange={(e)=> setOptionC(e)}
                className="ml-4 mb-10 w-5/6"
              />
            </div>
            <div className="flex" >
              <div>
                <label className="text-xl" >
                  D.
                </label>
                <input
                  type="radio"
                  name="option"
                  
                  onChange={(e)=> setAnswer('D')}
                />
              </div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={optionD}
                onChange={(e)=> setOptionD(e)}
                className="ml-4 mb-10 w-5/6"
              />
            </div>
          </div>

          <div className="flex" >
              <div>
                <label className="text-xl" >
                  Summary
                </label>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={hint}
                onChange={(e)=> setHint(e)}
                className="ml-4 mb-10 w-5/6"
              />
            </div>
          

          
        </div>

        <div className="mt-10">
          
            <button
              type="submit"
              // disabled={submitDisabled}
              className="my-3 text-blue-800 hover:text-white border border-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Submit
            </button>
          
        </div>
      </form>
      ):``
      }
      
    </>
  );
};

export default AddQuestions;
