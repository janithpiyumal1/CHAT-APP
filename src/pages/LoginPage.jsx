import React,{useContext, useState} from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../context/AuthContext'

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign Up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmited, setIsDataSubmitted] = useState(false)

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currentState === "Sign Up"&& !isDataSubmited) {
      setIsDataSubmitted(true)
      return;
    }
    login(currentState === "Sign Up" ? 'signup' : 'login', {fullName, email, password, bio});
  }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/*Left Image*/}
      <img src={assets.logo_big} alt="" className='w-[min(30vw, 250px)]' />
      {/*Login Form*/}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currentState}
          {isDataSubmited && <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>}
        </h2>
        {currentState === "Sign Up" && !isDataSubmited && (
          <input onChange={(e) => setFullName(e.target.value)} value={fullName}
          type="text" className='p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none' placeholder='Full Name' required/>
        )}
        {!isDataSubmited && (
          <>
          <input onChange={(e) => setEmail(e.target.value)} value={email} 
          type="email" placeholder='Email' required 
          className='p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
          
          <input onChange={(e) => setPassword(e.target.value)} value={password} 
          type="password" placeholder='Password' required 
          className='p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500'/>

          </>
        )}
        {currentState === "Sign Up" && isDataSubmited && (
          <textarea onChange={(e) => setBio(e.target.value)} value={bio}
          rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          placeholder='Provide a Bio...' required></textarea>
          )}
          <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer py-3'>
            {currentState === "Sign Up" ? "Create Account" : "Login Now"}
          </button>
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <input type="checkbox"  />
            <p>Agree to the Terms and Conditions</p>
          </div>
          <div className='flex flex-col gap-2'>
            {currentState === "Sign Up" ? (
              <p className='text-sm text-gray-600'>Already have an account? 
              <span className='text-blue-500 cursor-pointer' onClick={() => {setCurrentState("Login"),setIsDataSubmitted(false)}}>Login here</span></p>
            ):(
              <p className='text-sm text-gray-600'>Create an account? 
                <span className='text-blue-500 cursor-pointer' onClick={() => setCurrentState("Sign Up")}>Sign up here</span></p>
            )}
          </div>
      </form>
    </div>
  )
}

export default LoginPage
