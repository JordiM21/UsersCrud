import React, { useEffect, useState } from 'react';
import axios from "axios"

const UsersForm = ({getUser, userSelected, deselectUser}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthday, setBirthday] = useState("")

    const submit = e => {
        e.preventDefault()
        const user = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            birthday
        }
        if(userSelected !== null){
            alert(`Editing...`)
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, user)
                .then(() => getUser())
                .catch(error => console.log(error.response))
                reset();
        }else{
            alert(`Creating...`)
            axios.post("https://users-crud1.herokuapp.com/users/", user)
                .then(() => getUser())
                .catch(error => console.log(error.response))
                reset();
        }
           
    }

    const [passwordShown, setPasswordShown] = useState(false)
    const togglePassword = () =>{
        setPasswordShown(!passwordShown)
    }
    useEffect(() => {
        if(userSelected !== null){
            setFirstName(userSelected.first_name)
            setLastName(userSelected.last_name)
            setEmail(userSelected.email)
            setPassword(userSelected.password)
            setBirthday(userSelected.birthday)
        }
    }, [userSelected])

    const reset = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setBirthday("")
        deselectUser();
    }


    return (
        <div className='divform'>
            <form className='form' onSubmit={submit}>
            <h1>New User</h1>
                <div>
                    <label htmlFor="firstName" className='user'></label>
                    <input 
                    className='fname'
                    type="text" 
                    id='firstName' 
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder={"First Name"}
                    />
                
                    <label htmlFor="lastName">   </label>
                    <input 
                    className='sname'
                    type="text" 
                    id='lastName' 
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder={"Last Name"}
                    />
                </div>
                <div>
                    <label htmlFor="email" className='email'></label>
                    <input 
                    type="email" 
                    id='email' 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={"email"}
                    />
                </div>
                <div>
                    <label htmlFor="password" className='password'></label>
                    <input 
                    type={passwordShown ? "text" :"password"}
                    id='password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={"password"}
                    />
                    <button type='button' onClick={togglePassword} className="show"></button>
                </div>
                <div>
                    <label htmlFor="birthday" className='birthday'></label>
                    <input 
                    type="date" 
                    id='birthday' 
                    value={birthday}
                    onChange={e => setBirthday(e.target.value)}
                    />
                </div>
                <div className='bottom-buton'>
                    <button className='create' type='submit'>{userSelected !== null ? "Edit" : "Create"}</button>
                    <button className='clear' type='button' onClick={reset}></button>
                </div>
            </form>
        </div>
    );
};

export default UsersForm;