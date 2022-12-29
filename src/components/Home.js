import { React } from 'react'
import { Link } from 'react-router-dom';

const Home = (props) => {

      const myUserName = props.myUserName;

      return (
            <div>
                  <h2>Welcome to Stranger's Things!</h2>
                  <h3>Logged in as {myUserName}</h3>

                  <Link to="/profile">
                        <button>View Profile</button>
                  </Link>
            </div>
      );
}

export default Home;