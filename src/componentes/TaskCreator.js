import React,{useState} from 'react';

export const TaskCreator = props => {

    const [newTaskName, setNewTaskName] = useState('');

    //funcion
    const updateNewTaskValue = e => setNewTaskName(e.target.value);

    const crateNewTask = () => {
        props.callback(newTaskName);
        setNewTaskName('');
    }


    return(
        <div className="my-1">
            <input 
            type="text"
            className="form-control p-2 mt-1"
            value={newTaskName}
            onChange={updateNewTaskValue}
            />
            <button className="btn btn-success mt-1" onClick={crateNewTask}>
                Add
            </button>

        </div>
    )
}
