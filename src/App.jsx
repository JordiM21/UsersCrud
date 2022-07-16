import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data))
  }, [])

  const getUser = () => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data))
  }

  const [userSelected, setUserSelected] = useState(null)
  const selectUser = (user) => {
    alert(`You've selected ${user.first_name}`)
    setUserSelected(user)
  }

  const deselectUser = () => {
    setUserSelected(null)
  }
  const deleteUser = (user) => {
    alert("deleting product")
    axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
      .then(() => getUser())
      .catch(error => console.log(error.response))
  }

  return (
    <div className="App">
      <UsersForm 
      getUser={getUser} 
      userSelected={userSelected}
      deselectUser={deselectUser}
      />
      <UsersList 
      users={users}
      selectUser={selectUser}
      deleteUser={deleteUser}
      />
    </div>
  )
}

export default App
