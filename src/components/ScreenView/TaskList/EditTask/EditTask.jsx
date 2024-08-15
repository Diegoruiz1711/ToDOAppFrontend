import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import Styles from "./EditTask.module.css";

const EditTask = ({ onSave, onCancel, task }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      taskName: task.text,
      taskDone: task.done,
      taskDate: new Date(task.fecha).toISOString().substring(0, 10),
    },
  });

  const handleSave = (data) => {
    const { taskName, taskDate, taskDone } = data;
    if (onSave) {
      onSave({ taskName, taskDate, taskDone });
    }
  };

  const handleCancelEdit = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={handleCancelEdit}
      contentLabel="Edit Task"
      className={Styles.modal}
      overlayClassName={Styles.overlay}
    >
      <div className={Styles.window}>
        <div className={Styles.header}>
          <div className={Styles.text}>Edit Task</div>
          <button className={Styles.cerrar} onClick={handleCancelEdit}>X</button>
        </div>
        <div className={Styles.blankSpace}>
          <form className={Styles.form} onSubmit={handleSubmit(handleSave)}>
            <div className={Styles.input}>
              <label htmlFor="taskName">Task </label>
              <input type="text" {...register("taskName", { required: true })} />
            </div>
            <div className={Styles.input}>
              <label htmlFor="taskDate">Date </label>
              <input type="date" {...register("taskDate")} />
            </div>
            <div className={Styles.input}>
              <label htmlFor="taskDone">Done</label>
              <input type="checkbox" value="true" {...register("taskDone")} />
            </div>
            <input type="submit" value="Save" className={Styles.inputSubmit} />
            <input type="button" value="Cancel" onClick={handleCancelEdit} className={Styles.inputSubmit} />
          </form>
        </div>
      </div>
    </ReactModal>
  );
};

export default EditTask;
