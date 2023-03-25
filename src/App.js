import React, { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttpRequest from './hooks/useHttp';


function App() {

  const httpObjVal = {
    url: 'https://customreacthooks-ce486-default-rtdb.firebaseio.com/tasks.json'
  }
  
  const httpDataFunc = (data) => {
  
    const loadedTasks = []
    for (const taskKey in data) {
      loadedTasks.push({
        id: taskKey,
        text: data[taskKey].text
      })
    }
    setTasks(loadedTasks)
  }
  
  const [tasks, setTasks] = useState([]);

  const {isLoading, error, sendHttpRequest: fetchTasks} = useHttpRequest(httpObjVal, httpDataFunc)

  // const fetchTasks = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://customreacthooks-ce486-default-rtdb.firebaseio.com/tasks.json'
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

  //     const loadedTasks = [];

  //     for (const taskKey in data) {
  //       loadedTasks.push({ id: taskKey, text: data[taskKey].text });
  //     }

  //     setTasks(loadedTasks);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    fetchTasks();
  }, []);


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
