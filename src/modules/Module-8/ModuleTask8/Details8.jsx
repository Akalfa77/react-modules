import { use } from 'react';
import { useParams, useNavigate } from 'react-router';
import { fetchUserById } from '../../../data/fetchUsers';
import './details8.css';

const userPromiseCache = {};

function getUserPromise(id) {
    if (!userPromiseCache[id]) {
        userPromiseCache[id] = fetchUserById(id);
    }
    return userPromiseCache[id];
}

export default function Details8() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = use(getUserPromise(id));

    return (
        <div className="details8-container">
            <h2 className="details8-title">User Details</h2>

            <div className="details8-card">
                <div className="details8-avatar">
                    {user.name.charAt(0)}
                </div>

                <div className="details8-info">
                    <div className="details8-row">
                        <span className="details8-label">ID:</span>
                        <span className="details8-value">{user.id}</span>
                    </div>
                    <div className="details8-row">
                        <span className="details8-label">Name:</span>
                        <span className="details8-value">{user.name}</span>
                    </div>
                    <div className="details8-row">
                        <span className="details8-label">Email:</span>
                        <span className="details8-value">{user.email}</span>
                    </div>
                    <div className="details8-row">
                        <span className="details8-label">City:</span>
                        <span className="details8-value">{user.city}</span>
                    </div>
                </div>
            </div>

            <button className="back-btn8" onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    );
}