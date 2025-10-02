import "./App.css";
import { Button } from "./components/ui/button";
import { useState } from "react";
import LandingPage from "./components/LandingPage";

function App() {
  const [showText, setShowText] = useState(false);

  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;
