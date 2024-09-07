// import { useState } from 'react'
import { useEffect, useState } from "react"
import ListItem from './components/ListItem'
import ListHeader from "./components/ListHeader"


const App = ()=> {
  const userEmail = 'me@me.com'
  const [tasks,setTasks]=useState(null)

  const getData = async ()=>{
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => getData, [])
  console.log(tasks)

  //sort by date 
  const sortedTasks = tasks?.sort((a,b)=> new Date(a.data)-new Date(b.data))

  return (
    <div className="app">
      <ListHeader listName={'✨LOCK-IN⚔️'} getData={getData}/>
      {/* add the more u complete the more u gain aura */}
      {sortedTasks?.map((task)=><ListItem key={task.id} task={task} getData={getData}/>)}
    </div>
      )
}

export default App
