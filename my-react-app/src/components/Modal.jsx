import { useState } from "react"

const Modal= ({mode,setShowModal, getData, task})=> {
  const editMode= mode ==='edit'?true : false
//1:29:00
//change data to nowData
//the changes work but it doesnt print
  const[nowData,setData]=useState({
    user_email:editMode?task.user_email:'me@me.com',
    title:editMode?task.title:null,
    progress:editMode?task.progress:0,
    date: editMode ?task.data:new Date()
  })

  const postData = async (e) =>{
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/todos',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(nowData)
      })
      if(response.status===200){
        console.log('WORKED')
        setShowModal(false)
        getData()
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }


  const editData= async(e)=>{
    e.preventDefault()
    try {
      const response=await fetch(`http://localhost:8000/todos/${task.id}`,{
        method:"PUT",
        ///errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(nowData)
      })
      if(response.status===200){
        setShowModal(false)
        getData()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handlechange = (e)=>{
    console.log('Changing',e)
    const {name, value} = e.target
    setData(nowData =>({
      ...nowData,
      [name]: value,
    }))

    console.log(nowData);
    
  }
  
    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Let's {mode} you task </h3>
            <button onClick={()=>{setShowModal(false)}}>
              x
            </button>
          </div>
        <form>
          <input 
          required
          maxLength={30}
          placeholder="Your Task goes here"
          name="title"
          value={nowData.title}
          onChange={handlechange}
          />
          <br/>
          <label>Drag to  select your current progress</label>
          <input 
          required
          type="range"
          id="range"
          min='0'
          max='100'
          name="progress"
          value={nowData.progress || 0}
          onChange={handlechange}
          />
          <input 
          className={mode} type="submit" onClick={editMode?editData:postData}
          />
        </form>
        </div>
    
      </div>
        )
  }
  
  export default Modal