import React, { useEffect } from 'react';

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
            <div>
                  <h2>Profile</h2>
                  <h3>My Username: {myUserName}</h3>
                  <h3>My Posts</h3>

                  {posts.map((post) => (

                        <div key={post._id}>

                              {jwt &&

                                    <p>
                                          Title: {post.title}  Description: {post.description} Price: {post.price} Location: {post.location} Will Deliver: {String(post.willDeliver)} Post Status: {post.active ? 'Active' : 'Deleted'}




                                    </p>
                              }
                        </div>
                  )
                  )}
                  <h3>My Messages</h3>
                  <h4>Messages to me:</h4>

                  {messages.map((message, index) =>
                        <div key={index}>
                              <p>
                                    Message to me from {message.fromUser.username} about my post titled "{message.post.title}": {message.content}
                              </p>
                        </div>

                  )
                  }


            </div>
      )
}


export default Profile;


