// Student: Keying GUO

import { Route, Routes, Navigate } from "react-router";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import { Http2ServerRequest } from "http2";
import TOC from "./TOC";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import store from "./store";
import { Provider } from "react-redux";

export default function Labs(){
    return (
        // The Provider component that makes the state data in the store available
        //  to all components within the Provider's Body
        <Provider store={store}>
        <div className="container">
            <h1>Welcome to Keying Guo's Web Dev (SEC 02)</h1>
            <h1>Labs</h1>
            <TOC/>
            <Routes>
                <Route path="Lab1" element={<Lab1 />} />
                <Route path="Lab2" element={<Lab2 />} />
                <Route path="Lab3/*" element={<Lab3 />} />
                <Route path="Lab4/*" element={<Lab4 />} />
                <Route path="Lab5/*" element={<Lab5 />} />
            </Routes>
        </div>
        </Provider>
    );
}