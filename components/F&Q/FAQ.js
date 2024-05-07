import React, { useState } from "react";
import data from "../../faq_data";
import "./faq.css";

const FAQ = () => {
  const [catSelected, setCatSelected] = useState(null);
  const [quesSelected, setQuesSelected] = useState(null);

  const cattoggle = (i) => {
    if (catSelected === i) {
      setCatSelected(null);
    } else {
      setCatSelected(i);
    }
  };

  const questoggle = (i) => {
    if (quesSelected === i) {
      setQuesSelected(null);
    } else {
      setQuesSelected(i);
    }
  };

  return (
    <div className="wrapper">
      <div className="faqhead">FAQS</div>
      <div className="accordion">
        {data.map((category, index) => (
          <div key={index} className="item">
            <div className="category bg-gradient-to-br from-red to-gray-50 hover:bg-slate-200 text-black text-xl font-semibold" onClick={() => cattoggle(index)}>
              <div className="categorytext">{category.category}</div>
              <div className="categoryicon">{catSelected === index ? "-" : "+"}</div>
            </div>
            <div className={`quesans ${catSelected === index ? "show" : "hidden"}`}>
              {category.questions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="questions"
                  onClick={() => questoggle(qIndex)}
                >
                  <div className="heading-container">
                    <img
                      src="/assets/images/thorhammer.png"
                      alt="Thor Hammer"
                      className={`thor-hammer ${quesSelected === qIndex ? "hammer-tilt" : ""}`} // Apply tilt class conditionally
                    />
                    <div className="question">
                      <div className="ques">{question.question}</div>
                      <div className="icon">{quesSelected === qIndex ? "-" : "+"}</div>
                    </div>
                  </div>
                  <div className={`ans ${quesSelected === qIndex ? "show" : "hidden"}`}>
                    {question.answer}
                  </div>
                  <div className="h-divider"><div className="shadow"></div></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
