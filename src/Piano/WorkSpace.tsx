import { useEffect, useMemo, useState } from "react";
import Piano from "./Piano";
import "./WorkSpace.css";
import { Subject } from "rxjs";

type Song = {
  id: number | null;
  nombre: string;
  notasMusicales: string;
};

import { type PianoNote, convertSharpToFlat } from "./songs";
import RequestSong, {
  type RequestSongSubjectProps,
} from "./Components/Promt/RequestSong";
import { useAuthStore } from "../store/auth/hooks/useAuthStore";
import { useAuth0 } from "@auth0/auth0-react";
export default function WorkSpace() {
  const subject = useMemo(() => new Subject<string>(), []);
  const songSubject = useMemo(() => new Subject<RequestSongSubjectProps>(), []);
  const [song, setSong] = useState<RequestSongSubjectProps>();
  const [songs, setSongs] = useState<Song[]>([]);

  const {user, logout: storeLogout } = useAuthStore()

  const { logout, isAuthenticated } = useAuth0()

  const onLogout = async () => {
    localStorage.setItem('auth0-redirect', 'true')

    await storeLogout();

    if(isAuthenticated) {
      await logout({})
    }
  }

  async function getSongs()
    {
      const songs : Song[] =  await fetch(`/api/song?id=${user?.id}`).then(res=>res.json())
      setSongs(songs)
    }
  useEffect(()=>{
    getSongs();
  }, [])
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
        <div className="MySongs">
          <div className="MySongs__title">
                    <h3>My Songs</h3>
          <div onClick={()=>getSongs()}>♻️</div>
          </div>
          {songs.map((item) => (
            <div className="MySongs__item" key={item.id} onClick={()=>{
              const notes : PianoNote[] = JSON.parse(item.notasMusicales);
              setSong({notes: notes, status: 'ready', name: item.nombre})
            }}>
              <div>{item.nombre}</div>
            </div>
          ))}
        </div>
      </div>
      <div id="chat">
        <div className="Container-Song">
            <h1>Crescendo IA</h1>
          
          <RequestSong subject={songSubject}></RequestSong>
          {song &&
            <div className="WorkSpace__PlaySong">
              {songs.length >1 && <div className="WorkSpace__PlaySong-title">{song.status == 'loading' ? song.status+"..." : song.name}</div>}
              <button onClick={() => song && playEstrellita(song.notes)}>
                ▶️
              </button>
            </div>
          }
            <button onClick={onLogout} style={{ 
              position: 'absolute', 
              width: '10rem', 
              top: '10px', 
              right: '10px',
              backgroundColor: '#DC2626',
            }}>
              Cerrar Sesion
            </button>
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
