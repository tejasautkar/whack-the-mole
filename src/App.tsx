import { useEffect, useState } from 'react'
import './App.css'
import pile from './assets/pile.svg'
import mole from './assets/mole.png'

function App() {
  const [shouldReset, setShouldReset] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [grid, setGrid] = useState(new Array(8).fill(1));
  const [moleIndex, setMoleIndex] = useState<number | null>(null);
  const [timer, setTimer] = useState<number | undefined>(undefined);
  

  const handleReset = () => {
    setScore(0)
    setShouldReset(false);
    setMoleIndex(null);
    clearInterval(timer)
    setTimer(undefined)
  }
  const handleMoleClick = () => {
    setScore(score + 1)
  }

  useEffect(() => {
    if (score > highScore) {
      localStorage.setItem('highscore', `${score}`);
      setHighScore(score)
    }
  }, [score])

  useEffect(()=> {
    const localHighScore = localStorage.getItem('highscore');
    setHighScore(localHighScore ? Number(localHighScore) : 0);
  }, [])
  
  const handlePlay = () => {
    setShouldReset(true)
    clearInterval(timer);
    const tmr = setInterval(() => {
      let newIndex = Math.floor(Math.random() * 7);
      while (newIndex === moleIndex) {
        newIndex = Math.floor(Math.random() * 7);
      }
      setMoleIndex(newIndex); 
    }, 1000);
    setTimer(tmr)
  }

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);




  return (

    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      flexDirection: 'column',
    }}>
      <header style={{ display: 'flex', width: '100%', flexDirection: 'row', height: '3em' }}>

        <div style={{

fontWeight: 'bold',
fontSize: '20px'

}}>
          Whack the Mole!
        </div>
        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          gap: '2em',
          alignItems: 'center'
        }}>
          <div>
            {shouldReset ? <button
              onClick={handleReset}

              style={{
                backgroundColor: 'red',
              }}>Reset</button> :
              <button onClick={handlePlay} style={{
                backgroundColor: 'green',

              }}>Play</button>
            }
          </div>
          <div> Score {score}</div>
          <div> Highest Score {highScore}</div>
        </div>
      </header>
      <div className="grid-container" style={{ marginTop: '5em' }}>
        {grid.map((el, ind) => {
          return (
            <div key={ind} className="grid-item">
              <div style={{ position: 'relative' }}>
                <div className='image-container'>
                  <img
                    src={pile}
                    className="pile-image"
                    style={{ position: 'relative', zIndex: 2}}
                  />
                  {moleIndex === ind ?
                    <img
                      onClick={handleMoleClick}
                      className="mole-image"
                      width={'35%'}
                      src={mole}
                      style={{ position: 'absolute', top: 0, left: 70, zIndex: 1, cursor: 'pointer' }}
                    />
                    : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>



    </div>

  )
}

export default App
