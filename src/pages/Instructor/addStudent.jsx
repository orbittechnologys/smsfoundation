import React, { useState } from "react";

const addStudent = () => {
  const [showForm1, setShowForm1] = useState(true);
  return (
    <>
      <div className="flex justify-start items-center">
        <div className="flex mx-5 my-5 ">
          <p
            className={showForm1 ? "mr-2 font-medium" : "mr-2 cursor-pointer"}
            onClick={() => setShowForm1(true)}
          >
            Add Student
          </p>
          <p
            className={!showForm1 ? "font-medium" : "cursor-pointer"}
            onClick={() => setShowForm1(false)}
          >
            Student Profile
          </p>
        </div>
      </div>
      <div>
        {showForm1 ? (
          <form className="1">
            <div>
              <label
                htmlFor="rollno"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Roll No
              </label>
              <input
                type="text"
                id="rollno"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div>
              <button
                type="button"
                className="mt-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
              >
                Add Student
              </button>
            </div>
          </form>
        ) : (
          <form className="2">
            <div>
              <label
                htmlFor="standard"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Standard
              </label>
              <input
                type="text"
                id="standard"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div>
              <label
                htmlFor="syllabus"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Syllabus
              </label>
              <input
                type="text"
                id="syllabus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div>
              <label
                htmlFor="medium"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Medium
              </label>
              <input
                type="text"
                id="medium"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div>
              <button
                type="button"
                className="mt-5 text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2     "
              >
                Add Student
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default addStudent;
