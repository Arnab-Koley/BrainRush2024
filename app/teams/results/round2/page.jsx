"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import "./Round2.css";
import { Bangers, Preahvihear } from "next/font/google";
import axios from "axios";
import Loader from "@components/Loader/Loader";
import searchicon from "../../../../public/assets/images/search.png";
import deleteicon from "../../../../public/assets/images/delete.png"
import Image from "next/image";

const preahvihear = Bangers({
  subsets: ["latin"],
  weight: ["400"],
});

const Round2 = () => {
  const [teams, setTeams] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [limit, setLimit] = useState(0);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [notSelected, setNotSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // const getTeams = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/all?search=${search}&page=${pageNum}&selected=${notSelected}`
  //     );

  //     setTeams(data.teams);
  //     setLimit(data.limit);
  //     setCount(data.count);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   getTeams();
  // }, [pageNum, notSelected,search]);

  // const handleDelete = () => {
  //   setSearch(""); // Clear search input
  //   getTeams(); // Fetch all teams
  // };

  const [searchCleared, setSearchCleared] = useState(false);

  const fetchTeams = async () => {
    try {
      let apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/rounds?&page=${pageNum}&selected=${notSelected}&filter=second`;

   

      if (search !== "") {
        apiUrl += `&search=${search}`;
      }

      const { data } = await axios.get(apiUrl);

      setTeams(data.teams);
      setLimit(data.limit);
      setCount(data.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    setPageNum(1);
    fetchTeams();
  };

  const handleClearSearch = () => {
    setLoading(true);
    setSearch(""); // Clear search input
    setPageNum(1);
    setSearchCleared(true); // Set search cleared to true
  };

  useEffect(() => {
    if (searchCleared) {
      // If search is cleared, fetch all teams
      fetchTeams();
      setSearchCleared(false); // Reset searchCleared after fetching teams
    } else {
      // Otherwise, fetch teams based on current search
      fetchTeams();
    }
  }, [pageNum, notSelected, searchCleared]);

  return (
    <section className="allteam">
      {loading ? (
        <Loader />
      ) : (
        <section className="allteam">
          <div className="head">Round 2 Result</div>
          <div className="searchcontainer">
            <div className="searchbar">
              <input
              className="searchitem"
                type="text"
                name="email"
                id="teams-search"
                value={search}
                placeholder="Search for teams"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <div className="btns">
              <button type="submit" onClick={handleSearch} className="searchitem sbtn">
                <Image
                  src={searchicon}
                  alt=""
                  height={30}
                  width={30}
                />
              </button>
              <button type="button" onClick={handleClearSearch} className="searchitem dlbtn">
              <Image
                  src={deleteicon}
                  alt=""
                  height={30}
                  width={30}
                />
              </button>
              </div>
              
            </div>
          </div>

          <table className="tablecontainer">
            <div className="table">
              <thead className="tablehead">
                <th className="hitem">Team Name</th>
                <th className="hitem">Team Leader</th>
                <th className="hitem">Team Member</th>
              </thead>

              <tbody className="tablebody">
                {teams &&
                  teams.map((team) => (
                    <tr key={team._id} className="team">
                      <td className="bitem teamname">{team?.team?.teamName}</td>
                      <td className="bitem">
                        <div className="phn">Team Leader</div>
                        <div className="info">{team?.team?.leader?.name}</div>
                        <div className="info">{team?.team?.leader?.email}</div>
                      </td>
                      <td className="bitem">
                      <div className="phn">Team Member</div>
                        <div className="info">
                        {team?.team?.teamMember?.name ? team?.team?.teamMember?.name : "Not Selected"}
                        </div>
                        <div className="info">
                        {team?.team?.teamMember?.email ? team?.team?.teamMember?.email : "Not Selected"}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </div>
          </table>

          <div className="bottomtextholder">

            <button
               className="prenextbtn"
               
                onClick={() => {
                    if(pageNum==1){
                        return;
                    }
                    else{
                        setLoading(true);
                        setPageNum((prev) => {
                          return Math.max(prev - 1, 1);
                        });
                      }}

                    }
              >
                  <svg
                    className="w-3.5 h-3.5 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  <span>Prev</span>
              </button>

            <div className="bottomtext">
              Showing <span className="numbtn">{Math.min(count, (pageNum - 1) * limit + 1)}</span>{" "}
              to <span className="numbtn">{Math.min(count, pageNum * limit)}</span> of{" "}
              <span className="numbtn">{count}</span> Teams
            </div>

      
              <button
              className="prenextbtn"
                onClick={() => {
                    if(pageNum * limit >= count){
                        return;
                    }
                    else{
                        setLoading(true);
                        setPageNum((next) => {
                          return Math.min(
                            next + 1,
                            Math.floor((count - 1) / limit) + 1
                          );
                        });

                    }

                }}
              >
                  <span>Next</span>
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
              </button>





              <div className="phnbtn">
              <button
               className="phnprenextbtn"
                onClick={() => {
                    if(pageNum==1){
                        return;
                    }
                    else{
                        setLoading(true);
                        setPageNum((prev) => {
                          return Math.max(prev - 1, 1);
                        });
                      }
                  
                }}
              >
                  <svg
                    className="w-3.5 h-3.5 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  <span>Prev</span>
              </button>
      
              <button
              className="phnprenextbtn"
                onClick={() => {
                    if(pageNum * limit >= count){
                        return;
                    }
                    else{
                        setLoading(true);
                        setPageNum((next) => {
                          return Math.min(
                            next + 1,
                            Math.floor((count - 1) / limit) + 1
                          );
                        });

                    }
                }}
              >
                  <span>Next</span>
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
              </button>

              </div>

          </div>

        </section>
      )}
    </section>
  );
};

export default Round2;




// "use client";
// import React, { useEffect, useState } from "react";
// import "./Round2.css";
// import { Preahvihear } from "next/font/google";
// import axios from "axios";
// import Loader from "@components/Loader/Loader";

// const preahvihear = Preahvihear({
//     subsets: ["latin"],
//     weight: ["400"],
// });

// const Round1 = () => {
//     const [teams, setTeams] = useState([]);
//     const [pageNum, setPageNum] = useState(1);
//     const [limit, setLimit] = useState(0);
//     const [count, setCount] = useState(0);
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(true);

//     const getTeams = async () => {
//         try {
//             const { data } = await axios.get(
//                 `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/rounds?search=${search}&page=${pageNum}&filter=second`
//             );
//             // const data = await response.json();
//             setTeams(data.teams);
//             setLimit(data.limit);
//             setCount(data.count);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         setLoading(true);
//         getTeams();
//     }, [pageNum]);

//     return (
//         <>
//             {
//                 loading ? (
//                     <>
//                         <Loader />
//                     </>
//                 ) : (
//                     <>
//                         <div className="sm:flex">
//                             <div className="items-center mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 ">
//                                 <div className="lg:pr-3 searchAllTeam">
//                                     <label htmlFor="teams-search" className="sr-only">
//                                         <span className={preahvihear.className}>Search</span>
//                                     </label>
//                                     <div className="flex flex-row my-2 lg:w-64 xl:w-96 ">
//                                         <input
//                                             type="text"
//                                             name="email"
//                                             id="teams-search"
//                                             className="bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  "
//                                             placeholder="Search for teams"
//                                             onChange={(e) => {
//                                                 setSearch(e.target.value);
//                                             }}
//                                         />

//                                         <button
//                                             type="submit"
//                                             className="bg-primary-orange py-2 px-4 ml-2 text-white rounded-md"
//                                             onClick={getTeams}
//                                         >
//                                             <span className={preahvihear.className}>Search</span>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div
//                             className="overflow-x-auto mx-4 md:mx-20 rounded-md"
//                             style={{
//                                 boxShadow:
//                                     "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
//                             }}
//                         >
//                             <div className="inline-block min-w-full align-middle">
//                                 <div className="overflow-hidden shadow">
//                                     <table className="min-w-full divide-y table-fixed text-sm text-left text-gray-500">
//                                         <thead
//                                             className="h-20 text-xs text-gray-50 uppercase  bg-headerText"
//                                         >
//                                             <tr>
//                                                 <th scope="col" className="px-6 py-3 ">
//                                                     <span className={preahvihear.className}>Team Name</span>
//                                                 </th>
//                                                 <th scope="col" className="px-6 py-3">
//                                                     <span className={preahvihear.className}>
//                                                         Team Leader
//                                                     </span>
//                                                 </th>
//                                                 <th scope="col" className="px-6 py-3">
//                                                     <span className={preahvihear.className}>
//                                                         Team Member
//                                                     </span>
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {teams &&
//                                                 teams.map((team) => (
//                                                     <tr className=" border-b 0 " key={team?._id}>
//                                                         <td
//                                                             scope="row"
//                                                             className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
//                                                         >
//                                                             <span className={preahvihear.className}>
//                                                                 {team?.team?.teamName}
//                                                             </span>
//                                                         </td>
//                                                         <td className="px-6 py-4 text-gray-300">
//                                                             <span className="text-gray-900">
//                                                                 <span className={preahvihear.className}>
//                                                                     {team?.team?.leader?.name}
//                                                                 </span>
//                                                             </span>
//                                                             <br />
//                                                             <span className={preahvihear.className}>
//                                                                 {team?.team?.leader?.email}
//                                                             </span>
//                                                         </td>
//                                                         <td className="px-6 py-4 ">
//                                                             <span className="text-gray-900">
//                                                                 <span className={preahvihear.className}>
//                                                                     {team?.team?.teamMember?.name
//                                                                         ? team?.team?.teamMember?.name
//                                                                         : "Not Selected"}
//                                                                 </span>
//                                                             </span>
//                                                             <br />
//                                                             <span className={preahvihear.className}>
//                                                                 {team?.team?.teamMember?.name
//                                                                     ? team?.team?.teamMember?.email
//                                                                     : ""}
//                                                             </span>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex flex-col mt-4 items-center justify-center relative mb-10 right-0 bottom-0 mr-20">
//                             <span className="text-sm text-gray-900  font-medium">
//                                 Showing{" "}
//                                 <span className="font-semibold text-gray-900 ">
//                                     {Math.min(count, (pageNum - 1) * limit + 1)}
//                                 </span>{" "}
//                                 to{" "}
//                                 <span className="font-semibold text-gray-900 ">
//                                     {Math.min(count, pageNum * limit)}
//                                 </span>{" "}
//                                 of <span className="font-semibold text-gray-900 ">{count}</span>{" "}
//                                 Entries
//                             </span>
//                             <div className="inline-flex mt-2 xs:mt-0">
//                                 <button
//                                     className="rounded-md flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-subHeaderText bg-gray-800 hover:bg-gray-900   "
//                                     onClick={() => {
//                                         setPageNum((prev) => {
//                                             return Math.max(prev - 1, 1);
//                                         });
//                                     }}
//                                 >
//                                     <svg
//                                         className="w-3.5 h-3.5 mr-2"
//                                         aria-hidden="true"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 14 10"
//                                     >
//                                         <path
//                                             stroke="currentColor"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth="2"
//                                             d="M13 5H1m0 0 4 4M1 5l4-4"
//                                         />
//                                     </svg>
//                                     Prev
//                                 </button>

//                                 <button
//                                     className="rounded-md flex items-center justify-center px-4 h-10 text-base ml-1 font-medium text-white bg-subHeaderText bg-gray-800 border-0 border-gray-700  hover:bg-gray-900   "
//                                     onClick={() => {
//                                         setPageNum((prev) => {
//                                             return Math.min(prev + 1, Math.floor((count - 1) / limit) + 1);
//                                         });
//                                     }}
//                                 >
//                                     Next
//                                     <svg
//                                         className="w-3.5 h-3.5 ml-2"
//                                         aria-hidden="true"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 14 10"
//                                     >
//                                         <path
//                                             stroke="currentColor"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth="2"
//                                             d="M1 5h12m0 0L9 1m4 4L9 9"
//                                         />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                     </>
//                 )
//             }
//         </>
//     );
// };

// export default Round1;