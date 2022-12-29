import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Postcard from './Postcard';

const Viewmypost = (props) => {
      const jwt = props.jwt;
      const BASE_URL = props.BASE_URL;
      const COHORT_NAME = props.COHORT_NAME;
      const postId = props.postId;
      const posts = props.posts;
      const setPosts = props.setPosts;
   

      useEffect(() => {
            async function fetchPosts() {
                  try {
                        const response = await fetch(
                              `${BASE_URL}${COHORT_NAME}/posts`,
                              {
                                    method: "GET",
                                    headers: {

                                          'Authorization': `Bearer ${jwt}`
                                    }
                              }
                        )

                        const json = await response.json();

                        setPosts(json.data.posts);

                        console.log(json);

                  } catch (error) {
                        console.error(error);
                  }
            };

            fetchPosts();

      }, [BASE_URL, COHORT_NAME, jwt, setPosts]);

      async function deletePost(e) {
            const postid = e.target.getAttribute('postid');
            try {
                  const resp = await fetch(`${BASE_URL}${COHORT_NAME}/posts/${postid}`,
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
                  {posts.map((post) =>

                        <div key={post._id}>
                              {post._id === postId &&
                                    <div>
                                          <Postcard
                                                key={post._id}
                                                post={post}

                                          />
                                          <Link to="/posts"><span><button onClick={deletePost} postid={post._id}>Delete</button></span></Link>
                                    </div>

                              }
                        </div>
                  )}
            </div >
      );
}

export default Viewmypost;