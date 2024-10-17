import React, {useEffect, useState} from 'react'

const Child = ({fn, newVal}) => {
 const [value, setValue] = useState(0);
 useEffect(() => {
    if(typeof fn === 'function') {
      setValue(fn());
    }
 }, [fn])
 console.log("child rendered");
  return (
    <>
        <div>Child component</div>
        <div>{value}</div>
        <div>newVal: {newVal}</div>
    </>
  )
}

export default React.memo(Child);