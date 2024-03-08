import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginPage from '../Pages/LoginPage';
import {useNavigate} from "react-router-dom"

function PrivateRoute({ element }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const isValid = await tokenIsValid();
                setAuthenticated(isValid);
            } catch (error) {
                setAuthenticated(false);
            }
        };

        checkAuthentication();
    // eslint-disable-next-line
    }, []);

    // Function to validate token (you can implement your own logic)
    const tokenIsValid = async() => {
        try {
          const response = await axios.post('http://localhost:8080/validate-token', {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token')
          });
          console.log(response.status);
          setLoading(false);
          if(response.status === 200) {
            return true;
          }
          else {
            navigate('/');
            return false;
          }
        } catch (error) {
          navigate('/');

          setLoading(false);
          return false;
        }
    };

    return authenticated ? element : (loading ? (<></>) : <LoginPage/>);
}

export default PrivateRoute;