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
    if (!prompt) return; 

    setRecentPrompt(prompt);
    setInput(""); // Evita di mantenere vecchio testo nell'input
    setLoading(true); 

    const normalizedPrompt = prompt.trim().toLowerCase();

    if (storedResponses[normalizedPrompt]) {
      setResultData(storedResponses[normalizedPrompt]);
      setShowResult(true);  
      setLoading(false);
    } else {
      await onSent();
    }

    setExtended(false); // Chiude la sidebar dopo la selezione
  };

  return (
    <div>
      {/* Icona menu per dispositivi mobili */}
      <img 
        src={assets.menu_icon} 
        alt="menu-icon" 
        className="menu-icon" 
        onClick={() => setExtended(!extended)}
      />

      {/* Sidebar */}
      <div className={`sidebar ${extended ? "open" : ""}`}>
        <div className="top">
          <img 
            onClick={() => setExtended(!extended)} 
            className="menu" 
            src={assets.menu_icon} 
            alt="menu-icon" 
          />

          <div onClick={newChat} className="new-chat">
            <img src={assets.plus_icon} alt="plus-icon" />
            {extended ? <p>New Chat</p> : null}
          </div>

          {extended && (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item, index) => (
                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="message-icon" />
                  <p title={item}>{item.slice(0, 18)}...</p> 
                </div>
              ))}
            </div>
          )}
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
    </div>
  );
}

export default Sidebar;
