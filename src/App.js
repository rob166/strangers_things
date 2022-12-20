import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Posts from './components/Posts';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';

function App() {

  const jwt = localStorage.getItem('jwt');
  const authorId = localStorage.getItem('authorid');
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  const [myUserName, setMyUserName] = useState('');



  return (
    <Router>
      <header>
        <Link to="/"> Home </Link>
        <Link to="/posts"> Posts </Link>
        <Link to="/Profile"> Profile  </Link>
        <Link to="/signup"> Signup </Link>
        <Link to="/login"> Login </Link>
      </header>
      

        <Route exact path="/">
          <Home myUserName={myUserName} setMyUserName={setMyUserName} username={username}/>
        </Route>

        <Route forceRefresh={true} exact path="/profile">
          <Profile myUserName={myUserName} setMyUserName={setMyUserName}
            posts={posts} setPosts={setPosts} jwt={jwt}/>
        </Route>

        <Route exact path="/posts">
          <Posts posts={posts} setPosts={setPosts}
            title={title} setTitle={setTitle} description={description}
            setDescription={setDescription} price={price} setPrice={setPrice}
            willDeliver={willDeliver} setWillDeliver={setWillDeliver}
            jwt={jwt} authorId={authorId}/>
        </Route>

        <Route exact path="/signup">
          <Signup password={password} setPassword={setPassword}
            username={username} setUsername={setUsername} />
        </Route>

        <Route exact path="/login">
          <Login username={username} setUsername={setUsername}
            password={password} setPassword={setPassword} />
        </Route>

      

    </Router>




  );


}






export default App;
