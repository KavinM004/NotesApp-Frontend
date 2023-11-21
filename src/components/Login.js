import React,{useState} from 'react'
import axios from 'axios'

export default function Login({setIsLogin}) {
    const[user,setUser]=useState({name:'', email:'',password:'' })
    const[err, setErr]=useState('')

    const onChangeInput=e=>{
        const {name,value}=e.target;
        setUser({...user,  [name]:value})
        setErr('')
    }

    const signupSumbit=async e =>{
        e.preventDefault()
        try {
            const res=await axios.post('/user/signup',{
                username:user.name, email: user.email, password: user.password
            })
            console.log(res.data)
            setUser({name:'',email:'',password:''})
            setErr(res.data.msg)
        } catch (err) {
             setErr(err.response.data)
            console.log(err)
        }
    }
  
    const loginSumbit = async e =>{
        e.preventDefault()
        try {
            const res=await axios.post('/user/login',{
                 email: user.email, password: user.password
            })
            console.log(res.data)
            setUser({email:'',password:''})
            localStorage.setItem('tokenStore', res.data.token)
            setIsLogin(true)
        } catch (err) {
             setErr(err.response.data)
            console.log(err)
        }
    }

    const [onLogin, setOnLogin]=useState(false)
    const style={
        visibility: onLogin ? 'visible':'hidden',
        opacity:onLogin ? 1:0
    }

    return (
    <section className='login-page'>
        <div className='login create-note'>
            <h2>Login</h2>
            <form onSubmit={loginSumbit}>
                <input type='email' name='email' id='login-email'
                placeholder='enter your email' required value={user.email} 
                onChange={onChangeInput} />

                <input type='password' name='password' id='login-password'
                placeholder='Enter your Password' required value={user.password}
                // autoComplete='true'
                onChange={onChangeInput} />

                <button type='sumbit'>Login</button>
                <p>You don't have an account with us?
                    <span onClick={()=> setOnLogin(true)}>SignUp</span>
                </p>
                <h3>{err}</h3>
            </form>
        </div>
        <div className='signup create-note' style={style}>
        <h2>SignUp</h2>
            <form onSubmit={signupSumbit}>
                <input type='text' name='name' id='signup-name'
                placeholder='Enter your name..' required value={user.name}
                onChange={onChangeInput} />

                <input type='email' name='email' id='signup-email'
                placeholder='Enter your email..' required value={user.email}
                onChange={onChangeInput} />

                <input type='password' name='password' id='signup-password'
                placeholder='Enter your password..'  required value={user.password}
                autoComplete='true' onChange={onChangeInput} />

                <button type='sumbit'>SignUp</button>
                <p>You have an account with us?
                    <span onClick={()=> setOnLogin(false)}>Login</span>
                </p>
                <h3>{err}</h3>
            </form>
        </div>
    </section>
  )
}
