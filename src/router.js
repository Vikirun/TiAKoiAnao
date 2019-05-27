import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/Index/indexPage';
import VideoList from './routes/List/videoList';
import Video from './routes/detail/video';
import Article from "./routes/detail/article";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/video" exact component={VideoList} />
        <Route path="/video/display" component={Video} />
        <Route path="/article" component={Article} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
