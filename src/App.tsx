import { useMemo } from 'react'
import './App.css'
import Piano from "./Piano/Piano"
import { Subject } from 'rxjs'
import { convertSharpToFlat, type PianoNote } from './Piano/songs';


function App() {
  const subject = useMemo(() => new Subject<string>(), []);
  const song: PianoNote[] = [
  // Intro - Atmosphere
  { note: ["C4", "E4", "G4"], duration: 1.5 },
  { note: ["D4", "F4", "A4"], duration: 1 },
  { note: ["E4", "G4", "B4"], duration: 1 },

  // Main motif
  { note: ["G4"], duration: 0.5 },
  { note: ["F4"], duration: 0.5 },
  { note: ["E4"], duration: 0.75 },
  { note: ["D4"], duration: 0.75 },
  { note: ["C4"], duration: 1.5 },

  // Harmony chords
  { note: ["F4", "A4", "C5"], duration: 1 },
  { note: ["E4", "G4", "B4"], duration: 1 },
  { note: ["D4", "F4", "A4"], duration: 1 },

  // Closing phrase
  { note: ["C4", "E4", "G4"], duration: 2 },
];

  async function playEstrellita() {
    for (const entry of convertSharpToFlat(song)) {
        for (const n of entry.note) subject.next(n);
      
      await new Promise(resolve => setTimeout(resolve, entry.duration * 1000));
    }
  }

  return (
    <div onClick={() => subject.next("")} className="App">
      <div className='btn' onClick={playEstrellita}>play</div>
      <div className='PianoContainer'>
        <Piano subject={subject}></Piano>
      </div>
    </div>
  );
}

export default App
