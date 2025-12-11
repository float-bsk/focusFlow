
const focusTimer =(m:number, s:number)=>{
   let seconds = s, minutes=m;
    seconds++;
    if(seconds == 60){
        seconds=0;
        minutes++;
    }
    return {seconds:seconds, minutes:minutes}
}

export default focusTimer;