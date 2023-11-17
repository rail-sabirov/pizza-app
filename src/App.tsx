import { MouseEvent, useRef, useState } from 'react'
import Button from './components/Button/Button'
import Input from './components/Input/Input';
import { Routes, Route } from 'react-router-dom';
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';

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
      <p>{ counter }</p>
      <Button onClick={ addCounter }>Button</Button>
      <Button size="big">Big Button</Button>
      <Input placeholder='test'/>

      <div>
        <a href="/">Menu</a> | <a href="/cart">Cart</a>
      </div>

      <Routes>
        <Route path='/' element={ <Menu /> } />
        <Route path='/cart' element={ <Cart /> } />
        <Route path='*' element={ <Error /> } />
      </Routes>
    </>
  )
}

export default App
