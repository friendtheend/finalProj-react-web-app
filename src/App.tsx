import React from "react";
import "./App.css";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import store from "./Kanbas/store";
import { Provider } from "react-redux";
import { HashRouter, Link, Route, Routes ,Navigate} from "react-router-dom";

// landing page
function App() {
  return (
      <HashRouter>
        <Provider store={store}>
        <div>
          <Routes>
            {/* switch case statement */}
            <Route path="/" element={<Navigate to="/Kanbas" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
          </Routes>
        </div>
        </Provider>
      </HashRouter>
  );
}

export default App;
