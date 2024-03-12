import React from "react";

const addStudent = () => {
  return (
    <>
      <div className="flex justify-start items-center">
        <div className="flex mx-5 my-5 ">
          <p className="mr-2">Add Student</p>
          <p>Student Profile</p>
        </div>
      </div>
      <div>
        <form className="grid gap-6">
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
      </div>
    </>
  );
};

export default addStudent;
