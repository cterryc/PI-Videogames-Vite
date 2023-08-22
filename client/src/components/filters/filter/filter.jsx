import { useEffect, useState } from 'react'
import './filter.css'
import flecha from '../../../assets/flecha-abajo2.svg'

const Filter = ({ name, filter, value }) => {
  const [selectValue, setSelectValue] = useState('')

  useEffect(() => {
    setSelectValue(value)
  }, [value])

  const handleOnChange = (e) => {
    const value = e.target.value
    setSelectValue(value)
  }
  return (
    <div className='filterContainer'>
      <select className='filter' name={name} placeholder={name} value={selectValue} onChange={handleOnChange}>
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
