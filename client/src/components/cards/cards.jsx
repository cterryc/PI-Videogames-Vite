import Card from './card/card'
import './cards.css'

const Cards = ({ games, name }) => {
  // console.log(games)
  if (typeof games === 'string') {
    return (
      <div className='warningSearch'>
        <h1 className='warningH1'>Error Server</h1>
      </div>
    )
  } else if (!games.length) {
    return (
      <div className='warningSearch'>
        <h1 className='warningH1'>"Game with the name '{name}' not found."</h1>
      </div>
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
