import '../css/result.css'
import { useSpotifyContext } from '../SpotifyContext';

export default function Result() {
    const { searchResults, pushToPlaylist } = useSpotifyContext();
    


    return (
        <div className="result-container">
          <h2>Results</h2>
          {searchResults.length ? (
            searchResults.map((e, i) => (
              (
              <div className="track-container" key={i}>
                <div className="artist-container">
                  <p className="artist-title">{e.name}</p>
                  <p className="artist-name">{e.artists[0].name}</p>
                </div>
                <span onClick={() => pushToPlaylist(e)} class="material-symbols-outlined add-icon">add</span>
              </div>
              )
            ))
          ) : (
            <p className="box-text">Søk over for å finne sanger!</p>
          )}
          
        </div>
      );
      
}