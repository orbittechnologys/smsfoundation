import React, { useEffect, useState } from "react";
import VideoFilespng from "../../assets/videofiles.png";
import TextFilepng from "../../assets/textfile.png";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../../constants";
import axios from "axios";

const Content = () => {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const navigate = useNavigate();

  const fetchChapter = async (chapterId) => {
    try {
      const res = await axios.get(`${BASE_URL}chapter/id/${chapterId}`);
      console.log(res.data);

      setChapter(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chapterId) fetchChapter(chapterId);
  }, []);

  return (
    <>
      <div className="text-center my-10">
        <h1 className="lg:text-2xl sm:text-2xl text-orange-500 font-semibold px-10">
          How Would You Like to Learn Today: Watch a Video or Read a PDF?
        </h1>
      </div>
      <div className="flex justify-center items-center my-5 w-full">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 place-items-center w-1/2 gap-5">
          {chapter?.videoUrl ? (
            <>
              <div
                className="flex flex-col justify-center items-center border p-5 rounded-xl cursor-pointer shadow-md shadow-orange-200 "
                title="Click to watch the video"
              >
                <p className="text-xl font-semibold text-gray-700 mb-4">
                  Watch the Video Tutorial
                </p>
                <div className="relative">
                  <img
                    src={VideoFilespng}
                    alt="Video Thumbnail"
                    className="lg:h-64 sm:h-36 mb-4 rounded-md"
                  />
                </div>

                <div className="w-full grid place-content-start max-w-xs">
                  <h3 className="text-lg font-semibold mb-2">
                    Available Videos
                  </h3>
                  <div className="flex space-x-5">
                    {chapter?.videoUrl.map((url, index) => (
                      <div
                        key={index}
                        className="flex justify-start items-center gap-2 my-1"
                      >
                        <span className="font-medium">{index + 1}.</span>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-blue-600 hover:text-blue-800"
                        >
                          {chapter?.name} {index + 1}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            ``
          )}

          <div
            className="flex flex-col justify-center items-center border p-5 rounded-xl cursor-pointer shadow-md shadow-orange-200 "
            onClick={() => navigate(`/pdf/${chapter?._id}`)}
          >
            <p className="text-xl font-semibold text-gray-400">Read a PDF</p>
            <img src={TextFilepng} alt="" className="lg:h-64 sm:h-36" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
