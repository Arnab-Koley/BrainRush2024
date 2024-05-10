"use client";
import React, { useEffect, useRef, useState } from "react";
import "./page.css";
import Link from "next/link";
import Loader from "@components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { setTeam, setTeamRequest } from "@Reducers/features/team";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Preahvihear } from "next/font/google";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const Teams = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isAlreadyInTeam, team, sentRequestFromTheTeam } = useSelector(
    (state) => state.team
  );
  const user = useSelector((state) => state.user.user);
  const [teamMemberEmail, setTeamMemberEmail] = useState("");
  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/${team?._id}`
      );
      if (data.success) {
        dispatch(setTeam(null));
        dispatch(setTeamRequest(null));
      } else {
        alert(data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveRequest = async () => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/confirm/${sentRequestFromTheTeam?._id}`
      );
      if (data.success) {
        dispatch(setTeamRequest(null));
      } else {
        alert(data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveMember = async () => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/${team?._id}`
      );
      if (data?.success) {
        dispatch(setTeamRequest(null));
        dispatch(setTeam(data.data));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLeaveTeam = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/${team?._id}`
      );
      if (data?.success) {
        dispatch(setTeam(null));
        dispatch(setTeamRequest(null));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendRequest = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/confirm`,
        {
          teamMemberEmail,
        }
      );
      if (data.success) {
        dispatch(setTeamRequest(data.data));
        setTeamMemberEmail("");
      } else {
        alert(data?.message);
      }
      setLoading(false);
      router.push("/teams");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  /* SHOW QR STARTS */
  const [isImageVisible, setImageVisible] = useState(false);
  const handleQr = () => {
    setImageVisible(true);
  };
  const posterRef = useRef(null);

  const handleDocumentClick = (event) => {
    if (!posterRef.current?.contains(event.target) && isImageVisible) {
      setImageVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [posterRef, isImageVisible]);

  /* SHOW QR ENDS */
  return (
    <>
      {/* qr */}
      {
        <div
          className={`z-50 fixed inset-0 flex justify-center items-center transition-opacity duration-300 ${
            isImageVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          } backdrop-blur-md`}
        >
          <div className="bg-white p-8 rounded-lg shadow-md w-auto">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${team?._id}`}
              alt="Centered Image"
              className="block mx-auto max-w-full"
            />
          </div>
        </div>
      }
      {/* qr ends */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAlreadyInTeam ? (
            <section className="text-gray-600 w-full flex items-center justify-center body-font sm:mx-0 ">
              <div className="md:w-3/4 flex items-center justify-center w-full py-24">
              
                <div className="flex flex-wrap items-center justify-center md:w-full  lg:w-1/2 mainTeamButton">
                  <div className="p-2 w-11/12 md:w-3/4 hover:scale-105 shadow-md shadow-white">
                    <div className="flex border-2 rounded-lg border-white teaminnerbutton border-opacity-50 p-8 sm:flex-row flex-col">
                      <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-8 h-8"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-white text-4xl title-font font-2xl mb-6">
                          <span className="font-bold">My Team</span>
                        </h2>
                        <h1 className="leading-relaxed text-base text-gray-400 mb-3 ">
                          Team Name:{" "}
                          <span className="text-white"> {team?.teamName}</span>
                        </h1>
                        <p className="leading-relaxed text-base text-slightgray mb-3">
                          Team Leader:{" "}
                          <span className="text-white">
                            {team?.leader?.name}
                          </span>
                        </p>
                        <p className="leading-relaxed text-base text-slightgray mb-3">
                          Payment Status:{" "}
                          <span className="text-white">
                            {" "}
                            {team?.payment ? "Paid" : "Not Paid"}
                          </span>
                        </p>
                        {team?.teamMemberConfirmation ? (
                          <p className="leading-relaxed text-base text-slightgray mb-3">
                            Team Member:{" "}
                            <span className="text-white">
                              {team?.teamMember.name}
                            </span>{" "}
                          </p>
                        ) : (
                          <p className="leading-relaxed text-base text-slightgray mb-3">
                            Team Member:{" "}
                            <span className="text-white">Not Joined</span>
                          </p>
                        )}
                        {!team?.teamMemberConfirmation &&
                          !sentRequestFromTheTeam && (
                            <form
                              className="space-y-8 "
                              onSubmit={handleSendRequest}
                            >
                              <div className="w-full flex flex-wrap items-center">
                                <label
                                  htmlFor="email"
                                  className="block text-md mr-2 text-gray-700 font-medium"
                                >
                                  <span className="text-stext">
                                    Add Team Member:
                                    <span className="text-red text-md"> </span>
                                  </span>{" "}
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    id="email"
                                    className="shadow-sm h-2 lg:h-full bg-inputBgColor border-gray-300 text-slightgray text-md rounded-lg focus:ring-primary-500 focus:border-gray-50 block  p-1"
                                    placeholder="Team Member Email"
                                    required
                                    value={teamMemberEmail}
                                    onChange={(e) => {
                                      setTeamMemberEmail(e.target.value);
                                    }}
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="mt-1 relative text-center inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor "
                                >
                                  <span className="relative px-2.5 py-1.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                                    <span className="text-sbuttontext font-semibold" >
                                      Send
                                    </span>
                                  </span>
                                </button>
                              </div>
                            </form>
                          )}

                        {!team?.teamMemberConfirmation &&
                          sentRequestFromTheTeam && (
                            <h1 className="text-slightgray">
                              Request sent to:{" "}
                              <strong className="text-white">
                                {sentRequestFromTheTeam?.teamMemberEmail}
                              </strong>
                            </h1>
                          )}
                      </div>
                    </div>
                    {/* {console.log(qrData)} */}

                    <div className="flex flex-row justify-center items-center p-5">
                      {user?.id === team?.leader?._id &&
                        !team.payment &&
                        team?.teamMemberConfirmation && (
                          <button
                            onClick={handleRemoveMember}
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className={preahvihear.className}>
                                Kick Member
                              </span>
                            </span>
                          </button>
                        )}
                      {/* remove request */}
                      {!team?.teamMemberConfirmation &&
                        sentRequestFromTheTeam && (
                          <button
                            onClick={handleRemoveRequest}
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className={preahvihear.className}>
                                Remove Request
                              </span>
                            </span>
                          </button>
                        )}
                      {team?.teamMemberConfirmation && (
                        <button
                          onClick={handleQr}
                          className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                        >
                          <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                            <span className="text-sbuttontext font-semibold">
                              Team QR
                            </span>
                          </span>
                        </button>
                      )}

                      {/* delete team */}
                      {!team?.payment ? (
                        user?.id === team?.leader?._id ? (
                          <button
                            onClick={handleDelete}
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className="text-sbuttontext font-semibold">
                                Delete Team
                              </span>
                            </span>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            onClick={handleLeaveTeam}
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className={preahvihear.className}>
                                Leave Team
                              </span>
                            </span>
                          </button>
                        )
                      ) : null}
                    </div>
                  </div>

                  <div />
                  <div />
                </div>
              </div>
            </section>
          ) : (
            <section className=" text-gray-600  px-2 body-font mainTeamButton">
              <button className="p-6">
                <Link href="/">
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
              <div className="container px-5 lg:py-16 mx-auto">
                <div className=" flex flex-wrap gap-8 items-center justify-center -m-4">
                  <div className=" p-4 lg:w-1/3 md:w-full">
                    <div className=" hover:scale-105 shadow-md shadow-sboxshade flex border-2 rounded-lg border-gray-200 teaminnerbutton border-opacity-50 p-8 sm:flex-row flex-col">
                      <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                          class="w-10 h-10"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                          />
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <h2
                          className="text-sheader text-4xl title-font font-2xl mb-3"
                          // style={{ color: "#6f7bd9 !important" }}
                        >
                          <span className="font-bold">Join Team</span>
                        </h2>

                        <p className="leading-relaxed text-base mb-5">
                          {/* Team Leader: {request.teamLeader.name} */}
                          <span className="text-stext">
                            Join a team made by a friend of yours!
                          </span>
                        </p>
                        <Link href="teams/join-team">
                          <button
                            type="submit"
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-sbutton text-sbuttontext duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className="font-bold">Join Team</span>
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 lg:w-1/3 md:w-full">
                    <div className="hover:scale-105 shadow-md shadow-sboxshade flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                      <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                          class="w-10 h-10"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                          />
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-sheader text-3xl title-font font-2xl mb-3">
                          <span className="font-bold">Create Team</span>
                        </h2>
                        <p className="leading-relaxed text-base mb-5">
                          <span className="text-stext">
                            Create your own team, and invite your friend!
                          </span>
                        </p>
                        <Link href="/teams/create-team">
                          <button
                            type="submit"
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-sbutton text-sbuttontext duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className="font-bold">Create Team</span>
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Teams;
