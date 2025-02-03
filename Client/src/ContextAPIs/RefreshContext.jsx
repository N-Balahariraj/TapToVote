import React, { createContext, useState, useContext } from 'react'

const RefreshContext = createContext();

export function RefreshProvider({ children }) {
    const [refresh, triggerRefresh] = useState(false)
    return (
        <RefreshContext.Provider value={{ refresh, triggerRefresh }}>
            {children}
        </RefreshContext.Provider>
    )
}

export function useRefresh(){
    return useContext(RefreshContext)
}
