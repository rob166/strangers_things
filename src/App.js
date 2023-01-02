import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Posts from './components/Posts';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import AddPost from './components/AddPost';
import ViewMyPost from './components/ViewMyPost';
import Message from './components/Message';
import ShowMessages from './components/ShowMessages';
import styles from './App.module.css';

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
  const [myMessages, setMyMessages] = useState([]);

  return (
    <div className={styles.container}>
      <Router >
        <header className={styles.top}>
          <Link to="/"> Login/Logout </Link>
          <Link to="/signup"> Signup </Link>
          <Link to="/posts"> Posts </Link>

          {jwt &&
            <>
              <Link to="/profile"> Profile  </Link>
              <Link to="/showmessages"> Messages  </Link>
              <Link to="/home"> Home </Link>
            </>
          }
        </header>

        <Switch>
          <Route exact path={"/home"}>
            <Home
              myUserName={myUserName}
              setMyUserName={setMyUserName} />
          </Route>

          <Route exact path={"/showmessages"}>
            <ShowMessages
              myUserName={myUserName}
              setMyUserName={setMyUserName}
              jwt={jwt}
              BASE_URL={BASE_URL}
              COHORT_NAME={COHORT_NAME}
              messages={messages}
              setMessages={setMessages} />
          </Route>

          <Route exact path={"/profile"}>
            <Profile
              myUserName={myUserName}
              setMyUserName={setMyUserName}
              posts={posts}
              setPosts={setPosts}
              jwt={jwt}
              BASE_URL={BASE_URL}
              COHORT_NAME={COHORT_NAME} />
          </Route>

          <Route exact path={"/posts"}>
            <Posts
              posts={posts}
              setPosts={setPosts}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              price={price}
              setPrice={setPrice}
              location={location}
              setLocation={setLocation}
              willDeliver={willDeliver}
              setWillDeliver={setWillDeliver}
              jwt={jwt}
              BASE_URL={BASE_URL}
              COHORT_NAME={COHORT_NAME} />
          </Route>

          <Route exact path={"/signup"}>
            <Signup
              password={password}
              setPassword={setPassword}
              username={username}
              setUsername={setUsername}
              myUserName={myUserName}
              setMyUserName={setMyUserName}
              BASE_URL={BASE_URL}
              COHORT_NAME={COHORT_NAME} />
          </Route>

          <Route exact path={"/"}>
            <Login
              username={username} setUsername={setUsername}
              password={password} setPassword={setPassword} myUserName={myUserName}
              setMyUserName={setMyUserName} BASE_URL={BASE_URL} COHORT_NAME={COHORT_NAME} />
          </Route>

          <Route exact path={"/addpost"}>
            <AddPost
              posts={posts}
              setPosts={setPosts}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              price={price}
              setPrice={setPrice}
              location={location}
              setLocation={setLocation}
              willDeliver={willDeliver}
              setWillDeliver={setWillDeliver}
              jwt={jwt}
              BASE_URL={BASE_URL}
              COHORT_NAME={COHORT_NAME} />
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
                  <ViewMyPost
                    postId={postId}
                    jwt={jwt}
                    BASE_URL={BASE_URL}
                    COHORT_NAME={COHORT_NAME}
                    posts={posts}
                    setPosts={setPosts}
                  />
                );
              }
            }
          />

          <Route exact path={"/message/:postId"}
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
                  <Message
                    postId={postId}
                    jwt={jwt}
                    BASE_URL={BASE_URL}
                    COHORT_NAME={COHORT_NAME}
                    myMessages={myMessages}
                    setMyMessages={setMyMessages}
                  />
                );
              }
            }
          />
        </Switch >
      </Router >
    </div>
  );
}

export default App;
