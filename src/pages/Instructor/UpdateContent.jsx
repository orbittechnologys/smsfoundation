import React, { useEffect, useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";
import { MdClose, MdOutlineVideoLibrary } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../constants";
import uploadToAzureStorage from "../../Hooks/uploadToAzureStorage";
import SearchableDropdown from "../SearchableDropdown";
import { LuLoader2 } from "react-icons/lu";
import { MdOutlineAudioFile } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const UpdateContent = () => {
  const [fileName, setFileName] = useState("");
  const [audioFileName, setAudioFileName] = useState("");
  const [videoFileName, setVideoFileName] = useState("");

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
  const [vidoeUrl, setVideoUrl] = useState(null);
  const [videoUrls, setVideoUrls] = useState([]);
  const [dropMedium, setDropMedium] = useState([]);
  const [dropSyllabus, setDropSyllabus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [audioUplpoadPercentage, setAudioUplpoadPercentage] = useState(0);
  const [videoUploadPercentage, setVideoUploadPercentage] = useState(0);

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
  const handleDeleteChapter = (indexToDelete) => {
    setChapters((prevChapters) => prevChapters.filter((_, index) => index !== indexToDelete));
  };

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
                    required
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
                    required
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

      {Array.isArray(chapters) && chapters.length > 0 && (
    <div className="my-5 mx-auto bg-white shadow-md p-8 rounded-md border">
      <h1 className="lg:text-2xl md:text-2xl sm:text-xl lg:text-left text-center my-5 font-semibold lg:py-5 py-5 border-b ">
        Chapters found: {chapters?.length}
      </h1>
      {chapters.map((chapter, index) => (
        <div key={index} className="my-4 relative">
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
              className="border mx-3 border-orange-300 px-3 py-1 rounded-full text-gray-500 hover:bg-orange-300 hover:text-white lg:text-lg text-xs flex justify-center items-center whitespace-nowrap"
            >
              View PDF
            </a>
            {chapter?.audioUrl && (
              <a
                href={chapter?.audioUrl}
                target="_blank"
                className="border mx-3 border-orange-300 px-3 py-1 rounded-full text-gray-500 hover:bg-orange-300 hover:text-white lg:text-lg text-xs whitespace-nowrap flex justify-center items-center"
              >
                View Audio
              </a>
            )}
            {chapter?.videoUrl && (
              <a
                href={chapter?.videoUrl}
                target="_blank"
                className="border mx-3 border-orange-300 px-3 py-1 rounded-full text-gray-500 hover:bg-orange-300 hover:text-white lg:text-lg text-xs whitespace-nowrap flex justify-center items-center"
              >
                View Video
              </a>
            )}
          </div>

          {/* Delete Chapter Button */}
          <button
            onClick={() => handleDeleteChapter(index)}
            className="absolute top-0 right-0 text-red-500 hover:text-red-700"
          >
            <MdDelete className="text-xl" />
          </button>
        </div>
      ))}
    </div>
  )}
    </>
  );
};

export default UpdateContent;
