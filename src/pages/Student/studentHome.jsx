import React from "react";
import flask from "../../assets/chemistry.png";
import { GrDocumentPdf } from "react-icons/gr";

const studentHome = () => {
  const CardData = [
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
    {
      category: "ENGLISH",
      title: "English study content ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
    {
      category: "ENGLISH",
      title: "English study content ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
    {
      category: "SCIENCE",
      title: "Atoms and Substance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum provident at aliquid nulla repellendus, molestias hic cumque unde est.",
      imageUrl: "path/to/flask-image.jpg",
      pdfUrl: "path/to/pdf-file.pdf",
    },
  ];

  return (
    <>
      <div className="relative h-screen">
        <section className="bg-[#140342] py-8 h-2/4">
          <div className="flex justify-center items-center w-full h-full">
            <div className="text-center">
              <h1 className="text-3xl  text-white font-semibold mb-4">
                Empowering students to shape their <br /> futures with knowledge
                as their guide.
              </h1>
              <button
                type="button"
                className="mt-5 text-white hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
              >
                My Courses
              </button>
            </div>
          </div>
        </section>

        <div className="absolute top-1/2 left-1/2 w-fit transform -translate-x-1/2 -translate-y-1/2  mx-auto p-6 bg-orange-600 rounded-2xl shadow-md">
          <div className="flex justify-center items-center px-10">
            <div className="space-y-10">
              <div className="flex items-center p-3 space-x-6 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
                <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 opacity-30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    className="bg-gray-100 outline-none"
                    type="text"
                    placeholder="Search by Chapter Name"
                  />
                </div>
                <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
                  <span className="whitespace-nowrap">Select Subject</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div className="bg-gray-800 py-3 px-5 text-white font-semibold rounded-full hover:shadow-lg transition duration-3000 cursor-pointer">
                  <span>Search</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-gray-200 py-8 px-5 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="mt-20 w-full col-span-3 text-center">
            <p>06 Materials Found</p>
          </div>
          {CardData.map((card, index) => (
            <div key={index} className="grid ">
              <div className="grid place-items-center bg-white p-4 rounded-xl text-center">
                <div className="flex justify-start items-start w-full">
                  <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                    {card.category}
                  </span>
                </div>
                <img src={flask} alt="flask" className="h-10" />
                <p className="font-semibold">{card.title}</p>
                <p className="text-gray-600">{card.description}</p>
                <a
                  href={card.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center mt-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center"
                >
                  <GrDocumentPdf className="mr-2" />
                  View
                </a>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default studentHome;
