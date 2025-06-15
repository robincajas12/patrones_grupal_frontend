import type { Subject } from "rxjs";
import songs from "./songs";
import PianoKey from "./Components/PianoKeyC";
import "../Piano.css";
export default function Piano({subject}:{subject: Subject<string>})
{
    return songs.map((song) => {
            return <PianoKey key={song.note} subject={subject} song={song.url} note={song.note} />;
    })
}