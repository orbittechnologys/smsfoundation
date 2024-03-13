import React from "react";
import sfLogo from "../assets/sflogo.png";

const Login = () => {
  return (
    <>
      <div className="relative h-screen">
        <section className=" py-8 h-2/4 bg-[#140342] flex justify-start lg:items-start sm:items-center ">
          <div className="flex justify-center items-center w-full">
            <div>
              <img src={sfLogo} alt="logo" />
            </div>
            <div className="mx-5">
              <span
                className="border border-gray-500"
                style={{
                  display: "inline-block",
                  height: "45px",
                }}
              ></span>
            </div>
            <div>
              <p className="text-white font-bold text-2xl">SEHGAL</p>
              <p className="text-gray-300 text-xl">Foundation</p>
            </div>
          </div>
        </section>

        {/* Card */}

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-2/5 mx-auto p-6 bg-white rounded-2xl shadow-md  border-2 border-orange-500">
          <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl">
            Login
          </h1>
          <form className="space-y-4 md:space-y-6 mt-5" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Roll No
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
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
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <div className="grid place-items-center">
              <button
                type="submit"
                className=" lg:w-4/12 sm:w-1/3  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-2 border-orange-500 "
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <section className="bg-white py-8 h-2/4"></section>
      </div>
    </>
  );
};

export default Login;
