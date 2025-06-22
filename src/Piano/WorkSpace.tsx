import { useEffect, useMemo, useState } from "react";
import Piano from "./Piano";
import "./WorkSpace.css";
import { Subject } from "rxjs";
import { type PianoNote, convertSharpToFlat } from "./songs";
export default function WorkSpace()
{
    const subject = useMemo(() => new Subject<string>(), []);
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



  async function playEstrellita(data : PianoNote[]) {
    for (const entry of convertSharpToFlat(data)) {
        for (const n of entry.notes) subject.next(n);
      
      await new Promise(resolve => setTimeout(resolve, (entry.duration ? entry.duration : 1) * 1000));
    }
  }
    return <div className="WorkSpace">
        <div id="explorer">
            <div>explorer</div>
        </div>
        <div id="chat">
            <button onClick={()=>song && playEstrellita(song)}>play</button>
            
        </div>
        <div id="piano">
            <div><Piano subject={subject}></Piano></div>
        </div>
    </div>
}