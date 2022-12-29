import React from 'react'

const Postcard = (props) => {
      const post = props.post;
      
      return (
            <div>

                  Title: {post.title} Author: {post.author.username} Description: {post.description} Price: {post.price} Location: {post.location} Will Deliver: {String(post.willDeliver)} {/* Is Author: {String(post.isAuthor)} */}

            </div>
      );
}

export default Postcard;