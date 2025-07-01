import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Piano from "./Piano/Piano"
import { Subject } from 'rxjs'
import { convertSharpToFlat, type PianoNote } from './Piano/songs';
import WorkSpace from './Piano/WorkSpace';


function App() {

  return  <WorkSpace></WorkSpace>
  
}

export default App
