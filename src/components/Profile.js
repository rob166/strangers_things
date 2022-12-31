import React, { useEffect } from 'react';
import styles from './Profile.module.css';

const Profile = (props) => {
      const jwt = props.jwt
      const BASE_URL = props.BASE_URL;
      const COHORT_NAME = props.COHORT_NAME;
      const posts = props.posts;
      const setPosts = props.setPosts;
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

                        setPosts(json.data.posts);
                        setMessages(json.data.messages);
                        setMyUserName(json.data.username);
                        console.log(json);

                  } catch (error) {
                        console.error(error);
                  }
            }
            fetchMeInfo()

      }, [BASE_URL, COHORT_NAME, jwt, setMessages, setMyUserName, setPosts])



      return (
            <div className={styles.container}>
                  <h2>Profile</h2>
                  <h3 className={styles.title}>My Username: {myUserName}</h3>
                  <h3>My Posts:</h3>
                  <div className={styles.posts_window}>
                        {posts.map((post) => (
                              <div key={post._id}>
                                    {jwt &&
                                          <div className={styles.card}>
                                                <span><h2 className={styles.text}>{post.title}</h2></span>
                                                <span><h4 className={styles.text}>Description: {post.description}</h4></span>
                                                <span><h4 className={styles.text}>Price: {post.price}</h4></span>
                                                <span><h4 className={styles.text}>Location: {post.location}</h4></span>
                                                <span><h4 className={styles.text}>Will seller Deliver? {post.willDeliver ? 'Yes' : 'No'}</h4></span>
                                                <span><h4 className={styles.text}>Post Status: {post.active ? 'Active' : 'Deleted'}</h4></span>
                                          </div>
                                    }
                              </div>
                        )
                        )}
                  </div>

                  <h3>My Messages</h3>
                  <h4>Messages to me:</h4>
                  {messages.map((message, index) =>
                        <div key={index}>
                              {message.fromUser.username !== myUserName &&
                                    <p>
                                          Message to me from {message.fromUser.username} about my post titled "{message.post.title}": {message.content}
                                    </p>
                              }
                        </div>
                  )}

                  <h4>Messages from me:</h4>
                  {messages.map((message, index) =>
                        <div key={index}>
                              {message.fromUser.username === myUserName &&
                                    <p>
                                          Message from me about the post titled "{message.post.title}": {message.content}
                                    </p>
                              }
                        </div>
                  )}

            </div>
      )
}

export default Profile;


