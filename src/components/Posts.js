import React, { useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import Postcard from './Postcard';

const Posts = (props) => {
      const jwt = props.jwt;
      const BASE_URL = props.BASE_URL;
      const COHORT_NAME = props.COHORT_NAME;
      const posts = props.posts;
      const setPosts = props.setPosts;
      const history = useHistory();

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


      /* async function deletePost(e) {
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



      } */




      /* async function addPost() {
            try {
                  const response = await fetch(
                        `${BASE_URL}${COHORT_NAME}/posts`,
                        {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${jwt}`,
                              },
                              body: JSON.stringify({
                                    post: {
                                          title,
                                          description,
                                          price,
                                          willDeliver,
                                    },
                              }),
                        }
                  );

                  const json = await response.json();


                  console.log(json.data.post);
            } catch (error) {
                  console.error(error);
            }
      }




      const handleCheckbox = () => {
            setWillDeliver(!willDeliver);

      }; */



      return (

            <div>
                  <Link to="/addpost"><button>Add Post</button></Link>

                  <h1>Posts</h1>
                  {posts.map((post) =>
                        <div key={post._id}>
                              {post.isAuthor === true ?
                                    <>
                                          <Postcard
                                                key={post._id}
                                                post={post}

                                          />
                                          <span><button
                                                onClick={() => {
                                                      history.push(`/posts/${post._id}`);
                                                }
                                                }>
                                                View Post</button>
                                          </span>
                                    </>
                                    :
                                    <>
                                          <Postcard
                                                key={post._id}
                                                post={post}
                                          />
                                          <span><button postid={post._id}>Send Message</button></span>
                                    </>
                              }
                        </div>
                  )
                  }
            </div>
      );
}


export default Posts;
