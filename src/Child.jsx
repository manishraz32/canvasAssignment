import React, {useEffect, useState, useContext} from 'react'
import Child1 from './Child1';
import { userContext } from './index';

const Child = ({fn, newVal}) => {
  const user = useContext(userContext);
  console.log("user", user);
//  const [value, setValue] = useState(0);
//  useEffect(() => {
//     if(typeof fn === 'function') {
//       setValue(fn());
//     }
//  }, [fn])

 console.log("child rendered");
  return (
    <>
        <div>Child component</div>
        {/* <div>{value}</div> */}
        <div>newVal: {newVal}</div>
        <div>user: {user}</div>
        <Child1 value={newVal} />
        
    </>
  )
}

export default React.memo(Child);