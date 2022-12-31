import React from 'react'
import { useHistory, Link } from "react-router-dom";
import buttonStyles from './button.module.css';
import styles from './Signup.module.css';

const Signup = (props) => {
      const history = useHistory();
      const BASE_URL = props.BASE_URL;
      const COHORT_NAME = props.COHORT_NAME;
      const setMyUserName = props.setMyUserName

      async function signupButton() {
            try {
                  const body = JSON.stringify({
                        user: {
                              username: props.username,
                              password: props.password,
                        },
                  }
                  );
                  const response = await
                        fetch(`${BASE_URL}${COHORT_NAME}/users/register`, {
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
                        history.push("/profile")

                  }
            } catch (error) {
                  console.error(error);
            }
      }

      return (
            <form className={styles.container} onSubmit={(e) => {
                  props.setUsername('');
                  props.setPassword('');
                  e.preventDefault();
            }
            }>
                  <div className={styles.input_all}>
                        <h2>Signup</h2>

                        <input className={styles.input} required placeholder='Username' value={props.username}
                              onChange={(e) => props.setUsername(e.target.value)} />

                        <input className={styles.input} required placeholder='Password' type={'password'} value={props.password}
                              onChange={(e) => props.setPassword(e.target.value)} />

                        <button className={buttonStyles.button} onClick={signupButton}>Enter new username and password</button>

                        <h3>If user already exists, log in:</h3>
                        <Link to="/"><button className={buttonStyles.button}>Log In</button></Link>

                  </div>
            </form>
      );
}

export default Signup;

