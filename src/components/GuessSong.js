import React, {useState} from 'react'

const GuessSong = (props) => {

    const [guess, setGuess] = useState("")
    
    return(
        <div>
            <h2>In the guessSong component</h2>
            <input
                id="song-guess"
                className="form-field"
                type="text"
                name="Song Guess"
                value={guess}
                onChange={e => setGuess(e.target.value)}
            />
        </div>
    )
}

// onChange={(e) => handleGuessChange(e.currentTarget.value)}

export default GuessSong