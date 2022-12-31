import React, { useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import Postcard from './Postcard';
import styles from './Posts.module.css';
import buttonStyles from './button.module.css';

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
            <div className={styles.container}>
                  <div className={styles.posts_top}>
                        <h2>Posts</h2>
                        {jwt
                              ? <Link to="/addpost"><button className={buttonStyles.button}>Add Post</button></Link>
                              : null}
                  </div>

                  {posts.map((post) =>
                        <div key={post._id} className={styles.posts_text}>
                              {post.isAuthor === true ?
                                    <>
                                          <Postcard
                                                key={post._id}
                                                post={post}

                                          />
                                          <span className={styles.postcard_button}>
                                                <button className={buttonStyles.button}
                                                      onClick={() => {
                                                            history.push(`/posts/${post._id}`);
                                                      }
                                                      }>View Post</button>
                                          </span>
                                    </>
                                    :
                                    <>
                                          <Postcard
                                                key={post._id}
                                                post={post}
                                          />
                                          {jwt

                                                ? <span className={styles.postcard_button}>
                                                      <button className={buttonStyles.button}
                                                            onClick={() => {
                                                                  history.push(`/message/${post._id}`);
                                                            }
                                                            }>Send Message</button></span>

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
