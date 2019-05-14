import React from 'react';
import GlobalHeader from "../../components/GlobalHeader";
import styles from './video.less';
import {Layout} from 'antd';
import MenuBar from "../../components/Menubar";
import CommentList from "../../components/Comment";


export default class Video extends React.Component {

  state = {
    videoUrl: '',
  };

  componentDidMount() {
    const { location } = this.props;

    if (location.state) {
      sessionStorage.setItem('videoUrl', location.state);
    }
  }

  render() {

    const { location } = this.props;

    return (
      <div>
        <GlobalHeader/>

        <Layout.Content className={styles.main}>
          <MenuBar sign={1} selectedKeys={'teach'}/>
        { location.state ?
          <video controls height={'585px'}>
            <source src={location.state} />
            Your browser does not support the video tag
          </video>:
          <video controls height={'585px'}>
            <source src={sessionStorage.getItem("videoUrl")} />
            Your browser does not support the video tag
          </video>
        }
        <div className={styles.titleBar}>
          <h2 className={styles.title}>评论板块</h2>
        </div>
        <CommentList/>
        </Layout.Content>
      </div>
    );
  }
}
