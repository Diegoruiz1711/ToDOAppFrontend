import { useForm } from 'react-hook-form';
import ReactModal from "react-modal";
import Styles from './FormModal.module.css';

const FormModal = ({ onSubmit, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <ReactModal
            isOpen={true}
            onRequestClose={onClose}
            contentLabel="Create Task"
            className={Styles.modal}
            overlayClassName={Styles.overlay}
        >
            <div className={Styles.window}>
                <div className={Styles.header}>
                    <div className={Styles.text}>Create task</div>
                    <button className={Styles.cerrar} onClick={onClose}>X</button>
                </div>
                <div className={Styles.blankSpace}>
                    <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={Styles.input}>
                            <label htmlFor="text">Task </label>
                            <input type="text" id="text" {...register('newTaskName', { required: true })} />
                        </div>
                        <div className={Styles.input}>
                            <label htmlFor="date">Date </label>
                            <input type="date" id="date" {...register('newTaskDate', { required: true })} />
                        </div>
                        <div className={Styles.input}>
                            <label htmlFor="done">Done</label>
                            <input type="checkbox" value="true" {...register("newTaskDone")} />
                        </div>
                        <input type="submit" value="Create task" className={Styles.inputSubmit} />
                        <div className={Styles.dialog}>
                            {errors.newTaskName && <p>Task name is required</p>}
                            {errors.newTaskDate && <p>Date is required</p>}
                        </div>
                    </form>
                </div>
            </div>
        </ReactModal>
    );
};

export default FormModal;
