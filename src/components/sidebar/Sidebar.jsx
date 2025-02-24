import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

function Sidebar() {
  const [extended, setExtended] = useState(false);

  const { 
  onSent, 
  prevPrompts, 
  setRecentPrompt, 
  setInput, 
  newChat, 
  storedResponses, 
  setResultData, 
  setShowResult,  
  setLoading  
} = useContext(Context);




const loadPrompt = async (prompt) => {
  if (!prompt) return; //Prevent errors if the prompt is null

  setRecentPrompt(prompt);
  setInput(""); //Keep input empty when loading a saved prompt
  setLoading(true); 

  const normalizedPrompt = prompt.trim().toLowerCase();

  if (storedResponses[normalizedPrompt]) {
    setResultData(storedResponses[normalizedPrompt]);
    setShowResult(true);  
    setLoading(false);
  } else {
    await onSent();
  }
};





  return (
    <div className="sidebar">
      <div className="top">
        <img 
          onClick={() => setExtended(prev => !prev)} 
          className="menu" 
          src={assets.menu_icon} 
          alt="menu-icon" 
        />

        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="plus-icon" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt="message-icon" />
                <p title={item}>{item.slice(0, 18)}...</p> 
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question-icon" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history-icon" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="setting-icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
