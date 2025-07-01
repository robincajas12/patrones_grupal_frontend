import { useEffect, useMemo, useState } from "react";
import Piano from "./Piano";
import "./WorkSpace.css";
import { Subject } from "rxjs";

type Song = {
  id: number | null;
  nombre: string;
  notasMusicales: string;
};

const songs: Song[] = [
  {
    id: 1,
    nombre: "Imagine",
    notasMusicales: "C E G A B",
  },
  {
    id: 2,
    nombre: "Bohemian Rhapsody",
    notasMusicales: "A C D E F G",
  },
  {
    id: 3,
    nombre: "Shape of You",
    notasMusicales: "D F# A B C#",
  },
];
import { type PianoNote, convertSharpToFlat } from "./songs";
import RequestSong, {
  type RequestSongPros,
  type RequestSongSubjectProps,
} from "./Components/Promt/RequestSong";
import { data } from "react-router-dom";
export default function WorkSpace() {
  const subject = useMemo(() => new Subject<string>(), []);
  const songSubject = useMemo(() => new Subject<RequestSongSubjectProps>(), []);
  const [song, setSong] = useState<RequestSongSubjectProps>({
    notes: [],
    status: "ready",
  });
  useEffect(() => {
    const subscription = songSubject.subscribe(
      (res: RequestSongSubjectProps) => {
        setSong(res);
      }
    );
    return () => subscription.unsubscribe();
  }, [subject]);

  async function playEstrellita(data: PianoNote[] | null) {
    if (!data) return;
    for (const entry of convertSharpToFlat(data)) {
      for (const n of entry.notes) subject.next(n);

      await new Promise((resolve) =>
        setTimeout(resolve, (entry.duration ? entry.duration : 1) * 1000)
      );
    }
  }
  return (
    <div className="WorkSpace">
      <div id="explorer">
        <h2>explorer</h2>
        <div className="MySongs">
          <h3>My Songs</h3>
          {songs.map((item) => (
            <div>
              <div>{item.nombre}</div>
            </div>
          ))}
        </div>
        <div className="MyPromps">
          <h3>My Promts</h3>
          {songs.map((item) => (
            <div>
              <div>{item.nombre}</div>
            </div>
          ))}
        </div>
      </div>
      <div id="chat">
        <div className="Container-Song">
          <div className="Title">
            <h1>CresendoAI</h1>
          </div>
          <RequestSong subject={songSubject}></RequestSong>
          {song == null || (song.status == "loading" && "loading....")}
          {
            <div className="WorkSpace__PlaySong">
              <div className="WorkSpace__PlaySong-title">{songs[1].nombre}</div>
              <button onClick={() => song && playEstrellita(song.notes)}>
                ▶️
              </button>
            </div>
          }
        </div>
      </div>
      <div id="piano">
        <div>
          <Piano subject={subject}></Piano>
        </div>
      </div>
    </div>
  );
}
