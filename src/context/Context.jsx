import { createContext, useState, useCallback, useEffect } from "react"; //Import useCallback
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]); 
  const [storedResponses, setStoredResponses] = useState({}); 
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setRecentPrompt(null); //Reset recent prompt so the sidebar can load it again
    setInput(""); //Also clear input field
  };
  

  //Wrap onSent() in useCallback() to prevent infinite loops
  const onSent = useCallback(async () => {
    try {
      if (!input || input.trim() === "") {
        console.error("Error: Cannot send an empty prompt.");
        setResultData("Please enter a prompt before sending.");
        return;
      }
  
      setRecentPrompt(input);
      setResultData("");
      setLoading(true);
      setShowResult(true);
  
      if (!prevPrompts.includes(input)) {
        setPrevPrompts((prev) => [...prev, input]);
      }
  
      let response = await run(input);
  
      if (!response || typeof response !== "string") {
        throw new Error("Invalid response format. Expected a string.");
      }
  
      let formattedResponse = response
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold text (**text** → <b>text</b>)
        .replace(/\*(.*?)\n/g, "<br>• $1<br>") // List items (* item → bullet point)
        .replace(/\n/g, "<br>");
  
      setStoredResponses((prev) => ({
        ...prev,
        [input.trim().toLowerCase()]: formattedResponse,
      }));
  
      //Show text word-by-word
      const words = formattedResponse.split(" ");
      setResultData(""); // Clear previous result
  
      words.forEach((word, index) => {
        setTimeout(() => {
          setResultData((prev) => prev + " " + word);
        }, 50 * index); // Adjust speed (50ms per word)
      });
  
      setShowResult(true);
    } catch (error) {
      console.error("Error in onSent function:", error);
      setResultData("Error fetching response. Please try again.");
    }
  
    setLoading(false);
    setInput("");
  }, [
    input,
    setRecentPrompt,
    setResultData,
    setLoading,
    setShowResult,
    prevPrompts,
    setPrevPrompts,
    setStoredResponses,
    setInput,
  ]);
   

  // Auto-send when input changes (after clicking a card)
  useEffect(() => {
    if (input.trim() !== "" && input !== recentPrompt) {
      onSent();  
    }
  }, [input, onSent, recentPrompt]); 

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    storedResponses, 
    setStoredResponses, 
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    setShowResult,  
    loading,
    setLoading,  
    resultData,
    setResultData, 
    input,  
    setInput,
    newChat,
};



  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;



