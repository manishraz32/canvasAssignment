import React from 'react'
import Child2 from './Child2'

const Child1 = ({value}) => {
  return (
   <>
      <div>-----------------</div>
      <div>Child1</div>
      <Child2 value = {value}/>
   </>
  )
}

export default Child1