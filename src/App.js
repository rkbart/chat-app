import { useState } from "react";
// import Login from "./components/Auth/Login/Login.jsx";
import Main from "./components/Main/Main.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
   

    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}>
            {/* <Route index element={</>}></Route> */}
            {/* <Route path="" element={</>}></Route> */}
            {/* <Route path='*' element={<NotFound />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      // <div className="App">
        // {/* <Login></Login> */}
        // <Main />

      // </div>
        
    );
}

export default App;
