import React, {useState} from 'react'

const GuessSong = (props) => {

    const [guess, setGuess] = useState("")
    const songTitle = "Yesterday"

    const handleGuess = () => {
        console.log("Guess attempt")
        if(guess === songTitle){
            alert('Correct!')
        }else{
            console.log('Incorrect guess')
        }
    } 

    return(
        <div>
            <h2>In the guessSong component</h2>
            <div>
                <input
                    id="song-guess"
                    className="form-field"
                    type="text"
                    name="Song Guess"
                    value={guess}
                    onChange={e => setGuess(e.target.value)}
                />
            </div>
            <div>
                <button
                    id="song-guess-submit"
                    className="submit-button"
                    type="submit"
                    value="Hello!"
                    onClick={e => handleGuess() }
                >
                    Guess   
                </button>   
            </div>     
        </div>
    )
}

// onChange={(e) => handleGuessChange(e.currentTarget.value)}

export default GuessSong