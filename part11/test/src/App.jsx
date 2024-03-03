import { useState } from 'react'


function App() {
  const [value, setValue] = useState(0)

  const setToValue = (newValue) => () => setValue(newValue)

  return (
    <>
      {value}
      <button onClick={setToValue(1000)}>set to 1000</button>
      <button onClick={setToValue(100)}>set to 100</button>
      <button onClick={setToValue(10)}>set to 10</button>
      <button onClick={setToValue(1)}>set to 1</button>
      <button onClick={setToValue(value+1)}>increase</button>


    </>
  )
}

export default App
