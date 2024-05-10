"use client";
// import Buttons from "@components/Buttons/Buttons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Preahvihear } from "next/font/google";
import PreviousMap from "postcss/lib/previous-map";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@components/Loader/Loader";
import { setTeam, setTeamRequest } from "@Reducers/features/team";
import { useRouter } from "next/navigation";
import { setRequest } from "@Reducers/features/requests";
import axios from "axios";
import Link from "next/link";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});
// import "./page.css";

function page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const requests = useSelector((state) => state.requests.requests);
  const handleAcceptTeam = async (id) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/confirm/${id}`
      );

      if (data.success) {
        dispatch(setTeam(data.data));
        dispatch(setTeamRequest(null));
        router.push("/teams");
      } else {
        alert(data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectTeam = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/confirm/${id}`
      );

      if (data.success) {
        let x = requests.filter((req) => req._id !== id);
        dispatch(setRequest(x));
      } else {
        alert(data?.message);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  function componentRender() {
    return loading ? (
      <Loader />
    ) : (
      <div className="mt-30">
        {requests?.length === 0 ? (
          <h1 className="h-auto mt-80 font-bold text-subHeaderText text-4xl mx-auto text-center">
            <span className=" text-stext font-semibold">
              You don't have any team requests.
            </span>
          </h1>
        ) : (
          <>
            <section className="text-stext px-2 body-font">
              <button className="p-6">
                <Link href="/teams">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="3"
                    stroke="white"
                    class="w-8 h-8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                </Link>
              </button>
              <div className="containe mt-20 mx-auto">
                <div className="flex flex-col -m- w-full items-center justify-center">
                  {requests &&
                    requests.map((request, ind) => (
                      <div
                        key={ind}
                        className="p-4 bg-sbg rounded-lg sm:w-full md:w-4/5 lg:w-2/3 hover:scale-105 mx-auto"
                      >
                        <div className="shadow-md shadow-sboxshade flex border-2 rounded-lg border-gray-200 border-opacity-50 sm:p-3 lg:p-8 sm:flex-row flex-row">
                          <div className="w-16 h-16 sm:hidden lg:inline sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-8 h-8 sm:hidden lg:inline"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                          </div>
                          <div className=" flex flex-row flex-wrap w-full items-center sm:justify-center md:justify-between">
                            <div>
                              <h1 className="leading-relaxed text-slightgray">
                                Team Name:{" "}
                                <span className="text-stext font-semibold">
                                  {request?.team?.teamName}
                                </span>
                                {/* Team Name : Poogle */}
                              </h1>
                              <p className="leading-relaxed text-slightgray mb-5">
                                Team Leader:{" "}
                                <span className="text-stext font-semibold">
                                  {request.teamLeader.name}
                                </span>
                                {/* Team Leader: Pratik Kumar Agarwal */}
                              </p>
                            </div>

                            <div className="flex flex:wrap items-center justify-end">
                              {/* <a className="mt-3 text-indigo-500 inline-flex me-2 items-center">
                    <Buttons title={"Cancel Request"} />
                  </a> */}
                              <button
                                type="submit"
                                onClick={() => {
                                  handleAcceptTeam(request._id);
                                }}
                                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                              >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 hover:text-gray-50  rounded-md group-hover:bg-opacity-0">
                                  <span className="text-sbuttontext font-semibold">
                                    Confirm
                                  </span>
                                </span>
                              </button>
                              <button
                                type="submit"
                                onClick={() => {
                                  handleRejectTeam(request._id);
                                }}
                                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                              >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 hover:text-gray-50  rounded-md group-hover:bg-opacity-0">
                                  <span className="text-sbuttontext font-semibold">
                                    Ignore
                                  </span>
                                </span>
                              </button>
                            </div>

                            {/* <a className="mt-3 text-indigo-500 inline-flex ms-2 items-center">
                    <Buttons title={"Confirm Request"} />
                  </a> */}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    );
  }

  return <>{componentRender()}</>;
}

export default page;
