import React, { useEffect } from 'react';




const Profile = (props) => {
      const jwt = props.jwt
      const BASE_URL = props.BASE_URL;
      const COHORT_NAME = props.COHORT_NAME;
      const posts = props.posts;
      const setPosts = props.setPosts;
      const setMyUserName = props.setMyUserName;
      const myUserName = props.myUserName;

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
                        // console.log(json)

                        // if (json.data.username) {
                        setMyUserName(json.data.username);
                        // }
                  } catch (error) {
                        console.error(error);
                  }
            }
            fetchMeInfo()
      }, [BASE_URL, COHORT_NAME, jwt, props, setMyUserName, setPosts])

      /*  async function deletePost(e) {
             const postid = e.target.getAttribute('postid');
 
 
             try {
                   const resp = await fetch(`https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/posts/${postid}`,
                         {
                               method: "DELETE",
                               headers: {
                                     'Content-Type': 'application/json',
                                     'Authorization': `Bearer ${jwt}`
                               },
                         }
                   );
                   const json = await resp.json();
 
                   setPosts(json.data.posts);
 
             } catch (error) {
                   console.error(error);
             }
 
 
 
       } */







      return (
            <div>
                  <h2>Profile</h2>
               
                  <h3>Username: {myUserName}</h3>
                  <h3>My Posts:</h3>
                  {posts.map((post) =>

                        <div key={post._id}>
                              {jwt ?
                                    <p>
                                          Author: {post.author.username}  Title: {post.title}  Description: {post.description} Price: {post.price} Will Deliver: {String(post.willDeliver)} Messages: {post.messages}

                                          {/* <span><button onClick={deletePost} postid={post._id}>Delete</button></span> */}

                                    </p>
                                    : null}
                        </div>
                  )}
            </div>


      )






}

export default Profile;