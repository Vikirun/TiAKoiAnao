import React, {Component} from 'react';
import styles from "./index.less";
import {Link} from 'dva/router';
import {Carousel, Icon, Layout} from "antd";

const { Content } = Layout;


export default class VideoList extends Component {
  render(){
    return (
      <Content>
        <div className={styles.titleBar}>
          <h2 style={{borderLeft: 'red 3px solid', paddingLeft: '10px'}}>视频</h2>
          <Link to={{pathname: "/video"}}><Icon style={{fontSize: '1.5rem'}} type="ellipsis" title={"更多视频"} /></Link>
        </div>
        <div className={styles.videoList}>
          <div className={styles.carousel}>
            <Carousel autoplay className={`${styles["ant-carousel"]} ${styles["slick-slide"]}`}>
              {this.props.carouselList.map((item, index) => {
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
            {this.props.list.map((item, index) => {
              return (
                <Link to={{
                  pathname: "/video/display",
                  state: item.videoUrl,
                  }} title={item.videoTitle} key={item.uuid}>
                  <div className={styles.videoCard}>
                    <img src={item.videoPreloadUrl} alt={""} />
                    <div className={styles.mask}>
                      <p className={styles.videoTitle}>{item.videoTitle}</p>
                      <p className={styles.narrator}>{item.videoDesc}</p>
                      <p className={styles.player}>选手：{item.videoPlayer}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Content>
    );
  }
}
