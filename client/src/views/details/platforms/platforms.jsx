import Android from '../../../assets/android'
import Apple from '../../../assets/apple'
import Atari from '../../../assets/atari'
import Linux from '../../../assets/linux'
import Nintendo from '../../../assets/nintendo'
import Sega from '../../../assets/sega'
import Sony from '../../../assets/sony'
import Windows from '../../../assets/windows'
import Xbox from '../../../assets/xbox'

const Platforms = (props) => {
  const genres = {
    android: <Android />,
    apple: <Apple />,
    atari: <Atari />,
    linux: <Linux />,
    nintendo: <Nintendo />,
    sega: <Sega />,
    playstation: <Sony />,
    pc: <Windows />,
    xbox: <Xbox />,
    mac: <Apple />
  }
  return (
    <>
      {
        props.platforms?.map(ele => {
          return (
            <div key={ele.platform.id} className='iconosDetails'>
              {genres[ele.platform.slug]}
            </div>
          )
        })
      }
    </>
  )
}

export default Platforms
