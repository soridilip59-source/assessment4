import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../register/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div>
            <h1>Welcome {user?.name}</h1>

            <h2>Your Role: {user?.role}</h2>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;