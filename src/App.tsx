import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Piano from "./Piano/Piano"
import { Subject } from 'rxjs'
import { convertSharpToFlat, type PianoNote } from './Piano/songs';
import WorkSpace from './Piano/WorkSpace';


function App() {
 /* const subject = useMemo(() => new Subject<string>(), []);
    const [song, setSong] = useState<PianoNote[] | null>(null);

  useEffect(() => {
    async function fetchSong() {
      try {
        const res = await fetch("/api/create/song", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "beethoven song" }),
        });
        const data: PianoNote[] = await res.json();
        setSong(data);
      } catch (error) {
        console.error("Error fetching song:", error);
      }
    }

    fetchSong();
  }, []); 

  if (!song) {
    return <div>Cargando canción...</div>;
  }


  async function playEstrellita(data : PianoNote[]) {
    for (const entry of convertSharpToFlat(data)) {
        for (const n of entry.notes) subject.next(n);
      
      await new Promise(resolve => setTimeout(resolve, (entry.duration ? entry.duration : 1) * 1000));
    }
  }
  return (
    <div onClick={() => subject.next("")} className="App">
      <div className='btn' onClick={()=>playEstrellita(song)}>play</div>
      <div className='PianoContainer'>
        <Piano subject={subject}></Piano>
      </div>
    </div>
  );*/
  return  <WorkSpace></WorkSpace>
  
}

export default App
