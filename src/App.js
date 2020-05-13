import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/Login';
import Logout from './views/Logout';
import { MediaProvider } from './contexts/MediaContext';
import { CommentProvider } from './contexts/CommentContext';
import { Container } from '@material-ui/core';
import Upload from './views/Upload';
import MyFiles from './views/MyFiles';
import Modify from './views/Modify';
import Groups from './views/Groups';
import GroupSingle from './views/GroupSingle';
import Search from './views/Search';
import MySingle from './views/MySingle';
import MyGroups from './views/MyGroups';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <CommentProvider>
          <Container maxWidth='md'>
            <Nav />
            <main>
              <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/home' component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/single/:id' component={Single} />
                <Route path='/logout' component={Logout} />
                <Route path='/upload' component={Upload} />
                <Route path='/myfiles' component={MyFiles} />
                <Route path='/modify/:id' component={Modify} />
                <Route path='/groups' component={Groups} />
                <Route path='/groupsingle/:id' component={GroupSingle} />
                <Route path='/search' component={Search} />
                <Route path='/mysingle/:id' component={MySingle} />
                <Route path='/mygroups' component={MyGroups} />
              </Switch>
            </main>
          </Container>
        </CommentProvider>
      </MediaProvider>
    </Router>
  );
};

export default App;
