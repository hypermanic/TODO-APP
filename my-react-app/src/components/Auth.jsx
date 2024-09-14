import { useState } from "react";
const Auth= ()=> {
  const [isLogin,setIsLogin]=useState(true)
  const[error,setError]=useState(null)

      const viewLogin = (status) =>{
        setError(null)
        setIsLogin(status)
      }

    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h1>{isLogin  ? 'Please log in':'Please sign up!'}</h1>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            {!isLogin && <input type="password" placeholder="conform password"/>}
            <input type="submit" className="create"/>
            {error && <p>{error}</p>}
          </form>
          <div className="auth-options">
            <button 
            onClick={() => viewLogin(false)}
            style={{backgroundColor:isLogin ? 'grey':'white',color:isLogin ? 'white':'red'}} >Sign Up</button>
            <button onClick={()=>viewLogin(true)} >Log in</button>
          </div>
      </div>
      </div>
        )
  }
  
  export default Auth
