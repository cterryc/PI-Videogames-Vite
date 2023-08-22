import Card from './card/card'
import './cards.css'

const Cards = ({ games }) => {
  // console.log(games)
  if (typeof games === 'string') {
    return (
      <div>Error Server</div>
    )
  } else {
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
}

export default Cards
