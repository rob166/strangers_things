import React, { useEffect } from 'react'


const Login = (props) => {
      async function loginButton() {
            const body = JSON.stringify({
                  user: {
                        username: props.username,
                        password: props.password,
                  },
            });
            const response = await
                  fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/users/login', {
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
                  alert(json.data.message);

            }



      }
      function logOutButton() {

            localStorage.clear('jwt');
            localStorage.clear('authorid');
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

                        <input required="required" placeholder='Username' value={props.username}
                              onChange={(e) => props.setUsername(e.target.value)} />

                        <input required="required" placeholder='Password' value={props.password}
                              onChange={(e) => props.setPassword(e.target.value)} />

                        <button onClick={loginButton}>Enter username and password</button>

                        <div>
                              <button onClick={logOutButton}>Log Out</button>
                        </div>
                  </div>

            </form>

      );
}

export default Login;

