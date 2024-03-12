import React from "react";

const AddInstructor = () => {
  return (
    <>
      <div className="my-5">
        <p className="font-semibold text-2xl">Add Instructor</p>
      </div>

      <form action="">
        <div className="grid gap-5">
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
          <div>
            <label
              htmlFor="school"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              School
            </label>
            <select
              id="school"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a medium</option>
              <option value="EN">English</option>
              <option value="KA">Kannada</option>
              <option value="ML">Malyalam</option>
              <option value="TL">Telgu</option>
            </select>
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
            >
              <option selected>Choose a medium</option>
              <option value="EN">English</option>
              <option value="KA">Kannada</option>
              <option value="ML">Malyalam</option>
              <option value="TL">Telgu</option>
            </select>
          </div>
        </div>
        <div className="flex justify-start items-center">
          <button
            type="button"
            className="mt-5 text-orange-500  hover:text-white border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddInstructor;
