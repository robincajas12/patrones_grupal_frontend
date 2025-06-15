import { useEffect, useState, type JSX } from "react";
import type { Observable, Subject } from "rxjs";
let i = 0;
export default function PianoKey({subject, song, note} : {subject : Subject<string>, song: string, note:string}) : JSX.Element
{
    i++;
    const isB = note.includes("b");
    const [pressed, setPressed] = useState<boolean>(false);
    const [color, setColor] = useState(()=>{
        return "white";
    });
    useEffect(() => {
        console.log("PianoKeyC mounted");
        const subscription = subject.subscribe((value: string) => {
        if(value === note)
        {
            const audio = new Audio(song);
            setColor("#111");
            
            audio.play()
            setPressed(true);
            setTimeout(() => {
                console.log("PianoKeyC setColor to white");
                setColor("white");
                setPressed(false);
            }, 100);
            }
        }
    );
        return () => subscription.unsubscribe();
    }, [subject]);
return (
  <div
    className={`PianoKey ${isB ? 'black' : 'white'}`}
     style={{
    ...(pressed && { backgroundColor: color })
    }}    onClick={() => new Audio(song).play()}
  >{note.replace("b", "#")}</div>
);

    
}