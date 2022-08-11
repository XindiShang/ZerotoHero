import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import StreamCreate from './streams/StreamCreate';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className='ui container'>
      <Router history={history}>
        <Header />
        <Route path="/" component={StreamList} exact />
        <Route path="/streams/new" component={StreamCreate} exact />
        <Route path="/streams/edit/:id" component={StreamEdit} exact />
        <Route path="/streams/delete/:id" component={StreamDelete} exact />
        <Route path="/streams/show" component={StreamShow} exact />
      </Router>
    </div>
  );
}

export default App;