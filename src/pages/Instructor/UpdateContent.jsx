import React, { useEffect, useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../constants";
import uploadToAzureStorage from "../../Hooks/uploadToAzureStorage";

const UpdateContent = () => {
  const [fileName, setFileName] = useState("");
  const [audioFileName, setAudioFileName] = useState("");

  const [standard, setStandard] = useState(null);
  const [medium, setMedium] = useState(null);
  const [syllabus, setSyllabus] = useState(null);
  const [subjects, setSubjects] = useState(null);

  const [selectedSubject, setSelectedSubject] = useState(null);

  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

  const [chapters, setChapters] = useState(null);

  const [chapterName, setChapterName] = useState(null);
  const [chapterDesc, setChapterDesc] = useState(null);

  const [vidoeUrl, setVideoUrl] = useState(null);

  const [uploadedAudioUrl, setUploadedAudioUrl] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      const blobName = file?.name;
      const url = await uploadToAzureStorage(file, blobName);
      console.log(url);
      setUploadedFileUrl(url);
    } else {
      // Handle invalid file type
      alert("Please upload a PDF file.");
    }
  };

  const handleFileChangeAudio = async (event) => {
    const file = event.target.files[0];
    const audioTypeRegex = /^audio\//;
    if (file && audioTypeRegex.test(file.type)) {
      setAudioFileName(file.name);
      const blobName = file?.name;
      const url = await uploadToAzureStorage(file, blobName);
      console.log(url);
      setUploadedAudioUrl(url);
    } else {
      // Handle invalid file type
      alert("Please upload a PDF file.");
    }
  };

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

  const handleUpload = async () => {
    try {
      if (chapterName && chapterDesc && uploadedFileUrl && selectedSubject) {
        const reqBody = {
          chapterUrl: uploadedFileUrl,
          audioUrl: uploadedAudioUrl,
          videoUrl: vidoeUrl,
          subjectId: selectedSubject,
          name: chapterName,
          desc: chapterDesc,
        };
        console.log(reqBody);
        const res = await axios.post(`${BASE_URL}chapter/addChapter`, reqBody);
        console.log(res.data);
        alert("Chapter Added successfully");
        fetchChapters(selectedSubject);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please ensure all the fields are present");
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-5 lg:mt-5 mt-10">
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
                  return (
                    <option key={index} value={subject?._id}>
                      {subject?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      </div>

      {Array.isArray(chapters) && chapters.length > 0 && (
        <div className="my-5 mx-auto bg-white shadow-md p-8 rounded-md">
          <h1 className="lg:text-2xl md:text-2xl sm:text-xl lg:text-left text-center my-5 font-semibold lg:py-5 py-5 border-b ">
            Chapters found: {chapters?.length}
          </h1>
          {chapters.map((chapter, index) => (
            <div key={index} className="my-4">
              <h1 className="lg:text-xl md:text-lg sm:text-base font-semibold mb-2">
                {chapter?.name}
              </h1>
              <p className="text-gray-600 mb-2 lg:text-lg md:text-base sm:text-xs">
                {chapter?.desc}
              </p>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-fit gap-3">
                <a
                  href={chapter?.chapterUrl}
                  target="_blank"
                  className="border mx-3 border-orange-300 px-3 py-1 rounded-full  text-gray-500 hover:bg-orange-300 hover:text-white lg:text-lg text-xs flex justify-center items-center whitespace-nowrap"
                >
                  View PDF
                </a>
                {chapter?.audioUrl ? (
                  <a
                    href={chapter?.audioUrl}
                    target="_blank"
                    className="border mx-3 border-orange-300 px-3 py-1 rounded-full  text-gray-500 hover:bg-orange-300 hover:text-white lg:text-lg text-xs whitespace-nowrap flex justify-center items-center"
                  >
                    View Audio
                  </a>
                ) : (
                  ``
                )}
                {chapter?.videoUrl ? (
                  <a
                    href={chapter?.videoUrl}
                    target="_blank"
                    className="border mx-3 border-orange-300 px-3 py-1 rounded-full  text-gray-500 hover:bg-orange-300 hover:text-white lg:text-lg text-xs whitespace-nowrap flex justify-center items-center"
                  >
                    View Video
                  </a>
                ) : (
                  ``
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSubject && (
        <div>
          <h1>Add a new Chapter</h1>
          <div className="mt-5 lg:grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 shadow-lg p-5 border rounded-xl">
            <div>
              <label
                htmlFor="desc"
                className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Chapter Name
              </label>
              <input
                type="text"
                id="desc"
                onChange={(e) => setChapterName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Chapter name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="desc"
                className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Chapter Description
              </label>
              <input
                type="text"
                id="desc"
                onChange={(e) => setChapterDesc(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Description"
                required
              />
            </div>
            <div className="flex justify-center items-center">
              <div>
                <label
                  htmlFor="cont"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Upload Content
                </label>
                <input
                  type="file"
                  id="cont"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Upload Content"
                  required
                />
              </div>
              {/* <button
                onClick={() => document.getElementById("cont").click()}
                className="mt-5 ml-5"
              >
                <FaSquarePlus className="text-xl" />
              </button> */}
            </div>
            <div className="flex justify-center items-center">
              <div>
                <label
                  htmlFor="cont"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Upload Audio File
                </label>
                <input
                  type="file"
                  id="cont"
                  accept="audio/*"
                  onChange={handleFileChangeAudio}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Upload Content"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="desc"
                className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Video URL
              </label>
              <input
                type="text"
                id="desc"
                onChange={(e) => setVideoUrl(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Description"
                required
              />
            </div>
            {fileName && (
              <div className="grid mt-2">
                <FaFilePdf className="text-red-500 text-2xl mr-2" />
                <span>{fileName}</span>
              </div>
            )}
          </div>
          <div className="flex justify-end items-center">
            <button
              type="button"
              className="mt-5 text-orange-500 font-semibold hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
              onClick={() => handleUpload()}
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateContent;
