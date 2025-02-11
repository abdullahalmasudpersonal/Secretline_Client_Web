import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Setting.css'
import { faLock, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../../redux/features/auth/authSlice';
import { useAppDispatch } from '../../../redux/hooks';

const Setting = () => {
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        dispatch(logout());
    }
    return (
        <div className='settingDiv'>
            <p style={{ margin: "0", fontSize: "22px", fontWeight: "600", padding: "20px" }}>
                Settings
            </p>
            <div>
                <div className='itemDiv'>
                    <div style={{
                        width: "65px",
                        height: "55px",
                        display: 'flex',
                        alignItems: "center",
                        paddingLeft: "25px",
                    }}>
                        <FontAwesomeIcon icon={faLock} />
                    </div>

                    <div style={{
                        width: "100%",
                        height: "55px",
                        display: 'flex',
                        alignItems: "center",
                        borderBottom: "1px solid rgb(66, 66, 66)",
                    }}>
                        <p style={{ margin: "0", }}>Privacy</p>
                    </div>
                </div>
            </div>

            <div>
                <div className='itemDiv'>
                    <div style={{
                        width: "65px",
                        height: "55px",
                        display: 'flex',
                        alignItems: "center",
                        paddingLeft: "25px",
                        color: "red"
                    }}>
                        <FontAwesomeIcon icon={faSignOut} />
                    </div>

                    <div onClick={handleLogout} style={{
                        width: "100%",
                        height: "55px",
                        display: 'flex',
                        alignItems: "center",
                        borderBottom: "1px solid rgb(66, 66, 66)",
                        color: 'red',
                    }}>
                        <p style={{ margin: "0" }}>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;