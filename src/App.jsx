import { useContext, useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import "./App.css";
import { Context } from "./context/Context";
import he from "he";
import EditModal from "./EditModal";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ErrorToast from "./ErrorToast";

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editing, setEditing] = useState({ id: null, text: "" });
  const {
    onSent,
    input,
    setInput,
    setResultData,
    resultData,
    lastPrompt,
    setLastPrompt,
    isLoading,
    disableAi,
    showErrorToast,
    setShowErrorToast,
  } = useContext(Context);

  // storing data in local storage
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  // storing data in local storage

  const handleToggle = (id, completed) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newItem.trim() == 0) {
      alert("please enter something");
    } else {
      setTodos((currentTodos) => {
        return [
          ...currentTodos,
          { id: crypto.randomUUID(), title: newItem, completed: false },
        ];
      });
    }
    setNewItem("");
  };

  const deleteList = (id) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  const isHtml = (str) => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  };

  const decodeHtml = (html) => {
    return he.decode(html).replace(/[*`#]/g, "");
  };

  const startEditing = (id, text) => {
    setShowEditModal((p) => !p);
    setEditing({ id, text });
  };

  const saveEditing = () => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === editing.id ? { ...todo, title: editing.text } : todo
      )
    );
  };

  // gemini

  const handleGeminiPrompt = (e) => {
    e.preventDefault();
    if (input.trim() == 0) {
      alert("please enter a prompt");
    } else {
      setInput("");
      setLastPrompt(input);
      setResultData("");
      onSent();
    }
  };

  const formatResultData = (content) => {
    return content.replace(/[*#]/g, "");
  };
  // gemini
  return (
    <>
      <div className="d-flex flex-column justify-content-center text-center position-relative">
        <form onSubmit={handleAdd} className="new-item-form">
          <div className="form-row">
            <label
              style={{
                marginBottom: "20px",
                fontSize: "40px",
                fontWeight: "bold",
              }}
              htmlFor="item"
            >
              New Item
            </label>
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              type="text"
              id="item"
            />
          </div>
          <button className="btn btn-primary"> Add</button>
        </form>
        <h1 className="header">List Items</h1>
        {todos.length == 0 && <h1>please enter a task</h1>}
        {todos.map((item) => {
          return (
            <ul key={item.id} className="list width-form my-1">
              <li>
                <label>
                  <input
                    checked={item.completed}
                    onChange={(e) => handleToggle(item.id, e.target.checked)}
                    type="checkbox"
                  />
                  {item.title}
                </label>
                <button
                  onClick={() => deleteList(item.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => startEditing(item.id, item.title)}
                  // onClick={""}
                >
                  Edit
                </button>
              </li>
            </ul>
          );
        })}
        <hr />
        {/* Gemini */}
        <form onSubmit={handleGeminiPrompt} className="new-item-form">
          <label
            style={{
              marginBottom: "20px",
              fontSize: "40px",
              fontWeight: "bold",
            }}
            htmlFor="item"
          >
            Gemini Clone
          </label>
          <div className="form-row d-flex flex-row justify-content-center">
            <input
              className="w-100"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              id="item"
              disabled={disableAi}
            />
            <div>
              <button
                type="submit"
                className="btn btn-danger"
                onClick={handleGeminiPrompt}
              >
                &#9889;
              </button>
            </div>
          </div>
        </form>
        <div style={{ marginTop: "100px" }}>
          {
            <div className="my-4">
              {!isLoading && (
                <h4>
                  Your Prompt :
                  {resultData.length == 0 ? "No Prompts" : lastPrompt}
                </h4>
              )}
            </div>
          }
          {/* {isLoading && <h2>...Loading</h2>} */}
          {isLoading && (
            <div>
              <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          <div>
            {isHtml(resultData) ? (
              <pre
                className="rounded w-100"
                style={{
                  border: "1px solid #ddd",
                  textAlign: "start",
                  fontSize: "17px",
                }}
              >
                <SyntaxHighlighter
                  language="javascript"
                  style={atomOneDark}
                  customStyle={{ padding: "25px" }}
                >
                  {decodeHtml(resultData)}
                </SyntaxHighlighter>
              </pre>
            ) : (
              <b
                dangerouslySetInnerHTML={{
                  __html: formatResultData(resultData),
                }}
              ></b>
            )}
          </div>
        </div>
        <EditModal
          showEditModal={showEditModal}
          editing={editing}
          setEditing={setEditing}
          startEditing={startEditing}
          saveEditing={saveEditing}
        />
        <div className="toastinger">
          <ErrorToast
            showErrorToast={showErrorToast}
            setShowErrorToast={setShowErrorToast}
          />
        </div>
      </div>
    </>
  );
}

export default App;
