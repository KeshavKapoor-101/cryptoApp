import { createContext, useEffect, useState } from "react"

// export const CoinContext=createContext();
export const CoinContext = createContext();

export const CoinContextProvider=({children})=>{

    const [allCoin,setAllCoin]=useState([]);
    const [currency,setCurrency]=useState({
        name:"usd",
        symbol:"$"
    });



    const fetchAllCoin=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-nrjrv135ZNhHuRkyDnBQkMUa'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    };

    useEffect(()=>{
        fetchAllCoin();
    },[currency])

    const contextValue={
        allCoin,currency,setCurrency
    };

    return(
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;