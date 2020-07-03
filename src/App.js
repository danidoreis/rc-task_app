import React, { useState, useEffect } from 'react';
import { TaskRow } from './componentes/TaskRow'
import { TaskBanner } from './componentes/TaskBanner'
import { TaskCreator } from './componentes/TaskCreator'
import { TaskControl } from './componentes/TaskControl'

function App() {
  //define el estado de la app

  const [userName, setUserName] = useState('Proyecto');
  const [taskItems, setTaskItem] = useState([
    { name: 'Task one', done: false },
    { name: 'Task two', done: false },
    { name: 'Task three', done: true },
    { name: 'Task four', done: false }

  ])

  const [showComplete, setShowComplete] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data != null){
      setTaskItem(JSON.parse(data));
    } else {
      setUserName('Project example')
      setTaskItem([
        { name: 'Task one example', done: false },
        { name: 'Task two example ', done: false },
        { name: 'Task three example', done: true },
        { name: 'Task four example', done: false }
      ])
      setShowComplete(true);
    }
  }, []);

  //cada vez que hago un cambio lo guarda en localStorage

  useEffect(() => {
   localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = taskName =>{
    if(!taskItems.find(t => t.name === taskName)){
      setTaskItem([...taskItems, {name: taskName, done: false}])
    }
  }

//metodo para cambiar el estado de una tarea

  const toggleTask = task =>
    setTaskItem(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t )))

  //funcion filtro de tareas

  const taskTableRows = (doneValue) =>{
    return taskItems
    .filter(task => task.done === doneValue)
    .map(task => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />

  ))
}
  
  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />

      <TaskCreator callback={createNewTask}/>

      <table className="table table-striped table-bordered">
        <thead>
          <tr >
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>

        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>

      <div className="bg-secondary-text-white text-center p-2">
        <TaskControl
          description="Completed Task"
          isChecked={showComplete}
          callback={checked => setShowComplete(checked)}
        />
      </div>
      {
        showComplete && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
              <tbody>
                {taskTableRows(true)}
              </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
