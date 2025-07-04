import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function App(){
    const [tasks, setTasks] = useState(
      JSON.parse(localStorage.getItem("tasks")) || []
    );

    useEffect(()=> {
      localStorage.setItem("tasks",JSON.stringify(tasks))

    },[tasks])

useEffect(()=>{
 const fetchTasks = async() =>{
    //chamar api
const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10',
{method: 'GET'
}
);
const data = await response.json()
console.log(data)
// pegar os dados que ela retorna

// armazenar/persistir esses dados no state
setTasks(data);
    
}
fetchTasks()
},[])

    function onTaskClick(taskId){
      const newTasks = tasks.map(task => {

        if(task.id === taskId){
          return{...task, isCompleted: !task.isCompleted}
        }

          return task
        
      })
      setTasks(newTasks);
    }

    function onDeleteTaskClick(taskId){
      const newTasks = tasks.filter(task => task.id != taskId)
      setTasks(newTasks);
    }

    function onAddTaskSubmit (title, description) {
      const newTask = {
        id: uuidv4(),
        title: title,
        description: description,
        isCompleted: false
      };
      setTasks([ ...tasks, newTask]);

    }

    return(
      <div className="w-screen min-h-screen bg-slate-500 flex justify-center p-6">
        <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">Gerenciador de Tarefas</h1>

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={tasks} 
        onTaskClick={onTaskClick}
        onDeleteTaskClick={onDeleteTaskClick}
        onAddTaskSubmit={onAddTaskSubmit}
        />
        </div>
      </div>
  );
}

export default App