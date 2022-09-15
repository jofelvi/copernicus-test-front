import React from 'react';
import './App.css';
import RoutesRoot from "./routes/routes";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

function App() {
  return (
    <div className="App">
      <RoutesRoot/>
    </div>
  );
}

export default App;
