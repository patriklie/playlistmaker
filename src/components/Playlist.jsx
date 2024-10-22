import '../css/playlist.css'
import { useSpotifyContext } from '../SpotifyContext';
import axios from 'axios';
import { useState } from 'react';

export default function Playlist() {
    const { playlist, setPlaylist, removeFromPlaylist } = useSpotifyContext();
    const [playlistName, setPlaylistName] = useState("");

  

const createPlaylist = async (e) => {
    e.preventDefault()
    const sanger = playlist.map(song => song.uri)
    console.log("Uris: ", sanger)

    let playlistId;

    // henter Spotify ID
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
    })
    const spotifyId = data.id
    console.log("Spotify ID: ", spotifyId)
    console.log('Playlist name: ', playlistName)

    // oppretter Spotify Playlist
    try {
    const playlist = await axios.post(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
        name: playlistName,
        description: 'New playlist description',
        public: false
        },
        {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
            }
        }
    )

    playlistId = playlist.data.id
    console.log("Playlist ID er: ", playlist.data.id)

    } catch (e) {
        console.log("Opprette playlist error: ", e)
    }


    // legger til tracks i playlisten over
        try {
            const addTracks = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                uris: sanger,
                position: 0
            },
            {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
                }
            })
        } catch (e) {
            console.log("Legge til tracks error: ", e)
        }
        setPlaylist([]);
        setPlaylistName("");
}

    return (
        <div className='playlist-container'>
            <h2>Playlist</h2>
            
            { playlist.length ? playlist.map((e, i) => {
                return (
                    <div className='playlist-track-container' key={i}>
                        <div>
                            <p className="artist-title">{e.name}</p>
                            <p className="artist-name">{e.artists[0].name}</p>
                        </div>
                        {/* <button onClick={() => removeFromPlaylist(i)}>Remove</button> */}
                        <span onClick={() => removeFromPlaylist(i)} class="material-symbols-outlined remove-icon">cancel</span>
                    </div>
                )
            }) : <p className="box-text">Legg til sanger!</p>
        }
        { playlist.length > 0 && 
        <form>
            <input className='search-field-save' onChange={(e) => setPlaylistName(e.target.value)} value={playlistName} type="text" placeholder="Playlist Name" />
            <button onClick={createPlaylist} className="save-btn">Save Playlist To Spotify</button>
        </form> 
        }
        </div>
    )
}