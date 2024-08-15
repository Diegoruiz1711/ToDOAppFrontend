import { createContext, useState } from "react";

export const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
    //useStates
    const [currentTime, setCurrentTime] = useState('')

    const contextValue = {
        currentTime,
        setCurrentTime
    };

    return (
        <ToDoContext.Provider value={contextValue}>
            {children}
        </ToDoContext.Provider>
    )
}

