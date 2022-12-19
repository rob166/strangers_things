import React, { useEffect } from 'react'

const Posts = (props) => {
      const jwt = localStorage.getItem('jwt');
      const authorId = localStorage.getItem('authorid');
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
      const setMyIsUser = props.setMyIsUser;
      const myIsUser = props.myIsUser;

      async function fetchPosts() {
            const response = await fetch(
                  "https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/posts"
            );

            const json = await response.json();



            setPosts(json.data.posts);

            console.log(json);
      }
      /*  try {
             const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/pos/ts');
             const json = await response.json();

             setPosts(json.data.posts);



             console.log(json.data.posts);

       } catch (error) {
             console.error(error);
       } */





      /* useEffect(() => {
        async function fetchPosts() {
              
                        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/pos/ts');
                        const json = await response.json();
      
                        setPosts(json.data.posts);
      
                       
                        
                        console.log(json.data.posts);
      
                
      
            }
            fetchPosts();
      }, [setPosts]); */

      /* useEffect(() => {
            const fetchPosts = async () => {
                  const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/pos/ts');

                  const json = await response.json();

                  setPosts(json);
                  console.log(json)
            }
            fetchPosts();
      }, []) */

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




      async function addPost() {
            const response = await fetch(
                  `https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/posts`,
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
            localStorage.setItem('authorid', json.data.post.author._id);



            console.log(json.data.post);
      }




      const handleCheckbox = () => {
            setWillDeliver(!willDeliver);
           
          };
     

      useEffect(() => {
            fetchPosts();
      }, []);

      return (
            <div>
                  <form onSubmit={(e) => {
                        setTitle('');
                        setDescription('');
                        setPrice('');
                        e.preventDefault();
                  }}>
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
                              <input type="checkbox" checked={willDeliver} onChange={handleCheckbox}/>
                              Will Deliver?
                        </label>
                        <button onClick={addPost}>Add Post</button>

                  </form>
                  <div>
                        <h1>Posts</h1>
                        {posts.map((post) =>

                              <div key={post._id}>
                                    {post.author._id === authorId ?
                                          <p>

                                                Author: {post.author.username}  Title: {post.title}  Description: {post.description} Price: {post.price} Will Deliver: {String(post.willDeliver)} Is Author: {String(post.isAuthor)} AuthorID: {post.author._id}

                                                <span><button onClick={deletePost} postid={post._id}>Delete</button></span>
                                          </p>
                                          :
                                          <p>
                                                Author: {post.author.username}  Title: {post.title}  Description: {post.description} Price: {post.price} Will Deliver: {String(post.willDeliver)} Is Author: {String(post.isAuthor)} AuthorID: {post.author._id}


                                          </p>
                                    }
                              </div>

                        )}
                  </div>


            </div>

      );


}

export default Posts;
