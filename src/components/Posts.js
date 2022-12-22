import React, { useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import Postcard from './Postcard';

const Posts = (props) => {
      const jwt = props.jwt;
      const BASE_URL = props.BASE_URL;
      const COHORT_NAME = props.COHORT_NAME;
      const posts = props.posts;
      const setPosts = props.setPosts;
      const title = props.title;
      const setTitle = props.setTitle;
      const description = props.description;
      const setDescription = props.setDescription;
      const price = props.price;
      const setPrice = props.setPrice;
      const willDeliver = props.willDeliver;
      const setWillDeliver = props.setWillDeliver;


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




      async function addPost() {
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

      };



      return (

            <form onSubmit={(e) => {
                  setTitle('');
                  setDescription('');
                  setPrice('');
                  e.preventDefault();
            }}>
                  <div>
                        <div>
                              <input
                                    placeholder='Enter Title'
                                    onChange={(e) => setTitle(e.target.value)} />
                              <input
                                    placeholder='Enter Description'
                                    onChange={(e) => setDescription(e.target.value)} />
                              <input
                                    placeholder='Enter Price'
                                    onChange={(e) => setPrice(e.target.value)} />
                              <label>
                                    <input type="checkbox" checked={willDeliver} onChange={handleCheckbox} />
                                    Will Deliver?
                              </label>
                              <button onClick={addPost}>Add Post</button>
                        </div>

                        <div>
                              <h1>Posts</h1>
                              {posts.map((post) =>
                                    <Postcard
                                          key={post._id}
                                          post={post}
                                    />

                                    /*  <div key={post._id}>
                                           {post.isAuthor === true ?
                                                 <p>
 
                                                       Author: {post.author.username}  Title: {post.title}  Description: {post.description} Price: {post.price} Will Deliver: {String(post.willDeliver)} Is Author: {String(post.isAuthor)}
                                                       <Link to="/viewmypost"><span><button postid={post._id}>View Post</button></span></Link>
                                                       <span><button onClick={deletePost} postid={post._id}>Delete</button></span>
                                                 </p>
                                                 :
                                                 <p>
                                                       Author: {post.author.username}  Title: {post.title}  Description: {post.description} Price: {post.price} Will Deliver: {String(post.willDeliver)} Is Author: {String(post.isAuthor)}
 
 
                                                 </p>
                                           }
                                     </div> */

                              )}
                        </div>
                  </div>
            </form>


      );


}

export default Posts;
