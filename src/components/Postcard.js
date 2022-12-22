import React from 'react'
import { Link } from "react-router-dom";

const Postcard = (props) => {
      
      const post=props.post;
      
      


      return (
            <div>
{
      post.isAuthor === true ?
      <p>

              Title: {post.title} Author: {post.author.username} Description: {post.description} Price: {post.price} Will Deliver: {String(post.willDeliver)} Is Author: {String(post.isAuthor)}
            <Link to="/viewmypost"><span><button postid={post._id}>View Post</button></span></Link>
            {/* <span><button onClick={deletePost} postid={post._id}>Delete</button></span> */}
      </p>
      :
      <p>
            Author: {post.author.username}  Title: {post.title}  Description: {post.description} Price: {post.price} Will Deliver: {String(post.willDeliver)} Is Author: {String(post.isAuthor)}


      </p>
}
                                    </div >



      );
}

export default Postcard;