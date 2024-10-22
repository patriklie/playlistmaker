import React, { createContext, useContext, useState} from 'react';

const SpotifyContext = createContext();

export const useSpotifyContext = () => {
    return useContext(SpotifyContext);
}


export const SpotifyProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);

    const updateSearchResults = (results) => {
        setSearchResults(results);
    }

    const pushToPlaylist = (track) => {
        setPlaylist((oldPlaylist) => {
            return [...oldPlaylist, track]
        })
    }

    const removeFromPlaylist = (index) => {
        setPlaylist((oldPlaylist) => {
            return oldPlaylist.filter((e, i) => {
                return i !== index
            })
        })
    }

    return (
        <SpotifyContext.Provider value={{ searchResults, updateSearchResults, pushToPlaylist, playlist, removeFromPlaylist, setPlaylist }}>
            { children }
        </SpotifyContext.Provider>
    )
}