import { useState, type FormEvent } from "react";
import { Crossmark } from "../assets/svgs/crossmark";
import CheckIcon from "../assets/svgs/checkMark";
import CheckCompleteIcon from "../assets/svgs/check-complete";

export default function Tasks() {

    const [task, setTask] = useState<string>("");
    const [invalid, setInvalid] = useState(false);
    const [tasklist, setTasklist] = useState<{ id: string, title: string, completed: boolean, focusTime: number }[]>([]);
    const [checkedList, setCheckedList] = useState<string[]>([]);



    //continously update user typed input to a state variable
    function handleChange(e: string) {
        const tasktitle = e;
        setTask(tasktitle);
    }

    // user adds a new task - store the task into task array
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const listitem = task?.slice();
        if (listitem.length < 1) {
            setInvalid(true);
            return;
        }
        const taskid = crypto.randomUUID();
        setTasklist([...tasklist, { id: taskid, title: listitem, completed: false, focusTime: 0 }]);
        setInvalid(false);
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
        const confirmComplete = confirm("Are you sure?");
        if (confirmComplete) {
            const resultIndex = taskIndexLocator(taskid);
            const updateTask = tasklist.slice();
            updateTask[resultIndex].completed = true;

            setTasklist(updateTask);
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
        }
    }

    //todo - implement a timer of 25 minutes for a task. 
    // Display Cancel Button only. disable other tasks and all other controls.
    // at the end of timer. add time spent to focusTime and restart timer for another 25 minutes.

    function handleFocus(taskid: string) {
        //todo
        console.log(taskid)
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

        setCheckedList([]);

    }


    function handleBatchComplete() {
        const deleteTaskIndices = checkedList.slice();
        const updateTasks = tasklist.slice();
        const result = updateTasks.map(task =>
            deleteTaskIndices.includes(task.id)
                ? { ...task, completed: true }
                : task
        );
        setTasklist(result);
        setCheckedList([]);

    }

    return (
        <>
            {/* Render Create Task COmponent */}
            <div >
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col md:flex-row gap-4 place-items-center">
                    <input
                        id="task"
                        name="task"
                        type="text"
                        value={task}
                        onChange={(e) => handleChange(e.target.value)}
                        className={`bg-zinc-200 p-4 rounded-xl shadow-xl shadow-blue-100 h-16
                        w-full md:w-fit
                        hover:outline-1 hover:outline-gray-300
                        focus:outline-1 
                        focus:outline-blue-500 
                            ${invalid && 'outline-1 outline-red-700'}
                        `}
                        placeholder="Task title"
                    />
                    <button
                        type="submit"
                        className="w-full md:w-fit bg-blue-400 h-16 hover:cursor-pointer hover:bg-blue-500 rounded-xl shadow-2xl px-8 py-4 font-semibold text-xl">
                        Create Task
                    </button>
                </form>
            </div>
            {/* Render Task List */}
            <div className="place-items-start mt-4 text-start">
                {
                    tasklist.length > 0 ?
                        <p className="text-2xl font-semibold text-gray-800">Tasks for Today:</p> :
                        <p className="text-2xl font-semibold text-gray-800">No Tasks:</p>
                }

                <ul className="text-base max-w-3xl space-y-2" >
                    {
                        tasklist?.map((task) =>
                            task.completed ?
                                <li className="list-decimal list-inside p-2 w-full border border-amber-200 rounded-md bg-yellow-200  font-poppins" key={task.id}>
                                    <p className="inline align-top text-green-700 font-semibold italic">
                                        <span className="inline align-top mr-4">{task.title}</span>
                                        <CheckCompleteIcon className="inline-block" width={32} height={32} />
                                    </p>
                                </li>
                                :
                                // Tast List
                                <li className="list-decimal list-inside p-2 w-full border rounded-md border-amber-200 bg-yellow-200 font-poppins" key={task.id}>

                                    <p className={'inline align-top text-gray-900 mr-4'}> {task.title}.</p>

                                    {/* Task title */}
                                    {/* Task Controls panel */}

                                    <div className="inline-flex align-middle w-full justify-end items-center gap-2">

                                        {/* Focus Timer Button */}
                                        <div className="grow-2">
                                            <button className="rounded-lg shadow-md drop-shadow-pink-300 bg-blue-400 hover:bg-blue-500 px-5 py-1 hover:cursor-pointer"
                                                onClick={() => handleFocus(task.id)}
                                            >
                                                <span className="font-bold text-lg">Focus {task.focusTime}</span>
                                            </button>
                                        </div>

                                        {/* Select Task using checkbox */}
                                        <input type="checkbox" id="check" name="check"
                                            className="w-8 h-8"
                                            checked={checkedList.includes(task.id)}
                                            onChange={() => handleSelectedTasks(task.id)}
                                        />

                                        {/* Delete Task */}
                                        <button className="hover:cursor-pointer"
                                            onClick={() =>
                                                handleDeleteTask(task.id)}
                                        >
                                            <Crossmark />
                                        </button>

                                        {/* Complete Task */}
                                        <button className="hover:cursor-pointer"
                                            onClick={() => handleComplete(task.id)}
                                        ><CheckIcon width={32} height={32} /></button>
                                    </div>

                                </li>
                        )
                    }
                </ul>
                {
                    checkedList.length > 0 ?
                        <div className="sticky my-4 bottom-1 right-0 left-0 mx-auto font-bold text-sm bg-indigo-800 w-fit rounded-md z-10 shadow p-2">
                            <p className="mb-2 text-white">Selected Tasks: {checkedList.length}</p>
                            <div className="flex gap-4">
                                <button
                                    className="rounded-md w-24 text-white shadow-md drop-shadow-pink-300 bg-green-700 hover:bg-green-800 px-5 py-1 hover:cursor-pointer"
                                // onClick={todo}
                                onClick={handleBatchComplete}
                                >Done</button>
                                <button
                                    className="rounded-md w-24 shadow-md drop-shadow-pink-300 bg-pink-400 hover:bg-pink-500 px-5 py-1 hover:cursor-pointer"
                                    // onClick={todo}
                                    onClick={handleBatchDelete}
                                >Remove</button>

                            </div>
                        </div> : ""
                }

            </div>
        </>
    )
}