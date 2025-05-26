import { Button }  from './components/Button'
import { PlusIcon } from './icons/PlusIcon'
import './App.css'

function App() {

  return (
    <>
      <Button variant='primary' text="share" size="md" onClick={() => alert('Button clicked')}/>
      <Button startIcon={<PlusIcon />} variant='secondary' text="Add Content" size='md' onClick={() => alert('Button clicked')}/>
    </>
  )
}

export default App
