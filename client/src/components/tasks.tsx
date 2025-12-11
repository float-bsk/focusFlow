import { useState, type FormEvent, useEffect, useRef } from "react";
// import { Crossmark } from "../assets/svgs/crossmark";
// import CheckIcon from "../assets/svgs/checkMark";
import CheckCompleteIcon from "../assets/svgs/check-complete";
// import PlayCircleIcon from "../assets/svgs/play-button";
// import PauseCircleIcon from "../assets/svgs/pause-button";
// import StopCircleIcon from "../assets/svgs/stop-button";

type Task = {
    id: string;
    title: string;
    completed: boolean;
    focusTime: number;
};

type Tasklist = Task[];
export default function Tasks() {
    const [task, setTask] = useState<string>("");
    const [duplicateName, setDuplicateName] = useState(false);
    const [tasklist, setTasklist] = useState<Tasklist>([]);
    const [checkedList, setCheckedList] = useState<string[]>([]);
    const [focusOn, setFocusOn] = useState(false);
    const [taskFocused, setTaskFocused] = useState<{
        id: string;
        title: string;
        completed: boolean;
        focusTime: number;
    }>();
    const [focusTimer, setfocusTimer] = useState({ minutes: 0, seconds: 0 });
    const [intervalId, setIntervalId] = useState<number>(0);
    const [errorAction, setErrorAction] = useState<string | null>("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const keys = Object.keys(localStorage);
        const data = keys.map((key) => {
            const item = localStorage.getItem(key);
            try {
                return item ? JSON.parse(item) : null;
            } catch {
                return null;
            }
        }).filter(Boolean); // removes null values
        setTasklist(data as Task[]);
    }, []);
    //show Error Dialog
    function handleOpenDialog(){
        dialogRef.current?.showModal();
    }

    function handleCloseDialog(){
        dialogRef.current?.close();
    }

    //continously update user typed input to a state variable
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const input = e.currentTarget;
        const tasktitle = input.value;
        setTask(tasktitle);
    }

    function validate(e: React.FormEvent<HTMLInputElement>) {
        const input = e.currentTarget;
        if (!input) return;
        const checkName = e.currentTarget.value.trim();
        const result = tasklist.find((t) => t.title === checkName);
        if (result) {
            input.setCustomValidity("Name already exists");
            setDuplicateName(true);
        }
        else {
            input.setCustomValidity("");
            setDuplicateName(false);
        }
    }

    // user adds a new task - store the task into task array
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if(focusOn && focusTimer.seconds !== 0){
            setErrorAction("Close the current open timer!");
            handleOpenDialog();
            return;
        }
        const listitem = task?.slice();
        const taskid = crypto.randomUUID();
        const newtask = { id: taskid, title: listitem, completed: false, focusTime: 0 };
        setTasklist([...tasklist, newtask]);
        localStorage.setItem(newtask.id, JSON.stringify(newtask));
        setTask("");
        //todo store the task into local storage
    }

    //helper function to locate position of the task in the task array
    function taskIndexLocator(taskid: string) {
        const taskarray = tasklist.slice();
        const taskIndex = taskarray.findIndex(ele => ele.id === taskid);
        return taskIndex;
    }

    // Helper function to change the task to completed
    function handleComplete(taskid: string) {
        if(focusOn && taskid !== taskFocused?.id){            
            setErrorAction(prev => {
                prev = "Stop the current focused task timer"
                return prev
            })
            handleOpenDialog();
            return;
        }
        const confirmComplete = confirm("Are you sure?");
        if (confirmComplete) {
            const resultIndex = taskIndexLocator(taskid);
            const updateTask = tasklist.slice();
            updateTask[resultIndex].completed = true;
            setTasklist(updateTask);
            localStorage.setItem(taskid, JSON.stringify(updateTask[resultIndex]));
        }
    }

    //helper function to delete a task
    function handleDeleteTask(taskid: string) {
        const result = taskIndexLocator(taskid);
        const deleteTask = tasklist.slice();
        const confirmdelete = confirm(`You are about to delete this task ${deleteTask[result].title}`);
        if (confirmdelete) {
            deleteTask.splice(result, 1);
            setTasklist(deleteTask);
            localStorage.removeItem(taskid);
        }
    }

    //todo - implement a timer of 25 minutes for a task. 
    // Display Cancel Button only. disable other tasks and all other controls.
    // at the end of timer. add time spent to focusTime and restart timer for another 25 minutes.

    const duration = 25 * 60;
    function counter() {
        setfocusTimer(prev => {
            let newminutes = prev.minutes;
            let newseconds = prev.seconds;
            newseconds++;
            if (newseconds === 60) {
                newseconds = 0;
                newminutes++;
            }
            return { minutes: newminutes, seconds: newseconds }
        });
    }

    let timer = null;

    function handleFocus(taskid: string) {
        if (intervalId) {           
            clearInterval(intervalId);
        }        
        if (focusOn) {
          return;
        }
        const focusTask = tasklist.find(task => task.id === taskid);
        const updateTaskList = tasklist.slice();
        setTaskFocused(focusTask);
        if (focusTask)
            setFocusOn(pre => !pre);
        const timeElapsed = focusTimer.minutes * 60 + focusTimer.seconds;
        if (duration === (timeElapsed - 1)) {
            clearInterval(intervalId);
            if (focusTask) {
                focusTask.focusTime += timeElapsed;
            }
            const result = taskIndexLocator(taskid);
            if (result !== -1 && focusTask) {
                updateTaskList.splice(result, 1, focusTask);
            }
            setTasklist(updateTaskList);
            localStorage.setItem(taskid, JSON.stringify(tasklist.find(task => task.id === taskid)))
        }

        //start focus timer
        if (!intervalId) {
            timer = setInterval(() =>  counter() , 1000);
            setIntervalId(timer);
        }
    }

    //Stop the task focus time and update task with time focused.
    function handleStopFocus(taskid: string) {
        const updateTaskArray = tasklist.slice();
        clearInterval(intervalId);
        setIntervalId(0);
        const timeElapsed = focusTimer.minutes * 60 + focusTimer.seconds;
        for (let index = 0; index < updateTaskArray.length; index++) {
            const thisElement = updateTaskArray[index];
            if (thisElement.id === taskid) {
                thisElement.focusTime += timeElapsed;                
            }
        }
        setfocusTimer({ minutes: 0, seconds: 0 });
        setFocusOn(false);
        setTasklist(updateTaskArray);
        setTaskFocused({
            id: "",
            title: "",
            completed: false,
            focusTime: 0
        });
        localStorage.setItem(taskid, JSON.stringify(tasklist.find(task => task.id === taskid)))

    }

    function handleSelectedTasks(taskid: string) {
        const updateCheckedList = checkedList.slice();
        if (updateCheckedList.includes(taskid)) {
            return setCheckedList(updateCheckedList.filter(item => item !== taskid));
        }
        else {
            return setCheckedList([...updateCheckedList, taskid]);
        }
    }

    function handleBatchDelete() {
        const deleteTaskIndices = checkedList.slice();
        const updateTasks = tasklist.slice();
        const result = updateTasks.filter(task => !deleteTaskIndices.includes(task.id));
        setTasklist(result);
        for (const ele of deleteTaskIndices) {
            localStorage.removeItem(ele);
        }
        setCheckedList([]);
    }

    function handleBatchComplete() {
        const deleteTaskIndices = checkedList.slice();
        const updateTaskArray = tasklist.slice();
        const result = updateTaskArray.map(task => deleteTaskIndices.includes(task.id) ?
            //can be written as ... ? {...task, completed:true} : task  ...
            { id: task.id, title: task.title, completed: true, focusTime: task.focusTime } : task);
        setTasklist(result);
        for (const ele of result) {
            localStorage.setItem(ele.id, JSON.stringify(ele));
        }
    }

    return (
        <>
            {/* Render Create Task Component */}
            <div >
                <form
                    onSubmit={handleSubmit}
                >
                    <input
                        id="task"
                        name="task"
                        type="text"
                        value={task}
                        onChange={handleChange}
                        onInvalid={validate}
                        onInput={validate}
                        required
                        placeholder="Task title"
                        className={`
                            bg-gray-200 m-2 p-2 
                            ${duplicateName ? "outline-red-500" : "focus-within:outline-blue-500"}                            
                            `}
                    />
                    <button
                        type="submit"
                    >
                        Create Task
                    </button>
                </form>
            </div>
            {/* Render Task List */}
            <div className="">
                {
                    tasklist.length > 0 ?
                        <p >Tasks for Today:</p> :
                        <p >No Tasks:</p>
                }

                <ul className="grid grid-cols-1 space-y-4" >
                    {
                        tasklist?.map((task) =>
                            task.completed ?
                                <li key={task.id} className="flex gap-2 items-baseline">
                                    <span className="text-xl font-semibold text-gray-900">{task.title}</span>
                                    <span>Time to complete: {task.focusTime}</span>
                                    <CheckCompleteIcon width={32} height={32} />
                                    <button onClick={() => handleDeleteTask(task.id)}>Remove</button>

                                </li>
                                :
                                // Tast List
                                <li key={task.id} className="flex gap-2 items-baseline">
                                    <span className="font-semibold text-gray-900"> {task.title} </span>
                                    <span>{"|"}</span>
                                    <span>Time Focused : {task.focusTime}</span>
                                    {/* Task title */}
                                    {/* Task Controls panel */}
                                    <div className="flex flex-wrap gap-2 items-baseline">
                                        {/* Focus Timer Button */}
                                        {/* <div>
                                            {
                                                focusOn && taskFocused?.id === task.id ?
                                                <div>
                                                    <p>You are focusing on this task {focusTimer.minutes}:{focusTimer.seconds}</p>
                                                    <MediaControls onStop={() => handleStopFocus(task.id)} />
                                                </div>
                                                    :
                                                    <button
                                                        onClick={() => handleFocus(task.id)}
                                                    >
                                                        <span >Focus</span>
                                                    </button>
                                            }
                                        </div> */}
                                        {/* Select Task using checkbox */}
                                        {
                                            focusOn && taskFocused?.id === task.id ?
                                                <>
                                                    <p>You are focusing on this task {focusTimer.minutes}:{focusTimer.seconds}</p>
                                                    <MediaControls onStop={() => handleStopFocus(task.id)} />
                                                </>
                                                :
                                                <>
                                                    <input type="checkbox" id={`check+${task.id}`}
                                                        name="check"
                                                        style={{ appearance: "textfield" }}
                                                        checked={checkedList.includes(task.id)}
                                                        onChange={() => handleSelectedTasks(task.id)}
                                                        className=""
                                                        disabled={focusOn}
                                                    />
                                                    <button
                                                        onClick={() => handleFocus(task.id)}
                                                    >
                                                        <span >Focus</span>
                                                    </button>

                                                    {/* Delete Task */}
                                                    <button
                                                    disabled={focusOn}
                                                        onClick={() =>
                                                            handleDeleteTask(task.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                    {/* Complete Task */}
                                                    <button
                                                    
                                                        onClick={() => handleComplete(task.id)}
                                                    >Done</button>
                                                </>
                                            // Focus task button controls
                                        }
                                    </div>
                                </li>
                        )
                    }
                </ul>
                {
                    // Render a floating style component which allows to complete and delete tasks to delete multiple tasks at a time
                    checkedList.length > 0 ?
                        <div>
                            <p >Selected Tasks: {checkedList.length}</p>
                            <div >
                                <button
                                    // onClick={todo}
                                    onClick={() => setCheckedList([])}
                                >Close</button>
                                <button
                                    // onClick={todo}
                                    onClick={handleBatchComplete}
                                >Done</button>
                                <button
                                    // onClick={todo}
                                    onClick={handleBatchDelete}
                                >Remove</button>
                            </div>
                        </div> : ""
                }
            </div>
            {/* Error Message */}
            <dialog ref={dialogRef} className="bg-gray-100 w-64 z-50 gap-8 p-8 absolute top-1/2 left-1/2 right-1/2 transform -translate-x-1/2" >
                <p>{errorAction}</p>
                <button onClick={handleCloseDialog}>Ok</button>
            </dialog>
        </>
    )
}

const MediaControls = ({ onStop }: {
    onStop: () => void
}) => {
    return <>
        <div>
            {/* <PlayCircleIcon className="w-8 h-8" />
            <PauseCircleIcon className="w-8 h-8" /> */}
            <button onClick={onStop} className="bg-rose-700 text-white hover:bg-rose-900">
               <span>Stop</span>
            </button>
        </div>
    </>
}