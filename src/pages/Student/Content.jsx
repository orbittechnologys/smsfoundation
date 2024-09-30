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
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-center items-start w-1/2 gap-5">
          {chapter?.videoUrl ? (
            <>
              <div className="p-4 bg-white rounded-2xl shadow-md max-h-[330px] overflow-y-scroll">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 sticky">
                    Available Videos
                  </h2>
                </div>
                {chapter?.videoUrl.length > 0 ? (
                  chapter?.videoUrl.map((url, index) => (
                    <a
                      key={index}
                      className="flex items-center gap-3 p-3 mb-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="font-medium text-gray-700">
                        {index + 1}.
                      </span>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700 transition"
                      >
                        {chapter?.name} {index + 1}
                      </a>
                    </a>
                  ))
                ) : (
                  <p className="text-gray-600">No videos available.</p>
                )}
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
