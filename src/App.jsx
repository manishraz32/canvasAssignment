import {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import Child from './Child';
import useCounter from './useCounter';

let val = 1;


const ExpensiveCalculation = (num) => {
  console.log("Calculating...");
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num;
  }
  return result;
};

const App = () => {

  const [value, setValue] = useState(null);
  const {currentValue, incrementCounter, decrementCounter} = useCounter(100) || {};
  console.log('counter', currentValue)
  const [age, setAge] = useState(10);

  let dob = 0;

  // useEffect: hooks which call run after browser rendering 
    // useEffect(() => {
  //    // Get the current year and subtract the age
  //   dob = new Date().getFullYear() - parseInt(age);
  //   console.log("dob", dob);

  // }, [age])

  

  // use callback hook: memoized function 

// let sum = () => {
//   let num = 1000;
//   let ans = 0;
//   for(let i = 0; i < num; i++) {
//     ans = ans + i;
//   }

//   return ans;
// }

const sum = useCallback(() => {
  let num = 1000;
  let ans = 0;
  for (let i = 0; i < num; i++) {
    ans = ans + i;
  }
  return ans;
}, []); 
 


// useMemo: memoized value
// const calculatedValue =  ExpensiveCalculation(1000);

  // Use useMemo to memoize the calculated value
  const calculatedValue = useMemo(() => {
    return ExpensiveCalculation(1000);
  }, [1000]); // Only re-compute when inputValue changes


 // useRef() // change the value without rendering

 const inputRef = useRef(null);
 console.log("inputRef", inputRef);
 
 useEffect(() => {
  // Focus the input element on component mount
  console.log("useEffectInputRef", inputRef);
  console.log("inpuRef", inputRef.current.value);
  inputRef.current.focus();
}, []);


console.log("parent render")

  return (
    <> 
      <input ref={inputRef} />
     <div>Parent</div>
     <div>value: {value}</div>
     <button onClick={() => setValue(value + 1)}>increment</button>

     <div>---------------------</div>
     <div>{currentValue}</div>
     <button onClick={incrementCounter}>increment</button>
     <button onClick={decrementCounter}>decrement</button>
     <Child 
      // value={value}
      fn = {sum}
      newVal = {calculatedValue}
     />      
    </>
  )
}

export default App