import { useRef, useState, type SetStateAction } from "react"
import type { PianoNote } from "../../songs";
import type { Subject } from "rxjs";
import "./RequestSong.css";
export interface RequestSongSubjectProps {notes : PianoNote[]|null, status : 'ready'|'loading'}
export interface RequestSongPros 
{
    subject : Subject<RequestSongSubjectProps>
}
export default function RequestSong({ subject }: RequestSongPros)
{
    const [song, setSong] = useState<PianoNote[] | null>(null);
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    async function fetchSong(prompt:string) {
          try {
            subject.next({notes:[], status: 'loading'});
            const res = await fetch("/api/song", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt: prompt}),
            });
            const data: PianoNote[] = await res.json();
            setSong(data);
            console.log("xd")
             subject.next({notes:data, status: 'ready'})
             setValue('');
          } catch (error) {
            console.error("Error fetching song:", error);
          }
    }


    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(e.target.value);
        
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        fetchSong(value)
        fetch('api/song').then(res=>res.json()).then(console.log)
    }

    return <div className="Container">
        <form className="RequestSongForm" onSubmit={handleSubmit}>
            <input  className="RequestSongInput" onChange={onChangeInput} ref={inputRef} placeholder="create..." type="text" value={value}></input>
            <input className="RequestSongBtn" onClick={()=> handleSubmit} type="submit" title="Create"></input>
        </form>
    </div>
}