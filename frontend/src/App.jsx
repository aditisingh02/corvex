import "./App.css";
import { Button } from "./components/ui/button";
import { useState } from "react";
function App() {
  const [showText, setShowText] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Button onClick={() => setShowText(!showText)}>Click Me</Button>
        {showText && <p>Hello, World!</p>}
      </div>
    </>
  );
}

export default App;
