import React, {useState, useEffect} from 'react'
import InterestContext from './InterestContext';
import { getMyInterests } from '../../utils/api'

const InterestContextProvider = ({children}) => {
    const [myInterests, setMyInterests]= useState({});
    
    const getInterests = async() => {
        const interests = await getMyInterests();
        const map = {};
        for(let interest of interests) {
            map[interest.interest] = true;
        }
        setMyInterests(map);
    }
    
    useEffect(() => {
        getInterests();
    }, [])

    const state = {
        myInterests,
        setMyInterests
      };
    
      return <InterestContext.Provider value={state}>{children}</InterestContext.Provider>;
}

export default InterestContextProvider