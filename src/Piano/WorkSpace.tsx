import { useEffect, useMemo, useState } from "react";
import Piano from "./Piano";
import "./WorkSpace.css";
import { Subject } from "rxjs";
import { type PianoNote, convertSharpToFlat } from "./songs";
import RequestSong, { type RequestSongPros, type RequestSongSubjectProps } from "./Components/Promt/RequestSong";
import { data } from "react-router-dom";
export default function WorkSpace()
{
    const subject = useMemo(() => new Subject<string>(), []);
    const songSubject = useMemo(()=> new Subject<RequestSongSubjectProps>(), [])
    const [song, setSong] = useState<RequestSongSubjectProps>({notes: [], status: 'ready'});
    useEffect(()=>{
        const subscription = songSubject.subscribe((res: RequestSongSubjectProps )=>{
          setSong(res);
       })
       return ()=> subscription.unsubscribe();
    }, [subject])

  async function playEstrellita(data : PianoNote[] | null) {
    if(!data) return;
    for (const entry of convertSharpToFlat(data)) {
        for (const n of entry.notes) subject.next(n);
      
      await new Promise(resolve => setTimeout(resolve, (entry.duration ? entry.duration : 1) * 1000));
    }
  }
    return <div className="WorkSpace">
        <div id="explorer">
            <div>
              <div>Saved Songs</div>
              <div></div>
            </div>
        </div>
        <div id="chat">
            <RequestSong subject={songSubject}></RequestSong>
            {song == null || song.status == 'loading' ? "loading...." : <button onClick={()=>song && playEstrellita(song.notes)}>play</button>}
        </div>
        <div id="piano">
            <div><Piano subject={subject}></Piano></div>
        </div>
    </div>
}