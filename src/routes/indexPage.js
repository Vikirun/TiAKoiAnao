import React from 'react';
import { connect } from 'dva';
import styles from './indexPage.less';
import { Layout, Carousel } from 'antd';
import GlobalHeader from '../components/GlobalHeader/index';
import MenuBar from '../components/menubar';


const { Content } = Layout;


class App extends React.Component {

  state = {
    checked: true,
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
  }

  render() {

    const { example } = this.props;
    const { list, carouselList } = example;

    return (
      <Layout>

        <GlobalHeader/>
        <div style={{width: '90%', margin: 'auto'}}>
          <Content>
            <div className={styles.videoList}>

              <div className={styles.carousel}>
                <Carousel autoplay className={`${styles["ant-carousel"]} ${styles["slick-slide"]}`}>
                  {carouselList.map((item, index) => {
                    return (
                      <div key={index}>
                        <a>
                          <img alt={""} src={item.videoPreloadUrl} />
                        </a>
                      </div>
                    );
                  })}
                </Carousel>
              </div>

              <div className={styles.videoCardList}>
                {list.map((item, index) => {
                  return (
                    <a href={""} title={item.videoTitle} key={index}>
                      <div className={styles.videoCard}>
                        <img src={item.videoPreloadUrl} alt={""} />
                        <div className={styles.mask}>
                          <p className={styles.title}>{item.videoTitle}</p>
                          <p className={styles.narrator}>{item.videoDesc}</p>
                          <p className={styles.player}>选手：{item.videoPlayer}</p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </Content>

          <Content>
            这里是内容展示
          </Content>
        </div>

      </Layout>


    );
  }
}

App.prototypes = {};

export default connect(({example, dispatch}) => ({example, dispatch}))(App);
