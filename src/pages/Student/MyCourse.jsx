import React, { useState } from "react";
import flask from "../../assets/chemistry.png";
import { PiPlayPauseLight } from "react-icons/pi";

const MyCourse = () => {
  const [filter, setFilter] = useState("all");

  const CardData = [
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      score: 95,
      status: "ongoing",
    },
    {
      category: "ENGLISH",
      title: "English study content ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      score: 85,
      status: "completed",
    },
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      score: 70,
      status: "ongoing",
    },
    {
      category: "ENGLISH",
      title: "English study content ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      score: 60,
      status: "completed",
    },
  ];

  const filteredData = CardData.filter((card) =>
    filter === "all" ? true : card.status === filter
  );

  return (
    <div>
      <div className="mt-5 flex justify-between items-center mx-5">
        <div>
          <p>My Course</p>
        </div>
        <div className="flex ">
          <p
            className={filter === "ongoing" ? "mr-2 text-blue-500" : "mr-2"}
            onClick={() => setFilter("ongoing")}
          >
            Ongoing
          </p>
          <p
            className={filter === "completed" ? "text-blue-500" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </p>
        </div>
      </div>
      <section className="py-8 px-5 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className=" w-full col-span-3 text-center">
          <p>{filteredData.length} Materials Found</p>
        </div>
        {filteredData.map((card, index) => (
          <div key={index} className="grid ">
            <div className="grid border border-gray-200 shadow-lg place-items-center bg-white p-4 rounded-xl text-center">
              <div className="flex justify-start items-start w-full">
                <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                  {card.category}
                </span>
              </div>
              <img src={flask} alt="flask" className="h-10" />
              <p className="font-semibold">{card.title}</p>
              <p className="text-gray-600">{card.description}</p>
              {card.status === "completed" && (
                <div className="my-5 flex justify-between items-center w-full py-2 px-5 bg-gray-200 rounded-xl">
                  <div>
                    <p>Test score</p>
                    <p>{card.score}%</p>
                  </div>
                  <div>
                    <p>Time Spent</p>
                    <p>45 mins</p>
                  </div>
                </div>
              )}

              {card.status === "ongoing" && (
                <div className="ongoing mt-5">
                  <span className="p-3 rounded-full bg-gray-300 text-orange-500">
                    {card.score}%
                  </span>
                  <div>
                    <button
                      type="button"
                      className="mt-5 flex justify-center items-center text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
                    >
                      <PiPlayPauseLight className="mr-2 text-xl" /> Resume
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MyCourse;
