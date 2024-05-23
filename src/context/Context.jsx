import { createContext, useState } from "react";
import runChat from "../geminiAi/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState("");
  const [resultData, setResultData] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disableAi, setDisableAi] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const onSent = async () => {
    try {
      setDisableAi(true);
      setIsLoading(true);
      const response = await runChat(input);
      setResultData(response);
      setInput("");
      setIsLoading(false);
      setDisableAi(false);
      setShowErrorToast(false);
    } catch (error) {
      setShowErrorToast(true);
      setDisableAi(false);
    }
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
    disableAi,
    setDisableAi,
    showErrorToast,
    setShowErrorToast,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
