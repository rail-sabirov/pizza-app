import { MouseEvent, useRef, useState } from 'react'
import Button from './components/Button/Button'
import Input from './components/Input/Input';

function App() {
  // Типизация значения хука
  const [counter, setCounter] = useState<number>(0);

  // Типизация Event -> Импортируем событие из React
  const addCounter = (event: MouseEvent) => {
    console.log(event.currentTarget);
    setCounter((oldCount) => oldCount + 1 );
  };

  const inputRef = useRef();

  return (
    <>
    </>
  )
}

export default App
