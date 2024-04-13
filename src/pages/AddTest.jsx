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
import SearchableDropdown from "./SearchableDropdown";
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

  const emptyInputs = () => {
    setHint(null);
    setQuestionName(null);
    setOptionA(null);
    setOptionB(null);
    setOptionC(null);
    setOptionD(null);
    setAnswer(null);
  };

  const addQuestionApiCall = async (reqBody) => {
    try {
      const res = await axios.post(`${BASE_URL}question/addQuestion`, reqBody);
      console.log(res.data);
      alert("Question added successfully");
      emptyInputs();
      const res2 = await axios.get(`${BASE_URL}test/id/${reqBody.testId}`);
      console.log(res2.data);
      setTest(res2.data.test);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();

    if (
      optionA &&
      optionB &&
      optionC &&
      optionD &&
      answer &&
      test &&
      marks &&
      hint &&
      pageRef
    ) {
      const reqBody = {
        testId: test?._id,
        question: questionName,
        optionA,
        optionB,
        optionC,
        optionD,
        optionE,
        optionF,
        pageRef,
        hint,
        answer,
        marks,
      };
      console.log(reqBody);
      addQuestionApiCall(reqBody);
    } else {
      alert(
        "Please fill all the details. Before you proceed to add a question"
      );
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

  const [test, setTest] = useState(null);
  const [testName, setTestName] = useState(null);
  const [testDesc, setTestDesc] = useState(null);

  const [answer, setAnswer] = useState(null);
  const [optionA, setOptionA] = useState(null);
  const [optionB, setOptionB] = useState(null);
  const [optionC, setOptionC] = useState(null);
  const [optionD, setOptionD] = useState(null);
  const [optionE,setOptionE] = useState(null);
  const [optionF,setOptionF] = useState(null);

  const [noOfOptions,setNoOfOptions] = useState(4);

  const [pageRef,setPageRef] = useState(0);

  const [hint, setHint] = useState(null);

  const [dropMedium,setDropMedium] = useState([]);
  const [dropSyllabus,setDropSyllabus] = useState([]);

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
      syllabus:syllabus.value,
      medium:medium.value,
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

  const fetchTestForChapter = async (chapterId) => {
    console.log(chapterId);
    try {
      const res = await axios.get(
        `${BASE_URL}test/getTestsForChapter/${chapterId}`
      );
      console.log(res.data);
      setTest(res.data.test);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedChapter) {
      fetchTestForChapter(selectedChapter);
    }
  }, [selectedChapter]);

  const createTestApiCall = async (reqBody) => {
    try {
      const res = await axios.post(`${BASE_URL}test/addTest`, reqBody);
      console.log(res.data);
      alert("Test Created successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleCreateTest = (e) => {
    e.preventDefault();
    console.log(testName, testDesc, selectedChapter);
    createTestApiCall({
      chapterId: selectedChapter,
      testName: testName,
      desc: testDesc,
    });
  };

  const fetchData = async () => {
    try {
      const res2 = await axios.get(`${BASE_URL}syllabus/getAll`);
      
      const transformedSyllabus = res2.data.syllabus.map((syllabus) => ({
        // value: school._id,
        value: syllabus.name,
        label: syllabus.name, 
        id : syllabus._id,
      }));
      
      setDropSyllabus(transformedSyllabus);

      const res3 = await axios.get(`${BASE_URL}medium/getAll`);
      
      const transformedMediums = res3.data.mediums.map((medium) => ({
        // value: school._id,
        value: medium.name,
        label: medium.name, 
        id : medium._id,
      }));

      setDropMedium(transformedMediums);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    fetchData();
  },[])

  return (
    <>
      <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-5 mt-5">
        <div className="border shadow-md p-5 rounded-xl grid gap-5">
          <div>
            <label
              htmlFor="standard"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Standard
            </label>
            <input
              type="number"
              onChange={(e) => setStandard(e.target.value)}
              min={1}
              max={12}
              id="standard"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder=""
              required
            />
          </div>
          <div>
            <label
              htmlFor="medium"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Medium
            </label>
            <SearchableDropdown
              options={dropMedium}
              placeholder="Search Medium"
              onChange={setMedium}
            />
          </div>
        </div>
        <div className="border shadow-md p-5 rounded-xl grid gap-5">
          <div>
            <label
              htmlFor="syllabus"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Board
            </label>
            <SearchableDropdown
              options={dropSyllabus}
              placeholder="Search Board"
              onChange={setSyllabus}
            />
          </div>
          {subjects && (
            <div>
              <label
                htmlFor="syllabus"
                className="block mb-2 text-sm font-semibold text-gray-900 "
              >
                Subjects
              </label>
              <select
                id="syllabus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                }}
              >
                <option selected>Choose a Subject</option>
                {subjects?.map((subject, index) => {
                  return (
                    <option key={index} value={subject?._id}>
                      {subject?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {chapters && (
            <div>
              <label
                htmlFor="syllabus"
                className="block mb-2 text-sm font-semibold text-gray-900 "
              >
                Chapters
              </label>
              <select
                id="syllabus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onChange={(e) => {
                  setSelectedChapter(e.target.value);
                }}
              >
                <option selected>Choose a Chapter</option>
                {chapters?.map((chapter, index) => {
                  return (
                    <option key={index} value={chapter?._id}>
                      {chapter?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      </div>

      {selectedChapter ? (
        <div className="my-4 shadow-md p-8 rounded-xl lg:w-fit sm:w-full text-xl">
          <span className="text-center text-xl font-semibold">
            Test for the chapter
          </span>
          {test ? (
            <div className="mt-5 grid gap-2">
              <h1 className="text-xl font-semibold">{test?.name}</h1>
              <h1 className="text-xl font-semibold">{test?.desc}</h1>
              <h1>
                <span className="font-semibold text-xl">
                  No of Questions :{" "}
                </span>
                {test?.noOfQuestions}
              </h1>
              <h1>
                <span className="font-semibold text-xl">Total Marks:</span>{" "}
                {test?.totalMarks}
              </h1>
              <h1
                className="mt-5 text-center font-semibold text-xl shadow-xl border border-orange-500 py-2 rounded-full cursor-pointer"
                onClick={() => navigate("/admin/preview/" + test?._id)}
              >
                Preview
              </h1>
            </div>
          ) : (
            <div className="w-full">
              <h1 className="my-2">No tests found</h1>
              <form
                onSubmit={handleCreateTest}
                className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-5 my-5 "
              >
                <input
                  type="text"
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="Enter Test Name"
                  className="rounded-full"
                />
                <input
                  type="text"
                  onChange={(e) => setTestDesc(e.target.value)}
                  placeholder="Enter Test Description"
                  className="rounded-full"
                />
                <button className="text-white bg-orange-300 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                  Create Test
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        ``
      )}

      {test ? (
        <form className="w-full" onSubmit={handleAddQuestion}>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 text-orange-500 text-center bg-gray-100 py-5 rounded-3xl">
            Add Question
          </h3>

          <div className="flex lg:w-3/5 sm:w-full justify-center items-center mt-5">
            <div className="w-full">
              <p className="mb-1 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-semibold flex items-center">
                <FaCircleCheck className="text-lime-600" /> Marks
              </p>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-1/2"
                placeholder=""
                onChange={(e) => {
                  setMarks(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <label>No of Options</label>
            <select onChange={(e) => setNoOfOptions(e.target.value)}>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </div>

          <div className="grid gap-8 w-full  my-5 lg:mb-5 mb-10 ">
            <label className="font-semibold text-xl" htmlFor="question1">
              Question:
            </label>
            <div className="flex  justify-center ">
              <ReactQuill
                theme="snow"
                id="question1"
                value={questionName}
                onChange={(value) => setQuestionName(value)}
                modules={modules}
                formats={formats}
                className="mb-10 lg:w-5/6 sm:w-full"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3">
            <div className="flex lg:mb-0 mb-16">
              <div>
                <label className="text-xl">A.</label>
                <input
                  type="radio"
                  name="option"
                  onChange={(e) => setAnswer("A")}
                />
              </div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={optionA}
                onChange={(e) => setOptionA(e)}
                className="ml-4 mb-10 lg:w-5/6"
              />
            </div>
            <div className="flex lg:mb-0 mb-16">
              <div>
                <label className="text-xl">B.</label>
                <input
                  type="radio"
                  name="option"
                  onChange={(e) => setAnswer("B")}
                />
              </div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={optionB}
                onChange={(e) => setOptionB(e)}
                className="ml-4 mb-10 lg:w-5/6"
              />
            </div>
            <div className="flex lg:mb-0 mb-16">
              <div>
                <label className="text-xl">C.</label>
                <input
                  type="radio"
                  name="option"
                  onChange={(e) => setAnswer("C")}
                />
              </div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={optionC}
                onChange={(e) => setOptionC(e)}
                className="ml-4 mb-10 lg:w-5/6"
              />
            </div>
            <div className="flex lg:mb-0 mb-16">
              <div>
                <label className="text-xl">D.</label>
                <input
                  type="radio"
                  name="option"
                  onChange={(e) => setAnswer("D")}
                />
              </div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={optionD}
                onChange={(e) => setOptionD(e)}
                className="ml-4 mb-10 lg:w-5/6"
              />
            </div>

            {noOfOptions <=6 && noOfOptions>=5 && (
              <div className="flex lg:mb-0 mb-16">
              <div>
                <label className="text-xl">E.</label>
                <input
                  type="radio"
                  name="option"
                  onChange={(e) => setAnswer("E")}
                />
              </div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={optionE}
                onChange={(e) => setOptionE(e)}
                className="ml-4 mb-10 lg:w-5/6"
              />
            </div>
            )

            }
            
            {noOfOptions == 6 && (
              <div className="flex lg:mb-0 mb-16">
              <div>
                <label className="text-xl">F.</label>
                <input
                  type="radio"
                  name="option"
                  onChange={(e) => setAnswer("F")}
                />
              </div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={optionF}
                onChange={(e) => setOptionF(e)}
                className="ml-4 mb-10 lg:w-5/6"
              />
            </div>
            )

            } 

          </div>

          <div className="flex mx-10 my-5">
            <div>
              <label className="text-xl">Summary</label>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={hint}
                onChange={(e) => setHint(e)}
                className="ml-4 my-5 lg:w-5/6"
              />
            </div>

            <div>
              <label className="text-xl">Page Reference</label>
              <input
                type="number"
                placeholder="Enter Page Number "
                onChange={(e) => setPageRef(Number(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                required
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
      ) : (
        ``
      )}
    </>
  );
};

export default AddQuestions;
