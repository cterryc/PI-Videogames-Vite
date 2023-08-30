import './filter.css'
import flecha from '../../../assets/flecha-abajo2.svg'

const Filter = ({ name, filter }) => {
  return (
    <div className='filterContainer'>
      <select className='filter' name={name} id={name}>
        {/* <option value='all'>All</option>
        <option value='active'>Active</option>
        <option value='completed'>Completed</option> */}
        {filter?.map((ele, index) => {
          const infoEle = ele.name ? ele.name : ele
          return (
            <option key={index} value={infoEle}>{infoEle}</option>
          )
        })}
      </select>
      <div className='filterArrow'>
        {/* <FlechaAbajo /> */}
        <img src={flecha} alt='flecha' />
      </div>
    </div>
  )
}

export default Filter
