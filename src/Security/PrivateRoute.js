import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from '../Pages/LoginPage';
function PrivateRoute({ element }) {
    const [authenticated, setAuthenticated] = useState(false);

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

    }, []);

    // Function to validate token (you can implement your own logic)
    const tokenIsValid = async() => {
        try {
            // axios.get('http://localhost:8080/test').then((data)=> {
            //     console.log(data);
            // })
          const response = await axios.post('http://localhost:8080/validate-token', {
            id: localStorage.getItem('id'),
            token: localStorage.getItem('token')
          });
          console.log(response.status);
          if(response.status === 200) {
            return true;
          }
          else {
            return false;
          }

          
        //   const token = response.data.token;
        //   const id = response.data.id;
        //   // Store token securely (e.g., localStorage)
        //   localStorage.setItem('token', token);
        //   localStorage.setItem('id', id);
        //   console.log('Login successful');
        //   navigate('/dashboard')
        } catch (error) {
          return false;
        }
    };

    return authenticated ? element : <LoginPage/>;
}

export default PrivateRoute;