import React, {useState} from 'react'

const useCounter = (value) => {
    const [currentValue, setCurrentValue] = useState(value);

    const incrementCounter = () => {
        setCurrentValue(currentValue + 1);
    }

    const decrementCounter = () => {
        setCurrentValue(currentValue - 1);
    }

    return {currentValue , incrementCounter, decrementCounter}
}

export default useCounter