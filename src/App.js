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
import Search from './views/Search';
import MySingle from './views/MySingle';
import Favourite from './views/Favourite';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const font = "'Lato', sans-serif";

const muiTheme = createMuiTheme({
  fontFamily: font,
});

const App = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={{ fontFamily: font }}>
        // eslint-disable-next-line no-undef
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
                    <Route path='/search' component={Search} />
                    <Route path='/mysingle/:id' component={MySingle} />
                    <Route path='/favourite' component={Favourite} />
                  </Switch>
                </main>
              </Container>
            </CommentProvider>
          </MediaProvider>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
