import "./App.css";
import Home from "./components";

function App() {
  return (
    <div className="App">
      <div style={{backgroundColor: "cadetblue", padding: "30px 0", color: "white"}}>
        <h2>React-Media-Lightbox Demo</h2>
        <p style={{fontSize: "12px"}}>Click on any media gallery item to open up the lightbox</p>
      </div>
      <Home />
    </div>
  );
}

export default App;
