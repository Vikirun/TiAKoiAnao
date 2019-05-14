import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './indexPage.less';
import {Layout} from 'antd';


import GlobalHeader from '../../components/GlobalHeader';
import MenuBar from '../../components/Menubar';
import VideoList from '../../components/VideoList';
import CarList from '../../components/CarList';
import ArticleList from "../../components/Article";


const { Content } = Layout;


class App extends React.Component {

  state = {
    anchor : "",
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'example/listVideos',
    });

    dispatch({
      type: 'example/listCarousel',
      payload: {
        count: 5,
      },
    });

    /**
     * 待优化，将setting单独成表关联查询
     */
    dispatch({
      type: 'example/listCar',
      callback: (response) => {
        for (let i = 0, length = response.data.length; i < length; ++i) {
          response.data[i].carSetting = JSON.parse(response.data[i].carSetting);
        }
      },
    });

  }

  handleSearch = (value) => {
    this.props.dispatch(
      routerRedux.push({pathname: '/video'}, value)
    );
  };

  getURLStuff(stuff) {
    let url = window.location.hash;
    let query = url.split("?").length > 1 ? url.split("?")[1] : "";
    let param = !!query ? query.split("&") : [];
    let resultSet = {};
    for (let i = 0; i < param.length; i++) {
      let params = param[i].split("=");
      if (params.length > 1) {
        resultSet[params[0]] = params[1];
      }
    }
    let result = resultSet[stuff] || "";
    return decodeURI(result);
  }

  //滚动
  ifHasAnchorJustScorll() {
    // let anchor = this.getURLStuff("anchor");

    let anchor = this.state.anchor;
    // 对应id的话, 滚动到相应位置
    if (!!anchor) {
      let anchorElement = document.getElementById(anchor);
      if (anchorElement) {
        document.getElementById(anchor).scrollIntoView();
      }
    }
    // 没有的话，滚动到头部
    else {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  scrollToAnchor = (value) => {

    this.setState({
      anchor : value,
    });

  };


  render() {
    const { example } = this.props;
    const { videoList, carouselList, carList } = example;
    this.ifHasAnchorJustScorll();

    return (
      <Layout>
        <GlobalHeader/>
        <Content className={styles.main}>
          <MenuBar handleSearch={this.handleSearch} anchorMethod={this.scrollToAnchor} />
          <VideoList list={videoList} carouselList={carouselList}/>
          <div id="article" />
          <ArticleList/>
          <div id="adjust"/>
          <CarList dataSource={carList} />
        </Content>
      </Layout>
    );
  }
}

export default connect(({example, dispatch}) => ({example, dispatch}))(App);
