import { MouseEvent, useState } from 'react'
import Button from './components/Button/Button'

function App() {
  // Типизация значения хука
  const [counter, setCounter] = useState<number>(0);

  // Типизация Event -> Импортируем событие из React
  const addCounter = (event: MouseEvent) => {
    console.log(event.currentTarget);
    setCounter((oldCount) => oldCount + 1 );
  };

  return (
    <>
      <p>{ counter }</p>
      <Button onClick={ addCounter }>Button</Button>
    </>
  )
}

export default App
