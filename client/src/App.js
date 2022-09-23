import './App.css';
import QuerryBar from "./Components/Querry/Querry";
import Results from "./Components/Results/Results";
import {useState} from "react";

function App() {
    const [results, setResults] = useState(null);
    return (
    <div className='App'>
        <QuerryBar setResults={setResults}></QuerryBar>
        <Results results={results}></Results>
    </div>
  );
}

export default App;
