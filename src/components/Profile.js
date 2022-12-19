import React, { useEffect } from 'react'



const Profile = (props) => {
      const jwt = localStorage.getItem('jwt') || 'none';
      const posts = props.posts;
      const setPosts = props.setPosts;


      async function fetchMeInfo() {
            const response = await
                  fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/users/me', {

                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${jwt}`,
                        },

                  }
                  );

            const json = await response.json();
            setPosts(json.data.posts);
            console.log(json)
            if (json.data.username) {
                  props.setMyUserName(json.data.username)
            }

      }
      useEffect(() => {
            
            fetchMeInfo();
      }, [])

      async function deletePost(e) {
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



      }




      


      return (
            <div>
                  <h2>Profile</h2>
                  <h3>Token: {jwt}</h3>
                  <h3>Username: {props.myUserName}</h3>
                  <h3>My Posts:</h3>
                  {posts.map((post) =>

                        <div key={post._id}>
                              <p>
                                    Author: {post.author.username}  Title: {post.title}  Description: {post.description} Price: {post.price} Will Deliver: {String(post.willDeliver)} Is Author: {String(post.isAuthor)} AuthorID: {post.author._id}
                                   
                                    <span><button onClick={deletePost} postid={post._id}>Delete</button></span>

                              </p>
                        </div>
                  )}
            </div>


      )






}

export default Profile;