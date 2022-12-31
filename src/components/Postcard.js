import React from 'react'
import styles from './Postcard.module.css';

const Postcard = (props) => {
      const post = props.post;

      return (
            <div className={styles.card}>

                  <span><h2 className={styles.text}>{post.title}</h2></span>
                  <span><h4 className={styles.text}>Seller Name: {post.author.username}</h4></span>
                  <span><h4 className={styles.text}>Description: {post.description}</h4></span>
                  <span><h4 className={styles.text}>Price: {post.price}</h4></span>
                  <span><h4 className={styles.text}>Location: {post.location}</h4></span>
                  <span><h4 className={styles.text}>Will Seller Deliver? {post.willDeliver ? 'Yes' : 'No'}</h4></span>


            </div>
      );
}

export default Postcard;