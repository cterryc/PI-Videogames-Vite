import Card from './card/card'
import './cards.css'

const Cards = ({ games }) => {
  // console.log(games)
  return (
    <div className='ContainerCards'>
      <div className='cards'>
        {
          games?.map((game, index) => {
            return (
              <Card key={game.id} game={game} />
            )
          })
          // console.log(games)
        }
      </div>
    </div>
  )
}

export default Cards
