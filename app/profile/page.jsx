"use client";
import React, { useEffect, useState, useRef } from "react";
import "./page.css";
import { Preahvihear } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "@Reducers/features/profile";
import { useRouter } from "next/navigation";
import Loader from "@components/Loader/Loader";
import axios from "axios";
import Link from "next/link";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const Profile = () => {
  // todo ek useeffect likhna hai to get user details jb profile pe ayega
  const dispatch = useDispatch();
  const router = useRouter();
  const profileData = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState(profileData?.name);
  const email = profileData?.email;
  const [department, setDepartment] = useState(profileData?.department);
  const [year, setYear] = useState(profileData?.year);
  const [contact, setContact] = useState(profileData?.phoneNumber);
  const [loading, setLoading] = useState(false);
  
  const [phone, setPhone] = useState(contact);
  const [errorMessage, setErrorMessage] = useState(null);
  const previousInputRef = useRef(''); // Store previous input value
  const [isError2, setIsError2] = useState("shadow-white");

  const handleChange1 = (event) => {
    const newPhone = event.target.value; // Capture original input

    // Update state with filtered value (remove non-digits)
    setPhone(newPhone.replace(/\D/g, ''));

    // Validation based on the original input
    if (newPhone.length > 10) {
      setErrorMessage('Phone number cannot exceed 10 digits.');
    } else if (!/^\d+$/.test(newPhone)) { // Check for only digits in original input
      setErrorMessage('Please enter only numbers (0-9).');
      setIsError2("shadow-sheader");
    } else {
      setErrorMessage(null);
      setIsError2("shadow-inputBorder");
    }

    previousInputRef.current = phone;
  };

  const [text, setText] = useState(name);
  const [errorMessage2, setErrorMessage2] = useState(null);
  const [isError1, setIsError1] = useState("shadow-white");

  const handleChange2 = (event) => {
    const newText = event.target.value;  // Remove non-alphabets and spaces
    setText(newText.replace(/[^a-zA-Z ]/g, ''));

    if (newText.length > 0 && !/^[a-zA-Z ]+$/.test(newText)) {
      setErrorMessage2('Only alphabets and spaces are allowed.');
      setIsError1("shadow-sheader");
    } else {
      setErrorMessage2(null);
      setIsError1("shadow-inputBorder");
    }
  };


  useEffect(() => {
    setName(profileData?.name);
    setDepartment(profileData?.department);
    setYear(profileData?.year);
    setContact(profileData?.phoneNumber);
  }, [profileData]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!name.length || !department.length || !year || !contact) {
      alert("Fill the form completely!");
      return;
    }
    const phoneNumberPattern = /^\d{10}$/; // Validates a 10-digit number
    if (!phoneNumberPattern.test(contact))
      return alert("Enter a valid phone number!");
    if (department == "Select")
      return alert("Select your department!");
    if (year == "Select")
      return alert("Select your batch!");
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
        {
          name:text,
          department,
          year,
          contact:phone,
        }
      );
      
      if (data.success) {
        dispatch(setProfile(data.data));
        router.push("/teams");
        setIsError1("shadow-white");
        setIsError2("shadow-white");
      } else {
        alert(data?.message);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className=" mt-24 pb-6 p-2">
      <div className="py-16 bg-sbg rounded-lg lg:py-8 px-8 mx-auto max-w-screen-md">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-center text-white ">
              <span className={preahvihear.className}>
                Complete Your Profile
              </span>
            </h2>

            <p className="mb-8 lg:mb-16 text-center font-medium text-subHeaderText sm:text-xl">
              <span className={preahvihear.className}>
                Build Your Profile and Shine in KODIKAS-2K23.
              </span>
            </p>
            <form className="space-y-8" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-700 font-medium"
                >
                  <span className=' text-slightgray'>
                    Your Name<span className="text-red text-2xl">*</span>
                  </span>{" "}
                </label>
                <input
                  type="text"
                  id="email"
                  className={`profileInput h-0 shadow-md bg-inputBgColor border-gray-300 text-white text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full ${isError1}`}
                  placeholder="Your Name"
                  required
                  value={text || ""}
                  onChange={handleChange2}
                />
                {errorMessage2 && <div className="error-message2 pt-2 pl-3 text-red">{'! '}{errorMessage2}</div>}
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm text-gray-600 font-medium "
                >
                  <span className='text-slightgray'>
                    {/* Your Name<span className="text-red text-2xl">*</span> */}
                    Your Email<span className="text-red text-2xl">*</span>
                  </span>{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  className="h-0 shadow-white profileInput shadow-md bg-inputBgColor border-gray-300 text-white text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full "
                  placeholder="Your Email ID"
                  required
                  disabled
                  value={email || ""}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-gray-600 text-sm font-medium "
                >
                  <span className='text-slightgray'>
                    {/* Your Name<span className="text-red text-2xl">*</span> */}
                    Contact Number<span className="text-red text-2xl">*</span>
                  </span>{" "}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="1234567890"
                  maxLength={10}
                  minLength={10}
                  required
                  className={`h-0 profileInput shadow-md bg-inputBgColor text-white text-xl rounded-lg  w-full ${isError2}`}
                  value={phone == "1234567890" ? "" : phone || ""}
                  onChange={handleChange1}
                />
                {errorMessage && <div className="error-messagept-2 pt-2 pl-3 text-red">{'! '}{errorMessage}</div>}
              </div>
              <div>
                <label
                  htmlFor="Department"
                  className="block mb-2 text-gray-600 text-sm font-medium "
                >
                  <span className='text-slightgray'>
                    {/* Your Name<span className="text-red text-2xl">*</span> */}
                    Department<span className="text-red text-2xl">*</span>
                  </span>{" "}
                </label>

                <select
                  id="Department"
                  name="Department"
                  className=" h-0 hover:cursor-pointer shadow-white profileInput shadow-md bg-inputBgColor focus:bg-inputBgColor border-gray-300 text-white text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full focus:text-background "
                  value={department || ""}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  required
                >
                  <option value="">Select</option>
                  <option value="CSE">CSE</option>
                  <option value="CSE-DS">CSE-DS</option>
                  <option value="CSE AIML">CSE AIML</option>
                  <option value="IT">IT</option>
                  <option value="IT AIML">IT AIML</option>
                  <option value="AUE">AUE</option>
                  <option value="ECE">ECE</option>
                  <option value="ECE VLSI">ECE VLSI</option>
                  <option value="EE">EE</option>
                  <option value="ME">ME</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="Year"
                  className="block mb-2 text-gray-600 text-sm font-medium "
                >
                  <span className='text-slightgray'>
                    {/* Your Name<span className="text-red text-2xl">*</span> */}
                    Batch<span className="text-red text-2xl">*</span>
                  </span>{" "}
                </label>

                <select
                  id="Year"
                  name="Year"
                  className="h-0 hover:cursor-pointer profileInput shadow-md shadow-white bg-inputBgColor border-gray-300 text-white text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full "
                  value={year || ""}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                  required
                >
                  <option value="">Select</option>
                  {/* <option value={2027}></option> */}
                  <option value={2024}>2020-24</option>
                  <option value={2025}>2021-25</option>
                  <option value={2026}>2022-26</option>
                  <option value={2026}>2023-27</option>
                </select>
              </div>
              {/* <div className="flex justify-between"> */}
              {/* <button
                type="submit"
                className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
              >
                <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                  <span className={preahvihear.className}>Submit Details</span>
                </span>
              </button> */}
              
                <button type="submit" 
                className="mt-16 ml-1 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-400 dark:focus:ring-red-800 shadow-md shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-lg text-md font-semibold px-5 py-2.5 text-center me-2 mb-2 border border-red-800 hover:border-white hover:scale-105">Submit</button>

              {/* <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purple to Pink</button> */}
            </form>
          </>
        )}
      </div>
    </section>
    // <h1 className="flex justify-center">{session?.user?.name}</h1>
  );
};

export default Profile;
