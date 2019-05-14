import React from 'react';
import {Typography, Layout, Button} from "antd";
import GlobalHeader from "../../components/GlobalHeader";
import MenuBar from "../../components/Menubar";
import styles from "../../components/Article/index.less";

const { Title } = Typography;


export default class Article extends React.Component {

  state = {
    text: '',
  };

  componentDidMount() {
    const { location } = this.props;

    if (location.state) {
      sessionStorage.setItem('article', JSON.stringify(location.state));
    }
    console.log(JSON.parse(sessionStorage.getItem('article')));
  }

  render() {
    return (
      <div>
        <GlobalHeader/>
        <Layout.Content style={{width: '90%', margin: 'auto'}}>
          <MenuBar sign={1} selectedKeys={'article'}/>
          <span className={styles.moduleTitle}>
            <h2 style={{borderLeft: 'blue 3px solid', paddingLeft: '10px'}}>文章</h2>
          </span>
          <Typography>
            <Title level={4} style={{textAlign: 'center'}}>
              {this.props.location.state ? this.props.location.state.articleTitle : JSON.parse(sessionStorage.getItem('article')).articleTitle}
            </Title>
            <div dangerouslySetInnerHTML={{ __html: this.props.location.state ? this.props.location.state.articleContent : JSON.parse(sessionStorage.getItem('article')).articleContent}} />
          </Typography>,

        </Layout.Content>
      </div>
    );
  }
}
