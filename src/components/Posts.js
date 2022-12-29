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

      return (

            <div>
                  {jwt
                  ? <Link to="/addpost"><button>Add Post</button></Link>
                  : null}

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
                                          {jwt
                                          ?<span><button postid={post._id}>Send Message</button></span>
                                          : null}
                                    </>
                              }
                        </div>
                  )
                  }
            </div>
      );
}


export default Posts;
