import React from 'react'
import { Link } from "react-router-dom";
import buttonStyles from './button.module.css';
import styles from './AddPost.module.css';

const AddPost = (props) => {
      const jwt = props.jwt;
      const BASE_URL = props.BASE_URL;
      const COHORT_NAME = props.COHORT_NAME;
      const title = props.title;
      const setTitle = props.setTitle;
      const description = props.description;
      const setDescription = props.setDescription;
      const price = props.price;
      const setPrice = props.setPrice;
      const location = props.location;
      const setLocation = props.setLocation;
      const willDeliver = props.willDeliver;
      const setWillDeliver = props.setWillDeliver;

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
                                          location,
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
            <form className={styles.container} onSubmit={(e) => {
                  setTitle('');
                  setDescription('');
                  setPrice('');
                  setLocation('');
                  e.preventDefault();
            }}>
                  <div className={styles.input_all}>
                        <input className={styles.input}
                              placeholder='Enter Title'
                              onChange={(e) => setTitle(e.target.value)} />
                        <input className={styles.input}
                              placeholder='Enter Description'
                              onChange={(e) => setDescription(e.target.value)} />
                        <input className={styles.input}
                              placeholder='Enter Price'
                              onChange={(e) => setPrice(e.target.value)} />
                        <input className={styles.input}
                              placeholder='Enter Location'
                              onChange={(e) => setLocation(e.target.value)} />
                        <label>
                              <input type="checkbox" checked={willDeliver} onChange={handleCheckbox} />Will Deliver?
                        </label>
                        <Link to="/posts"><button className={buttonStyles.button} onClick={addPost}>Create</button></Link>
                  </div>
            </form>
      );
}

export default AddPost;