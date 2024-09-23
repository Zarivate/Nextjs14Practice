import React from "react";

const PrivateProfile = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-500 blur-lg">
      <div className="mx-auto h-full px-4 py-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-16 xl:py-28 ">
        <div className="flex flex-col items-center justify-between">
          <div className="">
            <div className="max-w-3xl">
              <h1 className="mb-6 text-center text-5xl font-light tracking-tight text-white sm:text-5xl lg:text-7xl">
                Easily improve{" "}
                <span className="my-1 inline-block font-serif font-bold text-white">
                  {" "}
                  customer relations{" "}
                </span>
              </h1>
              <p className="text-center text-base text-gray-100">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque it.
              </p>
            </div>
            <form
              method="POST"
              action="#"
              className="mx-auto mt-12 mb-2 max-w-xl sm:rounded-xl sm:border sm:border-gray-100 sm:bg-white sm:p-2 sm:shadow"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative text-gray-500 sm:w-7/12">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        className=""
                      ></path>
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group flex items-center justify-center rounded-xl bg-blue-700 px-6 py-4 text-white transition"
                >
                  <span className="group flex w-full items-center justify-center rounded text-center font-medium">
                    Free Trial
                  </span>
                  <svg
                    className="shrink-0 group-hover:ml-8 ml-4 h-4 w-4 transition-all"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>

            <div className="divide-gray-300/30 mt-12 flex flex-col items-center justify-center space-y-3 text-sm text-gray-700 sm:flex-row sm:items-start sm:space-y-0 sm:divide-x">
              <div className="flex max-w-xs space-x-2 px-4">
                <span className="shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2.5 text-purple-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                    ></path>
                  </svg>
                </span>
                <p className="text-gray-100">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="flex max-w-xs space-x-2 px-4">
                <span className="shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2.5 text-rose-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    ></path>
                  </svg>
                </span>
                <p className="text-gray-100">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-20 hidden lg:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto my-6 h-10 w-10 animate-bounce rounded-full bg-blue-50 p-2 lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 17l-4 4m0 0l-4-4m4 4V3"
              ></path>
            </svg>
            <div
              className="w-fit mx-auto flex overflow-hidden rounded-3xl bg-orange-400"
              role="image-container"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateProfile;
