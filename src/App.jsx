import { evaluate } from "mathjs";
import { useEffect, useRef, useState } from "react";
import { allBtns } from "./data";

function App() {
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("theme1");

  const handleKeyPress = (content) => {
    if (content === "RESET") {
      setInput("");
    } else if (content === "DEL") {
      setInput((prev) => prev.slice(0, -1));
    } else if (content === "=") {
      try {
        setInput(evaluate(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + content);
    }
  };

  const switchTheme = () => {
    setTheme((prev) =>
      prev === "theme1" ? "theme2" : prev === "theme2" ? "theme3" : "theme1"
    );
  };

  return (
    <div className={`container ${theme}`}>
      <Header onThemeSwitch={switchTheme} />
      <Display value={input} />
      <KeyPad onKeyPress={handleKeyPress} />
    </div>
  );
}

function Header({ onThemeSwitch }) {
  return (
    <div className="header">
      <h1>Calculator</h1>
      <button className="theme-btn" onClick={onThemeSwitch}>
        Switch Theme
      </button>
    </div>
  );
}

function Display({ value }) {
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(inputRef.current);
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [value]);
  return (
    <div className="display">
      <input disabled ref={inputRef} type="text" value={value} />
    </div>
  );
}

function KeyPad({ onKeyPress }) {
  return (
    <div className="keypad">
      {allBtns.map((btn) => (
        <Button
          key={btn.id}
          content={btn.content}
          onKeyPress={onKeyPress}
          span={btn.content === "RESET" || btn.content === "="}
        />
      ))}
    </div>
  );
}

function Button({ content, onKeyPress, span }) {
  return (
    <button
      onClick={() => onKeyPress(content)}
      className={`button-3d ${span ? "wide-btn" : ""}`}
    >
      {content}
    </button>
  );
}

export default App;
