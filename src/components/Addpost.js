import React, { useEffect } from 'react'

const Addposts = (props) => {
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
                  </div>
</form>


      );

}

// export default Addposts;