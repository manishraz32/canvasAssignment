import React, {useContext} from 'react'
import { userContext } from './index';

const Child2 = ({value}) => {
    const user = useContext(userContext);
    console.log("user", user);
  return (
    <> 
       <div>----------------</div>
       <div>Child2</div>
       <div>prop drillValue: {value}</div>
       <div>{user}</div>
    </>
  )
}

export default Child2