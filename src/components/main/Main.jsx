import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

function Main() {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input,setIsFromCard } = useContext(Context);

  const handleCardClick = (cardPrompt) => {
    setIsFromCard(true);
    setInput(cardPrompt);  
  };
  

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_profile_avatar} alt="user-profile-avatar" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card" onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip.")}>
                <p>Suggest beautiful places to see on an upcoming road trip.</p>
                <img src={assets.compass_icon} alt="compass-icon" />
              </div>
              <div className="card" onClick={() => handleCardClick("Briefly summarize this concept: solo traveler.")}>
                <p>Briefly summarize this concept: solo traveler.</p>
                <img src={assets.bulb_icon} alt="bulb-icon" />
              </div>
              <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat.")}>
                <p>Brainstorm team bonding activities for our work retreat.</p>
                <img src={assets.message_icon} alt="message-icon" />
              </div>
              <div className="card" onClick={() => handleCardClick("Tell me about React js and React native.")}>
                <p>Tell me about React js and React native.</p>
                <img src={assets.code_icon} alt="code-icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result"> 
            <div className="result-title">
              <img src={assets.user_profile_avatar} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
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
              placeholder="Enter a prompt here" 
            />
            
            <div>
              <img src={assets.gallery_icon} alt="gellery-icon" />
              <img src={assets.mic_icon} alt="mic-icon" />
              
              {input.trim() !== "" ? (
                <img onClick={onSent} src={assets.send_icon} alt="send-icon" />
              ) : (
                <img src={assets.send_icon} alt="send-icon" style={{ opacity: 0.5, cursor: "not-allowed" }} />
              )}
            </div>
          </div>

          <p className="bottom-info">Gemini can make mistakes, even regarding people, so verify its responses.</p>
        </div>
      </div>
    </div>
  );
}

export default Main;
