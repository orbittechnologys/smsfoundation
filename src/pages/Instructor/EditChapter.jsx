import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { MdClose, MdOutlineVideoLibrary } from "react-icons/md";
import uploadToAzureStorage from "../../Hooks/uploadToAzureStorage";

const EditChapter = () => {
  const { chapterId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [chapterUrl, setChapterUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrls, setVideoUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [thumbnailUploadPercentage, setThumbnailUploadPercentage] = useState(0);
  const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState(null);

  const navigate = useNavigate();

  const fetchChapterDetails = async () => {
    try {
      const res = await axios.get(`${BASE_URL}chapter/id/${chapterId}`);
      console.log("data", res.data);
      const chapter = res.data;
      setName(chapter.name);
      setSubtitle(chapter.subtitle);
      setDescription(chapter.desc);
      setChapterUrl(chapter.chapterUrl);
      setAudioUrl(chapter.audioUrl);
      setVideoUrls(chapter.videoUrl || []);
      setThumbnail(chapter.thumbnail)
    } catch (error) {
      console.error("Error fetching chapter details:", error);
    }
  };

  const updateChapter = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}chapter/update`, {
        chapterId,
        name,
        subtitle,
        desc: description,
        chapterUrl,
        audioUrl,
        videoUrl: videoUrls,
        thumbnail: uploadedThumbnailUrl,
      });
      console.log("Chapter updated successfully", res.data);
      alert("Chapter updated successfully");
      navigate("/admin/UpdateContent");
    } catch (error) {
      console.error("Error updating chapter:", error);
    }
  };

  // Handle PDF upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setIsLoading(true);
      try {
        const url = await uploadToAzureStorage(
          file,
          file.name,
          setFileUploadPercentage
        );
        setChapterUrl(url);
      } catch (error) {
        console.error("Error uploading PDF:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please upload a PDF file.");
    }
  };

  // Handle Audio upload
  const handleFileChangeAudio = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setIsLoading(true);
      try {
        const url = await uploadToAzureStorage(
          file,
          file.name,
          setFileUploadPercentage
        );
        setAudioUrl(url);
      } catch (error) {
        console.error("Error uploading audio:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please upload an audio file.");
    }
  };

  const handleFileChangeThumbnail = async (event) => {
    const file = event.target.files[0];
    const imageTypeRegex = /^image\/(jpeg|png|jpg)$/;
    if (file && imageTypeRegex.test(file.type)) {
      setThumbnail(file.name);
      const blobName = file.name;
      setIsLoading(true);
      try {
        const url = await uploadToAzureStorage(
          file,
          blobName,
          setThumbnailUploadPercentage
        );
        console.log(url);
        setUploadedThumbnailUrl(url);
      } catch (error) {
        console.error("Error uploading thumbnail:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      alert("Please upload an image file.");
    }
  };

  // Handle Video upload
  const handleVideoFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const validVideos = files.filter((file) => file.type === "video/mp4");

    if (validVideos.length === 0) {
      alert("Please upload valid MP4 video files.");
      return;
    }

    setIsLoading(true);

    const newVideoUrls = [];
    for (let file of validVideos) {
      try {
        const url = await uploadToAzureStorage(
          file,
          file.name,
          setFileUploadPercentage
        );
        newVideoUrls.push(url);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }

    setVideoUrls((prevUrls) => [...prevUrls, ...newVideoUrls]);
    setIsLoading(false);
  };

  // Remove video
  const handleRemoveVideo = (url) => {
    setVideoUrls((prevUrls) => prevUrls.filter((videoUrl) => videoUrl !== url));
  };

  useEffect(() => {
    fetchChapterDetails();
  }, [chapterId]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Chapter</h2>
      <form onSubmit={updateChapter} className="space-y-6">
        <div className="flex flex-col">
          <label
            htmlFor="chapterName"
            className="mb-2 text-sm font-semibold text-gray-900"
          >
            Chapter Name
          </label>
          <input
            type="text"
            id="chapterName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter chapter name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="chapterDescription"
            className="mb-2 text-sm font-semibold text-gray-900"
          >
            Description
          </label>
          <textarea
            id="chapterDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter chapter description"
            rows="4"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="subtitle"
            className="mb-2 text-sm font-semibold text-gray-900"
          >
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter subtitle"
            required
          />
        </div>
        <div className="flex-row justify-center items-center w-full p-4 shadow-md rounded-lg">
          <div>
            <label
              htmlFor="pdfUpload"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Upload PDF
            </label>
            <input
              type="file"
              id="pdfUpload"
              accept="application/pdf"
              onChange={handleFileChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {chapterUrl ? (
            <div className="flex items-center justify-between mt-2 bg-gray-100 p-2 rounded-lg">
              <span className="text-sm">
                <a
                  href={chapterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline ml-1"
                >
                  {chapterUrl.split("/").pop()}
                </a>
              </span>
              <button
                type="button"
                onClick={() => setChapterUrl("")}
                className="text-red-500"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-2 bg-gray-100 p-2 rounded-lg">
              <span className="text-sm">No PDF Uploaded</span>
            </div>
          )}
        </div>
        <div className="flex-row justify-center items-center w-full p-4 shadow-md rounded-lg">
          <div>
            <label
              htmlFor="audioUpload"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Upload Audio
            </label>
            <input
              type="file"
              id="audioUpload"
              accept="audio/*"
              onChange={handleFileChangeAudio}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {audioUrl ? (
            <div className="flex justify-between items-center mt-2 bg-gray-100 p-2 rounded-lg">
              <div className="flex-1">
                {/* Clickable link to open the audio in a new tab */}
                <a
                  href={audioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <span className="text-sm">Audio File</span>
                </a>
              </div>
              <button
                type="button"
                onClick={() => setAudioUrl("")}
                className="text-red-500 flex items-center"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-2 bg-gray-100 p-2 rounded-lg">
              <span className="text-sm">No Audio Uploaded</span>
            </div>
          )}
        </div>
        <div className="flex-row justify-center items-center w-full p-4 shadow-md rounded-lg">
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
            />
          </div>
          {/* {isLoading && (
            <>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Uploading: {fileUploadPercentage}%
              </p>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
                <div
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${fileUploadPercentage}%` }}
                >
                  {fileUploadPercentage}%
                </div>
              </div>
            </>
          )} */}
          {videoUrls.length > 0 && (
            <div className="grid mt-4">
              {videoUrls.map((videoUrl, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mt-2 bg-gray-100 p-2 rounded-lg"
                >
                  <div className="flex items-center">
                    <MdOutlineVideoLibrary className="text-blue-500 text-2xl mr-2" />
                    <span className="text-sm">
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Video {index + 1}
                      </a>
                    </span>
                  </div>
                  <button
                    type="button"
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
        <div className="flex-row justify-center items-center w-full p-4 shadow-md rounded-lg">
          <div>
            <label
              htmlFor="thumbnail"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChangeThumbnail}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {/* {isLoading && (
              <>
                <p className="text-sm font-medium text-gray-700 mt-2">
                  Uploading: {thumbnailUploadPercentage}%
                </p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
                  <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300 ease-in-out"
                    style={{
                      width: `${thumbnailUploadPercentage}%`,
                    }}
                  >
                    {thumbnailUploadPercentage}%
                  </div>
                </div>
              </>
            )} */}
          </div>
          {thumbnail ? (
            <div className="flex items-center justify-between mt-2 bg-gray-100 p-2 rounded-lg">
              <div className="flex items-center">
                <a href={thumbnail} target="_blank" rel="noopener noreferrer">
                  <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className="w-10 h-10 object-cover rounded-md mr-2"
                  />
                </a>
                <span className="text-sm">Thumbnail</span>
              </div>
              <button
                type="button"
                onClick={() => setThumbnail("")}
                className="text-red-500"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-2 bg-gray-100 p-2 rounded-lg">
              <span className="text-sm">No Thumbnail Uploaded</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg w-full"
        >
          Update Chapter
        </button>
      </form>
    </div>
  );
};

export default EditChapter;
