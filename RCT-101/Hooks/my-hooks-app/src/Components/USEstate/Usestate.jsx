import React from 'react'
import { useState } from 'react'
const Usestate = () => {
    const [count , setCount] = useState(0);
    // const handleCount = (val) => {
    //     setCount(count + val);
    //     console.log(count + val)
    // }
  return (
    <div>
      <button onClick={() =>setCount(count + 1)}>+</button>
      <h1>{count}</h1>
      <button onClick={() =>setCount(count - 1)}>-</button>
    </div>
  )
}

export default Usestate
