import { useState } from "react";
import Login from "./Pages/Login/Login.jsx";
import Main from "./Pages/Main/Main.jsx";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DataProvider from "./context/DataProvider.jsx";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" 
                 element={<Login 
                            onLogin={handleLogin}/>}/> 
          <Route path="/main" 
                 element={<Main/>}/> 
          <Route
            path="/main"
            element={
              isAuthenticated ? (
                <Main onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
                ) 
              } 
            />
            {/* <Route index element={</>}></Route> */}
            {/* <Route path="" element={</>}></Route> */}
            {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
