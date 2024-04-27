"use client";
import { Analytics } from "@vercel/analytics/react";
import Hero from "@components/HeroSection/Hero";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Metal_Mania } from "next/font/google";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@Reducers/store";
import Nav from "@components/Nav/Nav";
import { useEffect, useState } from "react";
import Loader from "@components/Loader/Loader";
import UniversalLoader from "@components/Loader/UniversalLoader";

const inter = Metal_Mania({ subsets: ["latin"] ,
weight: ["400"],});

// export const metadata = {
//   title: "Kodikas 2k23",
//   description: "Unlock your coding pottential!",
// };

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <html lang="en">
      <title>BrainRush 2k24</title>
      <body>
        <Provider>
          <ReduxProvider store={store}>
            <div className="main">
              <div className="gradient"></div>
            </div>
            {loading ? (
              <UniversalLoader />
            ) : (
              <>
                <div className="relative z-10">
                  <Nav />
                  <div className="w-full h-auto -mt-18">{children}</div>
                  <Analytics />
                </div>
              </>
            )}
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
