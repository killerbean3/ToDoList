import { ChangeEvent, useState } from 'react';
import './App.css';
import {ITask} from "./interfaces";
import TodoTask from './Components/TodoTask';

const App:React.FC =()=> {
  const [task, setTask] = useState<string>("");
  const [deadLine, setDeadLine] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);

  const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{
    if (event.target.name == 'task'){
      setTask(event.target.value);
    }else{
      setDeadLine(Number(event.target.value));
    }
  }

  const addTask = () =>{
    const newTask ={
      taskName:task,
      deadLine:deadLine
    }
    setTodo([... todo, newTask]);
    setTask("");
    setDeadLine(0);
  }

  const completeTask = (taskNameToDelete:string) =>{
    setTodo(todo.filter((task)=>{
      return task.taskName !=taskNameToDelete
    }))
  }

  return (
    <div className="App">
      <div className="title">
        <h1>To Do List of Things To Do</h1>
        <div className="header">
          <div className="inputcontainer">
            <label htmlFor="task">Input task below:</label>
            <input type="text" name="task" placeholder="Add a task" value={task} onChange={handleChange}/>
            <label htmlFor="deadline">Input deadline below in days:</label>
            <input type="number" name="deadline" placeholder="Deadline (in days)" value={deadLine} onChange={handleChange}/>
          </div>
          <button name="AddButton1" onClick={addTask}>Add</button>
        </div>
        <div className="todoList"></div>
        {todo.map((task:ITask, key:number)=>{
          return<TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  )

}

export default App
