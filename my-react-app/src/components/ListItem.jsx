import { useState } from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal'


const ListItem= ({task,getData})=> {

  const [showModal,setShowModal]=useState(false)
  
  const deleteItem = async()=>{
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVERURL}/todos/${task.id}`,{
        method:'DELETE'
      })
      if (response.status===200){
        getData()
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
      <li className="list-item">
        <div className="info-container">
          <TickIcon task={task}/>
        <p className='task-title' >{task.title}</p>
        <ProgressBar/>
        </div>

        <div className='button-container'>
          <button className='edit' onClick={()=>{setShowModal(true)}}>Edit</button>
          <button className='delete' onClick={deleteItem}>Delete</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>} 
      </li>
        )
  }
  
  export default ListItem