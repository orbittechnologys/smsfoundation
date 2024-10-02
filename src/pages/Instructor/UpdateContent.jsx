import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { MdClose, MdOutlineVideoLibrary } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../constants";
import uploadToAzureStorage from "../../Hooks/uploadToAzureStorage";
import SearchableDropdown from "../SearchableDropdown";
import { MdOutlineAudioFile } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const UpdateContent = () => {
  const [fileName, setFileName] = useState("");
  const [audioFileName, setAudioFileName] = useState("");

  const [standard, setStandard] = useState(null);
  const [medium, setMedium] = useState(null);
  const [syllabus, setSyllabus] = useState(null);
  const [subjects, setSubjects] = useState(null);

  const [selectedSubject, setSelectedSubject] = useState(null);

  const [chapters, setChapters] = useState(null);

  const [chapterName, setChapterName] = useState(null);
  const [chapterDesc, setChapterDesc] = useState(null);

  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

  const [uploadedAudioUrl, setUploadedAudioUrl] = useState(null);
  const [videoUrls, setVideoUrls] = useState([]);
  const [dropMedium, setDropMedium] = useState([]);
  const [dropSyllabus, setDropSyllabus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [audioUplpoadPercentage, setAudioUplpoadPercentage] = useState(0);
  const [videoUploadPercentage, setVideoUploadPercentage] = useState(0);

  const [showModel, setShowModel] = useState(false);
  const [chapterToDelete, setChapterToDelete] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      setIsLoading(true);
      const blobName = file?.name;
      try {
        const url = await uploadToAzureStorage(
          file,
          blobName,
          setFileUploadPercentage
        );
        console.log(url);
        setUploadedFileUrl(url);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    setFileUploadPercentage(0);
    setIsLoading(false);
  };
  const handleFileChangeAudio = async (event) => {
    const file = event.target.files[0];
    const audioTypeRegex = /^audio\//;
    if (file && audioTypeRegex.test(file.type)) {
      setAudioFileName(file.name);
      const blobName = file?.name;
      setIsLoading(true);
      try {
        const url = await uploadToAzureStorage(
          file,
          blobName,
          setAudioUplpoadPercentage
        );
        console.log(url);
        setUploadedAudioUrl(url);
      } catch (error) {
        console.error("Error uploading audio file:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      alert("Please upload an audio file.");
    }
  };
  const handleRemoveAudioFile = async () => {
    setAudioFileName("");
    setAudioUplpoadPercentage(0);
    setIsLoading(false);
    setUploadedAudioUrl("");
  };

  const handleVideoFileChange = async (event) => {
    const files = event.target.files;
    const validVideos = Array.from(files).filter(
      (file) => file.type === "video/mp4"
    );

    if (validVideos.length === 0) {
      alert("Please upload valid MP4 video files.");
      return;
    }

    setIsLoading(true);

    const newVideoUrls = [];
    for (let file of validVideos) {
      const blobName = file.name;
      try {
        const url = await uploadToAzureStorage(
          file,
          blobName,
          setVideoUploadPercentage
        );
        newVideoUrls.push(url);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }

    // Append the new URLs to the existing video URLs in state
    setVideoUrls((prevUrls) => [...prevUrls, ...newVideoUrls]);
    setIsLoading(false);
  };

  const handleRemoveVideo = (url) => {
    setVideoUrls((prevUrls) => prevUrls.filter((videoUrl) => videoUrl !== url));
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
      syllabus: syllabus.value,
      medium: medium.value,
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

  const handleDeleteChapter = (index) => {
    setChapterToDelete(index);
    setShowModel(true);
  };

  const confirmDelete = async () => {
    if (chapterToDelete != null) {
      const chapterId = chapters[chapterToDelete]._id;
      try {
        await axios.delete(`${BASE_URL}chapter/delete/${chapterId}`);
        setShowModel(false);
        alert("Chapter deleted successfully");
        window.location.reload();
      } catch (error) {
        console.log("error deleting chapter", error);
        alert("Error deleting chapter");
      }
    }
  };
  // const handleDeleteChapter = (indexToDelete) => {
  //   setChapters((prevChapters) => prevChapters.filter((_, index) => index !== indexToDelete));
  // };

  useEffect(() => {
    if (selectedSubject) {
      console.log("selectedSubject", selectedSubject);
      fetchChapters(selectedSubject);
    }
  }, [selectedSubject]);

  const handleUpload = async () => {
    try {
      if (chapterName && chapterDesc && uploadedFileUrl && selectedSubject) {
        const reqBody = {
          chapterUrl: uploadedFileUrl,
          audioUrl: uploadedAudioUrl,
          videoUrl: videoUrls,
          subjectId: selectedSubject,
          name: chapterName,
          desc: chapterDesc,
        };
        console.log("addchapter" + reqBody);
        const res = await axios.post(`${BASE_URL}chapter/addChapter`, reqBody);
        console.log(res.data);
        alert("Chapter Added successfully");
        setUploadedAudioUrl(null);
        setUploadedFileUrl(null);
        setVideoUrls(null);
        setSelectedSubject(null);
        setChapterDesc(null);
        setChapterName(null);
        setFileName(null);

        fetchChapters(selectedSubject);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please ensure all the fields are present");
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-5 lg:mt-5 mt-10">
        <div className="border shadow-md p-5 rounded-xl grid gap-5">
          <div>
            <label
              htmlFor="standard"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Class
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
        </div>
      </div>

      {selectedSubject && (
        <div className="my-5 border-t border-b">
          <h1 className="text-xl font-semibold ">Add a new Chapter</h1>
          <div className="mt-5 lg:grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 shadow-lg p-5 border rounded-xl">
            <div>
              <label
                htmlFor="desc"
                className="block mb-2 text-sm font-semibold text-gray-900 "
              >
                Chapter Name
              </label>
              <input
                type="text"
                id="desc"
                onChange={(e) => setChapterName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter Chapter name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="desc"
                className="block mb-2 text-sm font-semibold text-gray-900 "
              >
                Chapter Description
              </label>
              <input
                type="text"
                id="desc"
                onChange={(e) => setChapterDesc(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter Description"
                required
              />
            </div>
            <div className="flex-row justify-center items-center w-80 p-4 shadow-md rounded-lg">
              <div className="">
                <label
                  htmlFor="cont"
                  className="block mb-2 text-sm font-semibold text-gray-900"
                >
                  Upload Content
                </label>
                <input
                  type="file"
                  id="cont"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                  placeholder="Upload Content"
                  required
                />

                {isLoading && (
                  <p className="text-sm font-medium text-gray-700 mt-2">
                    Uploading: {fileUploadPercentage}%
                  </p>
                )}

                {/* Progress Bar */}
                {isLoading && (
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
                    <div
                      className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${fileUploadPercentage}%` }}
                    >
                      {fileUploadPercentage}%
                    </div>
                  </div>
                )}

                {/* Uploaded File Display with Remove Option */}
                {fileName && (
                  <div className="flex items-center justify-between mt-4 bg-gray-100 p-2 rounded-lg">
                    <div className="flex items-center">
                      <FaFilePdf className="text-red-500 text-2xl mr-2" />
                      <span className="text-sm">{fileName}</span>
                    </div>
                    <button onClick={handleRemoveFile} className="text-red-500">
                      <MdClose className="text-2xl" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* audio file */}
            <div className="flex-row justify-center items-center w-80 p-4 shadow-md rounded-lg">
              <div className="">
                <div>
                  <label
                    htmlFor="cont"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Upload Audio File
                  </label>
                  <input
                    type="file"
                    id="cont"
                    accept="audio/*"
                    onChange={handleFileChangeAudio}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Upload Content"
                    // required
                  />

                  {/* Show upload progress when loading */}
                  {isLoading && (
                    <>
                      <p className="text-sm font-medium text-gray-700 mt-2">
                        Uploading: {audioUplpoadPercentage}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
                        <div
                          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300 ease-in-out"
                          style={{ width: `${audioUplpoadPercentage}%` }}
                        >
                          {audioUplpoadPercentage}%
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Display uploaded audio file with remove option */}
              {audioFileName && (
                <div className="flex items-center justify-between mt-4 bg-gray-100 p-2 rounded-lg">
                  <div className="flex items-center">
                    <MdOutlineAudioFile className="text-red-500 text-2xl mr-2" />
                    <span>{audioFileName}</span>
                  </div>
                  <button
                    onClick={handleRemoveAudioFile}
                    className="text-red-500"
                  >
                    <MdClose className="text-2xl" />
                  </button>
                </div>
              )}
            </div>

            {/* video file */}
            <div className="flex-row justify-center items-center w-80 p-4 shadow-md rounded-lg">
              <div className="">
                <div>
                  <label
                    htmlFor="videoUpload"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Upload Video
                  </label>
                  <input
                    type="file"
                    id="videoUpload"
                    multiple
                    accept="video/mp4"
                    onChange={handleVideoFileChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Upload Video"
                    // required
                  />

                  {isLoading && (
                    <>
                      <p className="text-sm font-medium text-gray-700 mt-2">
                        Uploading: {videoUploadPercentage}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
                        <div
                          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300 ease-in-out"
                          style={{ width: `${videoUploadPercentage}%` }}
                        >
                          {videoUploadPercentage}%
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Display Uploaded Videos */}
              {videoUrls.length > 0 && (
                <div className="grid mt-4">
                  {videoUrls.map((videoUrl, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between mt-2 bg-gray-100 p-2 rounded-lg"
                    >
                      <div className="flex items-center">
                        <MdOutlineVideoLibrary className="text-blue-500 text-2xl mr-2" />
                        <span>Video {index + 1}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveVideo(videoUrl)}
                        className="text-red-500"
                      >
                        <MdClose className="text-2xl" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
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

      <div className="my-5 mx-auto bg-white shadow-md p-8 rounded-md border max-w-4xl">
        {Array.isArray(chapters) && chapters.length > 0 && (
          <>
            <h1 className="text-2xl text-center font-semibold mb-6 border-b pb-4">
              Chapters found: {chapters?.length}
            </h1>

            {chapters.map((chapter, index) => (
              <div
                key={chapter._id}
                className="relative p-5 border-b mb-4 bg-gray-50 rounded-lg"
              >
                <div className="lg:flex lg:justify-between lg:items-center mb-4">
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {chapter?.name}
                    </h2>
                    <p className="text-gray-600">{chapter?.desc}</p>
                  </div>

                  <div className="mt-4 lg:mt-0 flex justify-start lg:justify-end space-x-4">
                    {chapter?.chapterUrl && (
                      <a
                        href={chapter?.chapterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-orange-300 px-4 py-2 rounded-full text-orange-500 hover:bg-orange-300 hover:text-white transition duration-300"
                      >
                        View PDF
                      </a>
                    )}
                    {chapter?.audioUrl && (
                      <a
                        href={chapter?.audioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-orange-300 px-4 py-2 rounded-full text-orange-500 hover:bg-orange-300 hover:text-white transition duration-300"
                      >
                        View Audio
                      </a>
                    )}
                    {chapter?.videoUrl && (
                      <a
                        href={chapter?.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-orange-300 px-4 py-2 rounded-full text-orange-500 hover:bg-orange-300 hover:text-white transition duration-300"
                      >
                        View Video
                      </a>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-3 right-4 flex items-center space-x-3">
                  <button
                    onClick={() => handleDeleteChapter(index)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                  <Link
                    to={`/admin/updateChapter/${chapter._id}`}
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    <FaRegEdit className="text-2xl" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Confirmation Modal */}
            {showModel && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                  <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                  <p className="mb-6">
                    All chapter-related tests, questions, videos, PDFs, and
                    audio files will be permanently deleted.
                  </p>
                  <div className="flex justify-end space-x-4 ">
                    <button
                      onClick={() => setShowModel(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UpdateContent;
