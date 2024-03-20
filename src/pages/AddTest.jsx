import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaCircleCheck } from "react-icons/fa6";
import { AiFillMinusCircle } from "react-icons/ai";
import axios from "axios";
// import BASE_URL from "../constants";
import parse from "html-react-parser";
import { toast } from "react-toastify";
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

  const addQuestionApi = async (reqBody) => {
    console.log(reqBody);
    try {
      const response = await axios.post(
        `${BASE_URL}/question/addQuestion`,
        reqBody
      );
      console.log(response.data);
      alert("Question Added");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!category || !tags || !marks) {
      toast.error("Please fill in all the required fields");
      return;
    }
    try {
      const reqBody = {
        category: category,
        tags: tags,
        marks: marks,
        negativeMarking: negativeMark,
        question: questionName,
        options: finalOptions,
        correctAnswer: finalOptions.findIndex((option) => option.isCorrect),
      };
      console.log(reqBody);
      await addQuestionApi(reqBody);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBoxChange = (e) => {
    setBoxChecked(e.target.checked);
  };

  return (
    <form className="w-full mx-12" onSubmit={handleAddQuestion}>
      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 text-blue-800">
        Add Questions
      </h3>
      <div className="flex w-3/4 justify-center items-center">
        <div className="w-full">
          <p className="mb-1 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-semibold">
            Category
          </p>
          <input
            type="text"
            placeholder=""
            className="w-4/5 h-10 px-2 rounded-xl bg-white border-2 border-gray-400"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <p className="mb-1 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-semibold">
            Tags
          </p>
          <input
            type="text"
            placeholder=""
            className="w-4/5 h-10 px-2  rounded-xl bg-white border-2 border-gray-400"
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />
        </div>
      </div>
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
        <div className="w-full">
          <p className="mb-1 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-semibold flex items-center">
            <input
              value="test"
              type="checkbox"
              checked={boxChecked}
              onChange={handleBoxChange}
              id="box"
            />{" "}
            <AiFillMinusCircle className="text-red-700" />
            Negative marking
          </p>
          {boxChecked && (
            <input
              type="text"
              placeholder=""
              className="w-4/5 px-2  h-10 rounded-xl bg-white border-2 border-gray-400"
              onChange={(e) => {
                setNegativeMark(e.target.value);
              }}
            />
          )}
        </div>
      </div>
      <div className="flex items-center mt-5">
        <p className="mb-1 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-semibold flex items-center">
          Number of options:
        </p>
        <select
          value={numOptions}
          onChange={handleNumOptionsChange}
          className="h-8 px-2 rounded-md border border-gray-300 focus:outline-none ml-6"
        >
          {[4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-8 w-full my-5 ">
        <label className="mr-2 font-semibold text-xl" htmlFor="question1">
          Question 1:
        </label>
        <div className="flex ml-11">
          <ReactQuill
            theme="snow"
            id="question1"
            value={questionName}
            onChange={setQuestionName}
            modules={modules}
            formats={formats}
            className=" mb-10 w-5/6"
          />
        </div>

        {options.slice(0, numOptions).map((option, index) => (
          <div className="flex" key={index}>
            <div>
              <label className="text-xl" htmlFor={`option${index}`}>
                {String.fromCharCode(65 + index)}.
              </label>
              <input
                type="radio"
                id={`option${index}`}
                name="option"
                value={index}
                checked={selectedOption === index}
                onClick={() => handleRadioClick(index)}
              />
            </div>
            <ReactQuill
              theme="snow"
              value={option.option}
              onChange={(value) => handleOptionChange(index, value)}
              modules={modules}
              formats={formats}
              className="ml-4 mb-10 w-5/6"
            />
          </div>
        ))}
      </div>

      <div className="mt-10">
        {selectedOption && (
          <button
            type="submit"
            // disabled={submitDisabled}
            className="my-3 text-blue-800 hover:text-white border border-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default AddQuestions;
