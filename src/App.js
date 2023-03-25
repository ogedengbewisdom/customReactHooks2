import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttpRequest from './hooks/useHttp';


function App() {
  const [tasks, setTasks] = useState([]);

  const httpObjVal = useMemo( () => {
    return {
    url: 'https://customreacthooks-ce486-default-rtdb.firebaseio.com/tasks.json'
  }}, [])
  
  const httpDataFunc = useCallback((data) => {
  
    const loadedTasks = []
    for (const taskKey in data) {
      loadedTasks.push({
        id: taskKey,
        text: data[taskKey].text
      })
    }
    setTasks(loadedTasks)
  }, [])

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
