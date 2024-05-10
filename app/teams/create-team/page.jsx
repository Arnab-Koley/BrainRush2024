"use client";
// import Buttons from "@components/Buttons/Buttons";
import React, { useEffect, useState } from "react";
import "./page.css";
import { Preahvihear } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setTeam, setTeamRequest } from "@Reducers/features/team";
import Loader from "@components/Loader/Loader";
import axios from "axios";
import Link from "next/link";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const createTeam = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMemberEmail, setTeamMemberEmail] = useState("");

  const [text, setText] = useState('');
  const [errorMessage2, setErrorMessage2] = useState(null);
  const [style1, setStyle1]=useState("shadow-white");

  const handleChange2 = (event) => {
    const newText = event.target.value;  // Remove non-alphabets and spaces
    setText(newText.replace(/[^a-zA-Z ]/g, ''));

    if (newText.length > 0 && !/^[a-zA-Z ]+$/.test(newText)) {
      setErrorMessage2('Only alphabets and spaces are allowed.');
      setStyle1("shadow-sheader");
    } else {
      setErrorMessage2(null);
      setStyle1("shadow-inputBorder");
    }
  };

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [style2, setStyle2]=useState("shadow-white");

  const handleChange1 = (event) => {
    const newEmail = event.target.value; // Capture original input

    // Update email state with filtered value (remove invalid characters)
    const filteredEmail = newEmail.replace(/[^a-z0-9@_.-]/g, '');
    setEmail(filteredEmail);

    // Check for invalid characters directly
    const invalidChars = newEmail.match(/[^a-z0-9@_.-]/g);
    if (invalidChars) {
      const errorMessage = `Invalid character(s): ${invalidChars.join(', ')}`;
      setErrorMessage(errorMessage);
      setStyle2("shadow-sheader");
    } else {
      setErrorMessage(null); // Clear error message for valid email
      setStyle2("shadow-inputBorder");
    }
  };

  const handleCreateTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team`,
        { teamName:text, teamMemberEmail:email }
      );

      if (data.success) {
        dispatch(setTeam(data.data));
        dispatch(
          setTeamRequest(
            data.confirmationRequest ? data.confirmationRequest : null
          )
        );
        setStyle1("shadow-white");
        setStyle2("shadow-white");
        alert(
          "Your team has been created successfully! Ask your teammate login and join team!"
        );
      } else {
        alert(data?.message);
      }
      setLoading(false);
      router.push("/teams");
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <section className="p-2">
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
        <div className="py-8 mb-8 bg-sbg rounded-lg lg:py-16 px-4 mt-0 md:mt-12 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-headerText ">
            <span className="text-white">Create Your Team</span>
          </h2>

          <p className="mb-8 lg:mb-16 font-medium text-center text-subHeaderText sm:text-xl">
            <span >
              Create your own team by entering your team name and your team
              mate's email!
            </span>
          </p>
          <form className="space-y-8" onSubmit={handleCreateTeamSubmit}>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-gray-400 text-lg font-medium "
              >
                <span className=" text-gray-400">
                  {/* Your Name<span className="text-red text-2xl">*</span> */}
                  Team Name<span className="text-red text-2xl">*</span>
                </span>{" "}
              </label>
              <input
                type="text"
                id="email"
                className={`shadow-md h-2 lg:h-full bg-inputBgColor border-gray-300 text-white text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 placeholder-gray-400 ${style1} `}
                placeholder="Team Name"
                required
                value={text}
                onChange={handleChange2}
              />
              {errorMessage2 && <div className="error-message2 pt-2 pl-3 text-sheader">{'! '}{errorMessage2}</div>}
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-gray-400 text-xl font-medium "
              >
                <span className=" text-gray-400">
                  {/* Your Name<span className="text-red text-2xl">*</span> */}
                  Team Member Email<span className="text-red text-2xl">*</span>
                </span>{" "}
              </label>
              <input
                type="email"
                id="email"
                className={`shadow-md h-2 lg:h-full bg-inputBgColor border-gray-300 text-white text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 placeholder-gray-400 ${style2} `}
                placeholder="Team Member Email"
                required
                value={email}
                onChange={handleChange1}
              />
              {errorMessage && <div className="error-message2 pt-2 pl-3 text-sheader">{'! '}{errorMessage}</div>}
            </div>

            <button
              type="submit"
              className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
            >
              <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                <span className={preahvihear.className}>Submit</span>
              </span>
            </button>

            {/* <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purple to Pink</button> */}
          </form>
        </div>
        {/* {successSubmit()} */}
      </section>
    </>
  );
};

export default createTeam;


