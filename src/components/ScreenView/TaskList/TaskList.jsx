import Styles from "./TaskList.module.css";
import notChecked from "./notChecked.png";
import deleteImg from "./deleteImg.png";
import editTask from "./editTask.png";
import checked from "./checked.png";
import { useState } from "react";
import EditTask from "./EditTask/EditTask";

const TaskList = ({ task, refreshTasks, id }) => {
  const [editing, setEditing] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/${task.id}`, {
      method: "DELETE",
    })
      .then((data) => refreshTasks())
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleSave = ({ taskDone, taskDate, taskName }) => {
    fetch(`http://localhost:3000/${task.id}`, {
      method: "PUT",
      body: JSON.stringify({
        done: taskDone,
        fecha: taskDate,
        text: taskName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error updating task");
        }
        return res.json();
      })
      .then((data) => {
        refreshTasks();
        setEditing(false);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <div className={Styles.taskContainer}>
      <div className={Styles.tasks}>
        <h4 className={Styles.h4}>
          {task.id + 1}- {task.text}
        </h4>
        Expire date: {formatDate(task.fecha)}
        <hr className={Styles.hr} />
      </div>

      <div className={Styles.done}>
        {task.done && task.done ? (
          <img className={Styles.img} src={checked} alt="Checked image" />
        ) : (
          <img
            className={Styles.img}
            src={notChecked}
            alt="Not Checked image"
          />
        )}
      </div>
      <button className={Styles.editTaskButton} onClick={handleEditClick}>
        <img
          className={Styles.deleteImg}
          src={editTask}
          alt="Edit task image"
        />
      </button>
      <button className={Styles.deleteTaskButton} onClick={handleDelete}>
        <img
          className={Styles.deleteImg}
          src={deleteImg}
          alt="Delete image"
        />
      </button>

      {editing && (
        <EditTask
          task={task}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      )}
    </div>
  );
};

export default TaskList;
