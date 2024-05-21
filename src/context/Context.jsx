import { createContext, useState } from "react";
import runChat from "../geminiAi/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState("");
  const [resultData, setResultData] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSent = async () => {
    setIsLoading(true);
    const response = await runChat(input);
    setResultData(response);
    setInput("");
    setIsLoading(false);
  };

  const contextValue = {
    input,
    setInput,
    onSent,
    showResult,
    setShowResult,
    resultData,
    setResultData,
    lastPrompt,
    setLastPrompt,
    isLoading,
    setIsLoading,
    editPrompt,
    setEditPrompt,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
