'use client'
import { onSubmit } from '@/utils/timer';
import { useEffect, useState } from 'react';

type myData = {
    params: {
        id: number,
        name: string,
        timespent: number, 
    }
}

export default function Timer({params}: myData) {
    const [timer, setTimer] = useState(false);
    const [timeSpent, setTimeSpent] = useState(params.timespent);
    
    let hours = Math.floor(timeSpent / 3600);
    let minutes = Math.floor(timeSpent / 60) % 60;
    let seconds = timeSpent % 60;
    
    function startTimer() {
        console.log('timer started');
        setTimer(true);
    }

    function stopTimer() {
        console.log('timer stopped');
        setTimer(false);
    }
    
    useEffect(()=> {
        let interval = null;
        if (timer) {
            interval = setInterval(()=> {
                setTimeSpent((prevTime) => prevTime + 1);
                console.log(timeSpent);
                
            }, 1000);
        }
        
        return () => clearInterval(interval!);
    }, [timer, timeSpent]);

  return (
    <div>
        <form action={onSubmit}>
            <div className="flex items-center justify-center p-2 text-lg bg-slate-700 text-white rounded tracking-wider"><b>{hours} h, {minutes} min, {seconds} sec</b></div>
            <input name="timeData" value={timeSpent} type="hidden" />
            <input name="nameData" value={params.name} type="hidden" />
            <input name="idData" value={params.id} type="hidden" />

            <div className="flex items-center justify-center gap-2">
                <button type='button' onClick={startTimer} name="start" className="w-20 border-2 bg-slate-700 border-slate-400 rounded">Start</button>
                <button type='submit' value='Submit' onClick={stopTimer} name="stop" className="w-20 border-2 bg-slate-700 border-slate-400 rounded">Pause</button>
            </div>  
        </form>
    </div>
  )
}
