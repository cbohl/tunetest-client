import React, {useState} from 'react'

const GuessSong = (props) => {

    const [guess, setGuess] = useState("test")

    return(
        <div>
            <h2>In the guessSong component</h2>
            <input
                id="song-guess"
                class="form-field"
                type="text"
                name="Song Guess"
                value={guess}
            />
        </div>
    )
}

export default GuessSong