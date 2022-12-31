import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Message.module.css';
import buttonStyles from './button.module.css';

const Message = (props) => {
      const jwt = props.jwt;
      const BASE_URL = props.BASE_URL;
      const COHORT_NAME = props.COHORT_NAME;
      const postId = props.postId;
      const myMessages = props.myMessages;
      const setMyMessages = props.setMyMessages;

      async function sendMessage() {
            try {
                  const response = await fetch(
                        `${BASE_URL}${COHORT_NAME}/posts/${postId}/messages`,
                        {
                              method: "POST",
                              headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${jwt}`
                              },
                              body: JSON.stringify({
                                    message: {
                                          content:
                                                myMessages,
                                    },
                              })
                        }
                  );

                  const json = await response.json();
                  console.log(json);

            } catch (error) {
                  console.error(error);
            }
      };

      return (
            <form className={styles.container} onSubmit={(e) => {
                  setMyMessages('');
                  e.preventDefault();
            }}>
                  <div className={styles.container}>
                        <input className={styles.input}
                              placeholder='Enter Message'
                              onChange={(e) => setMyMessages(e.target.value)} />
                        <Link to="/posts"><span><button className={buttonStyles.button} onClick={sendMessage}>Send Message</button></span></Link>
                  </div >
            </form>
      );
}

export default Message;