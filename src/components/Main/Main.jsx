import React, { useContext, useEffect, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const [theme, setTheme] = useState("light");
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

    useEffect(() => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      document.body.className = savedTheme; // Apply saved theme to body
    }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme; // Apply theme to body
    localStorage.setItem("theme", newTheme); // Save preference
  };

  const handleCartClick = (prompt) => {
    setInput(prompt);
    onSent(); 
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSent();
    }
  };
  
  
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <div>
          <img src={assets.logo} alt="" />
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Rahul Kumar</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="carts">
              <div
                className="cart"
                onClick={() =>
                  handleCartClick(
                    "Suggest beautiful place to see on an upcoming road Trip"
                  )
                }
              >
                <p>
                  Recommend breathtaking destinations for my next road trip
                  adventure.
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="cart"
                onClick={() =>
                  handleCartClick(
                    "What’s the reaction to and impact of autonomous vehicles"
                  )
                }
              >
                <p>
                  How are self-driving cars influencing the future of
                  transportation?
                </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="cart"
                onClick={() =>
                  handleCartClick(
                    "Explain the key rules of rugby. Start with the basics and go step-by-step."
                  )
                }
              >
                <p>
                  Suggest hidden gems for an unforgettable road trip experience.
                </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="cart"
                onClick={() =>
                  handleCartClick(
                    "Help me get organized with a list of 10 tips"
                  )
                }
              >
                <p>What are the key principles of rugby, starting from the ground up?</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result_title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result_data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="result_data" loader>
                  Loading...
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here ..."
              onKeyDown={handleKeyDown}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="Send Icon"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            This Gemini is developed by Rahul @krahulsahu using Gemini API
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
