import React, { useEffect } from 'react';
import styles from './ShowMessages.module.css';

const ShowMessages = (props) => {
      const jwt = props.jwt
      const BASE_URL = props.BASE_URL;
      const COHORT_NAME = props.COHORT_NAME;
      const setMyUserName = props.setMyUserName;
      const myUserName = props.myUserName;
      const messages = props.messages;
      const setMessages = props.setMessages;

      useEffect(() => {
            async function fetchMeInfo() {
                  try {
                        const response = await
                              fetch(`${BASE_URL}${COHORT_NAME}/users/me`, {

                                    headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': `Bearer ${jwt}`,
                                    },
                              }
                              );

                        const json = await response.json();


                        setMessages(json.data.messages);
                        setMyUserName(json.data.username);
                        console.log(json);

                  } catch (error) {
                        console.error(error);
                  }
            }
            fetchMeInfo()

      }, [BASE_URL, COHORT_NAME, jwt, setMessages, setMyUserName])



      return (
            <div className={styles.container}>
                  <h2 className={styles.messages_text}>My Messages</h2>
                  <h3 >Inbox</h3>
                  <div className={styles.posts_window}>
                        {messages.map((message, index) => (
                              <div key={index}>
                                    {message.fromUser.username !== myUserName &&
                                          <div className={styles.card}>
                                                <span><h4 className={styles.text}>Message to me from "{message.fromUser.username}"</h4></span>
                                                <span><h4 className={styles.text}>about my post titled "{message.post.title}":</h4></span>
                                                <span><h4 className={styles.text}>{message.content}</h4></span>
                                          </div>
                                    }
                              </div>
                        )
                        )}
                  </div>

                  <h3>Sent</h3>
                  <div className={styles.posts_window}>
                        {messages.map((message, index) =>
                              <div key={index}>
                                    {message.fromUser.username === myUserName &&
                                          <div className={styles.card}>
                                                <span><h4 className={styles.text}>Message from me about the post titled "{message.post.title}":</h4></span>
                                                <span><h4 className={styles.text}>{message.content}</h4></span>
                                          </div>
                                    }
                              </div>
                        )}
                  </div>
            </div>

      )
}

export default ShowMessages;


