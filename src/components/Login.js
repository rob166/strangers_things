import React from 'react'
import { useHistory, Link } from "react-router-dom";

const Login = (props) => {
      // const history = useHistory();
      const BASE_URL = props.BASE_URL;
      const COHORT_NAME = props.COHORT_NAME;
      const setMyUserName=props.setMyUserName

      async function loginButton() {
            try {
                  const body = JSON.stringify({
                        user: {
                              username: props.username,
                              password: props.password,
                        },
                  });
                  const response = await
                        fetch(`${BASE_URL}${COHORT_NAME}/users/login`, {
                              method: "POST",
                              headers: {
                                    'Content-Type': 'application/json'
                              },
                              body,
                        }
                        );

                  const json = await response.json();
                  console.log(json)

                  if (json.data === null) {

                        alert(json.error.message);
                  } else {


                        localStorage.setItem('jwt', json.data.token);
                        setMyUserName(props.username)

                        alert(json.data.message);


                  }
            } catch (error) {
                  console.error(error);
            }



      }

      function logOutButton() {

            localStorage.clear('jwt');
           
            alert('Logged out');



      }



      return (
            <form onSubmit={(e) => {
                  props.setUsername('');
                  props.setPassword('');
                  e.preventDefault();
            }}>
                  <div>
                        <h2>Login</h2>
                        <div>
                              <input required="required" placeholder='Username' value={props.username}
                                    onChange={(e) => props.setUsername(e.target.value)} />

                              <input required="required" placeholder='Password' type={'password'} value={props.password}
                                    onChange={(e) => props.setPassword(e.target.value)} />

                              <button onClick={loginButton}>Enter username and password</button>
                        </div>
                        <div>
                              <button onClick={logOutButton}>Log Out</button>
                        </div>
                        <div>
                              <h3>If user not found, create one:</h3>
                              
                              <Link to="/signup"><button>Sign Up</button></Link>

                        </div>
                  </div>

            </form>

      );
}

export default Login;

