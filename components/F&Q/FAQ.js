import React from "react";
import Heading from "@components/Heading/Heading";
import { Bangers } from "next/font/google";
import "./faq.css";


const preahvihear = Bangers({
  subsets: ["latin"],
  weight: ["400"],
});

const FAQ = () => {
  // Define FAQ data
  const faqData = [
    {
      question: "Is there a registration fee for the event?",
      answer: "Yes, the registration fee is ₹60 per team.",
    },
    {
      question:
        "Can I register for the event as an individual if I don't have a team?",
      answer: "No, you cannot register as an individual.",
    },
    {
      question: "Who can be my teammates?",
      answer:
        "Teams can be formed from the same department and same year, Cross-Department registration is also allowed.",
    },
    {
      question: "Will there be any breaks during the event?",
      answer:
        "Yes, there will be scheduled breaks during the event to give you a chance to rest and recharge.",
    },
    {
      question: "Will refreshments be provided?",
      answer:
        "Yes, the teams which qualify the first round will be given refreshments during the lunch break.",
    },
    {
      question: "How will the winners be announced?",
      answer: "The winners will be announced on the day of the event itself.",
    },
    {
      question:
        "What should I do if I have technical difficulties during the event?",
      answer:
        "If you experience any technical difficulties during the event, please contact the event organizers immediately through the event platform or through the contact form on the website. We will do our best to assist you and ensure a smooth experience for all participants.",
    },
    // Add more FAQ items here
  ];

  return (
    <div className="faq-container">
      <Heading
        title="FAQ"
        header="Frequently Asked Questions"
        hearerspan=""
        subheader=""
        subheaderspan1=""
        subheaderspan2=""
      />
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <details>
              <summary>
                <img
                  src="/assets/images/thorhammer.png"
                  alt="Thor's Hammer"
                  className="thor-hammer"
                />
                <span className={preahvihear.className}>{item.question}</span>
              </summary>
              <p>{item.answer}</p>
            </details>
            {index < faqData.length - 1 && <hr className="hr" />} {/* Horizontal rule */}
          </div>
        ))}
      </div>
      <div className="footer">
        Made with ❤️ by BrainRush Tech Team
      </div>
    </div>
  );
};

export default FAQ;
