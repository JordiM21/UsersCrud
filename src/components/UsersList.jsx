import React from 'react';

const UsersList = ({users, selectUser, deleteUser}) => {
    return (
            <div>
                {users.map((user) => (
                    <div key={user.id} className="card">
                        <h1>{user.first_name} {user.last_name}</h1>
                        <h3>{user.email}</h3>
                        <h3>{user.birthday}</h3>
                        <button 
                        onClick={() => selectUser(user)} 
                        className="edit"
                        >
                        </button>
                        <button 
                        onClick={() => deleteUser(user)} 
                        className='clear'
                        >
                        </button>
                    </div>
                ))}
            </div>
    );
};

export default UsersList;