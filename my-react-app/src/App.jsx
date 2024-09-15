// import { useState } from 'react'
import { useEffect, useState } from "react"
import ListItem from './components/ListItem'
import ListHeader from "./components/ListHeader"
import Auth from './components/Auth'
import {useCookies} from 'react-cookie'


const App = ()=> {
  const[cookies,setCookie,removeCookie]=useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
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

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [])
  console.log(tasks)

  //sort by date 
  const sortedTasks = tasks?.sort((a,b)=> new Date(a.data)-new Date(b.data))

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
      <> 
      <ListHeader listName={'✨LOCK-IN⚔️'} getData={getData}/>
     {sortedTasks?.map((task)=><ListItem key={task.id} task={task} getData={getData}/>)}
     </>}
    </div>
      )
}

export default App
