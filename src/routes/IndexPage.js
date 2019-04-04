import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { Layout, Carousel } from 'antd';
import GlobalHeader from '../components/GlobalHeader/index';


const { Header, Content, Footer } = Layout;

class App extends React.Component {

  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;
  }


  render() {

    const { example } = this.props;
    const { remote } = example;

    console.log(styles["slick-slide"]);

    return (
      <Layout>

        <GlobalHeader/>

        <Content>
          <div className={styles.videoList}>

            <div className={styles.carousel}>
              <Carousel autoplay className={`${styles["ant-carousel"]} ${styles["slick-slide"]}`}>
                <div><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
              </Carousel>
            </div>

            <div className={styles.videoCard}>
              
            </div>

          </div>
        </Content>

      </Layout>


    )
  }
}

App.prototypes = {};

export default connect(({example, dispatch}) => ({example, dispatch}))(App);
