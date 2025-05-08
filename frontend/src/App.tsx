import { useState } from 'react'
import { Button }  from './components/Button'
import './App.css'

function App() {

  return (
    <>
      <Button variant='primary' text="share" size="md" onClick={() => alert('Button clicked')}/>
      <Button variant='secondary' text="Add Content" size='md' onClick={() => alert('Button clicked')}/>
    </>
  )
}

export default App
