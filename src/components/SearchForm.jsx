import '../css/searchform.css'
import { useState } from 'react'
import { useSpotifyContext } from '../SpotifyContext';
import axios from 'axios'

export default function SearchForm() {

    const [searchTerm, setSearchTerm] = useState("");
    const { updateSearchResults } = useSpotifyContext();

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    } 

    const searchTracks = async (e) => {
        e.preventDefault()
        if(searchTerm) {
          console.log("Searching for: ", searchTerm)
          const searchResults = await axios.get("https://api.spotify.com/v1/search", {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
              },
              params: {
                q: searchTerm,
                type: "track"
              }
            })
          updateSearchResults(searchResults.data.tracks.items)
        } else {
          alert('Empty search field')
        }

    }

    return (
        <form onSubmit={searchTracks}>
            <input 
            className='search-field'
            type="text" 
            placeholder="Søk"
            onChange={handleChange}
            value={searchTerm}
            />
            <button className='search-btn'>Søk</button>
        </form>
    )
}