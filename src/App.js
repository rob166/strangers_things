import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Posts from './components/Posts';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import Addpost from './components/Addpost';
import Viewmypost from './components/Viewmypost';

function App() {
  const BASE_URL = 'https://strangers-things.herokuapp.com/api/';
  const COHORT_NAME = '2209-ftb-et-web-pt';
  const jwt = localStorage.getItem('jwt');

  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  const [myUserName, setMyUserName] = useState('');
  const [messages, setMessages] = useState([]);
 

  return (
    <Router >
      <header>
        <Link to="/"> Login </Link>
        <Link to="/signup"> Signup </Link>
        <Link to="/posts"> Posts </Link>
        {jwt &&
          <>
            <Link to="/profile"> Profile  </Link>
            <Link to="/home"> Home </Link>
          </>
        }
      </header>

      <Switch>
        <Route exact path={"/home"}>
          <Home myUserName={myUserName} setMyUserName={setMyUserName} />
        </Route>

        <Route exact path={"/profile"}>
          <Profile myUserName={myUserName} setMyUserName={setMyUserName}
            posts={posts} setPosts={setPosts} jwt={jwt} BASE_URL={BASE_URL} COHORT_NAME={COHORT_NAME}
            messages={messages} setMessages={setMessages} />
        </Route>

        <Route exact path={"/posts"}>
          <Posts posts={posts} setPosts={setPosts}
            title={title} setTitle={setTitle} description={description}
            setDescription={setDescription} price={price} setPrice={setPrice}
            location={location} setLocation={setLocation}
            willDeliver={willDeliver} setWillDeliver={setWillDeliver}
            jwt={jwt} BASE_URL={BASE_URL} COHORT_NAME={COHORT_NAME} />
        </Route>

        <Route exact path={"/signup"}>
          <Signup password={password} setPassword={setPassword}
            username={username} setUsername={setUsername}
            myUserName={myUserName} setMyUserName={setMyUserName} BASE_URL={BASE_URL} COHORT_NAME={COHORT_NAME} />
        </Route>

        <Route exact path={"/"}>
          <Login username={username} setUsername={setUsername}
            password={password} setPassword={setPassword} myUserName={myUserName}
            setMyUserName={setMyUserName} BASE_URL={BASE_URL} COHORT_NAME={COHORT_NAME} />
        </Route>

        <Route exact path={"/addpost"}>
          <Addpost posts={posts} setPosts={setPosts}
            title={title} setTitle={setTitle} description={description}
            setDescription={setDescription} price={price} setPrice={setPrice}
            location={location} setLocation={setLocation}
            willDeliver={willDeliver} setWillDeliver={setWillDeliver}
            jwt={jwt} BASE_URL={BASE_URL} COHORT_NAME={COHORT_NAME} />
        </Route>

        <Route exact path={"/posts/:postId"}
          render={
            (routeProps) => {
              const {
                match: {
                  params: {
                    postId,
                  },
                },
              } = routeProps;
              return (
                <Viewmypost
                  postId={postId} jwt={jwt} BASE_URL={BASE_URL} COHORT_NAME={COHORT_NAME}
                  posts={posts} setPosts={setPosts}
                  title={title} setTitle={setTitle} description={description}
                  setDescription={setDescription} price={price} setPrice={setPrice}
                  location={location} setLocation={setLocation}
                  willDeliver={willDeliver} setWillDeliver={setWillDeliver}
                />
              );
            }
          }
        />
      </Switch >
    </Router >
  );
}


export default App;
