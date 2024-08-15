import { useEffect, useState } from 'react';
import Styles from './ScreenView.module.css';
import newTaskImg from './newTask.png';
import TaskList from './TaskList/TaskList';
import FormModal from './FormModal';

const ScreenView = () => {
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState(false)
    const [error, setError] = useState(null);
    const [newTaskName, setNewTaskName] = useState()
    const [newTaskDate, setNewTaskDate] = useState()
    const [newTaskDone, setNewTaskDone] = useState()

    const refreshTasks = () => setRefresh(true);

    useEffect(() => {
        if (refresh) {
            fetch("http://localhost:3000")
                .then((res) => res.json())
                .then((data) => setTasks(data))
                .catch((e) => console.log('Network response was not ok'))
                .finally(() => setRefresh(false));
        }
    }, [refresh]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const onSubmit = (data) => {
        const { newTaskName, newTaskDate, newTaskDone } = data

        handleCloseModal();
        setNewTask(true);

        fetch(`http://localhost:3000`, {
            method: "POST",
            body: JSON.stringify({
                text: newTaskName,
                done: newTaskDone,
                fecha: newTaskDate
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error creating task');
                }
                return res.json();
            })
            .then(() => {
                refreshTasks();
                setError(null);
            })
            .catch((error) => setError(error.message));
    };

    const HandleEdit = (id, data) => {
        fetch(`http://localhost:3000/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => {
                refreshTasks();
            })
            .catch((error) => console.error("Error creating task:", error));
    };


    return (
        <div className={Styles.container}>
            <div className={Styles.window}>
                <div className={Styles.header}>
                    <div className={Styles.text}>Task List</div>
                    <button className={Styles.cerrar}>X</button>
                </div>
                <button className={Styles.newTask} onClick={handleOpenModal}><img className={Styles.deleteImg} src={newTaskImg} alt="new task image" /></button>
                {showModal && <FormModal onSubmit={onSubmit} onClose={handleCloseModal} newTask={newTask} refreshTasks={refreshTasks} setRefresh={setRefresh} />}
                <div className={Styles.blankSpace}>
                    {tasks && tasks.map(task => (
                        <TaskList
                            key={task.id}
                            task={task}
                            refresh={refresh}
                            refreshTasks={refreshTasks}
                            done={task.done}
                            text={task.text}
                            id={task.id}
                            newTask={newTask}
                            setNewTask={setNewTask}
                            handleEdit={HandleEdit}
                            newTaskName={newTaskName}
                            newTaskDate={newTaskDate}
                            newTaskDone={newTaskDone}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default ScreenView;
