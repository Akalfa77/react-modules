import { use, startTransition, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { fetchUsers } from '../../../data/fetchUsers';
import './home8.css';

const initialUsersPromise = fetchUsers();

export default function Home8() {
    const [usersPromise, setUsersPromise] = useState(initialUsersPromise);
    const users = use(usersPromise);
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);

    function handleRefresh() {
        startTransition(() => {
            setUsersPromise(fetchUsers());
        });
    }

    function handleUserClick(userId) {

        if (isNavigating) return;
        setIsNavigating(true);
        navigate(`../user/${userId}`);
    }

    return (
        <div className="home8-container">
            <h2 className="home8-title">User List</h2>

            <button className="refresh-btn" onClick={handleRefresh}>
                Refresh Users
            </button>

            <ul className={`user-list8 ${isNavigating ? 'navigating8' : ''}`}>
                {users.map((user) => (
                    <li key={user.id} className="user-item8">
                        <div
                            className={`user-link8 ${isNavigating ? 'disabled-link8' : ''}`}
                            onClick={() => handleUserClick(user.id)}
                        >
                            <span className="user-name8">{user.name}</span>
                            <span className="user-city8">{user.city}</span>
                        </div>
                    </li>
                ))}
            </ul>

            {isNavigating && (
                <p className="navigating-text8">Opening user details...</p>
            )}
        </div>
    );
}