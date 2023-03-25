import useHttpRequest from '../../hooks/useHttp';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const {isLoading, error, sendHttpRequest: sendTask} = useHttpRequest()

  const createTask = (taskText, data) => {
    const taskId = data.name
    const createdTask = {id: taskId, text: taskText}
    props.onAddTask(createdTask)
  }
  const enterTaskHandler = async (taskText) => {

    sendTask({url: 'https://customreacthooks-ce486-default-rtdb.firebaseio.com/tasks.json', method: "POST", headers: {
      "Content-Type": "application/json"
    },
    body: {text: taskText}   
  }, createTask.bind(null, taskText))
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
