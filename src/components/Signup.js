import React, { useState } from 'react'


const Signup = (props) => {


      async function signupButton() {
            const body = JSON.stringify({
                  user: {
                        username: props.username,
                        password: props.password,
                  },
            });

            const response = await
                  fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/users/register', {
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
            localStorage.getItem('jwt')
            if ('jwt') {
                  localStorage.clear('jwt');
                  alert('Logged out');
            }

      }



      return (
            <form onSubmit={(e) => {
                  props.setUsername('');
                  props.setPassword('');
                  e.preventDefault();
            }}>

                  <div>
                        <h2>Signup</h2>

                        <input required placeholder='Username' value={props.username} 
                              onChange={(e) => props.setUsername(e.target.value)} />

                        <input required placeholder='Password' value={props.password} 
                              onChange={(e) => props.setPassword(e.target.value)} />

                        <button onClick={signupButton}>Enter new username and password</button>

                        <div>
                              <button onClick={logOutButton} >Log Out</button>
                        </div>
                  </div>
            </form>


      );
}

export default Signup;

