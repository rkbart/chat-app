import { useState, createContext, useContext } from "react";

const DataContext = createContext();

const DataProvider = ({children}) => {
    const [ userHeaders, setUserHeaders ] = useState('')
    
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const handleHeaders = (header) => {
        const updatedHeader = {
            'access-token': header['access-token'],
            uid: header.uid,
            expiry: header.expiry,
            client: header.client,
        }
        setUserHeaders(updatedHeader)
    }
    
    return (
        <DataContext.Provider value={
            {
                handleHeaders,
                userHeaders,
                emailRegEx,
               
            }
        }>
           {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    return useContext(DataContext);
}

export default DataProvider;
