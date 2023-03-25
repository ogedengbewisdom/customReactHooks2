import React, { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttpRequest from './hooks/useHttp';


function App() {
  const [tasks, setTasks] = useState([]);

  const {isLoading, error, sendHttpRequest: fetchTasks} = useHttpRequest()

  useEffect(() => {
    const httpDataFunc = (data) => {
  
      const loadedTasks = []
      for (const taskKey in data) {
        loadedTasks.push({
          key: taskKey,
          id: taskKey,
          text: data[taskKey].text
        })
      }
      setTasks(loadedTasks)
    }
    const httpObjVal = {
      url: 'https://customreacthooks-ce486-default-rtdb.firebaseio.com/tasks.json'
    }
    fetchTasks(httpObjVal, httpDataFunc);
  }, [fetchTasks]);


  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
