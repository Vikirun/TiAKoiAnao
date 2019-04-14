import React from 'react';
import { connect } from 'dva';
import styles from './indexPage.less';
import { Layout, Carousel, List, Button, Modal, Popconfirm, message } from 'antd';


import GlobalHeader from '../components/GlobalHeader/index';
import MenuBar from '../components/Menubar';
import MyEditor from '../components/Editor/index';



const { Content } = Layout;


class App extends React.Component {

  state = {
    checked: true,
    visible: false,
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

  insertImage = (files, insert) => {
    if (files[0]) {
      const formData = new window.FormData();
      formData.append('file', files[0], 'cover.jpg');
      this.props.dispatch({
        type: 'example/insertImage',
        payload: formData,
        callback: (response) => {
          if (response) {
           insert(response.data);
          }
        },
      });
    }
  };

  openModal = () => {
    this.setState({
      visible: true,
    });
  };

  onRef = (ref) => {
    this.child = ref;
  };



  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleArticle = () => {
    this.props.dispatch({
      type: 'example/insertArticle',
      payload: this.child.getContent,
    }).then(response => {
      console.log(response);
      if (response.status !== 0) {
        message.error("文章提交失败");
      }
      message.success("文章提交成功！");
    });

    this.setState({
      visible: false,
    });
  };

  render() {

    const footer =
      <div>
        <Popconfirm title="你确定要退出编辑吗(内容将消失)?" onConfirm={this.handleCancel} okText="是" cancelText="否">
          <Button>
            取消
          </Button>
        </Popconfirm>
        <Button onClick={this.handleArticle} type={"primary"}>
          提交
        </Button>
      </div>;




    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ];

    const { example } = this.props;
    const { list, carouselList } = example;

    return (
      <Layout>

        <GlobalHeader/>
        <Content className={styles.main}>
          <MenuBar />
          <Content >
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

          <Content className={styles.articleContent}>
            <List
              size="large"
              header={<span className={styles.moduleTitle}><h4>文章</h4><Button onClick={this.openModal}>上传</Button></span>}
              bordered
              dataSource={data}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />

            <Modal
              visible={this.state.visible}
              title={"上传文章"}
              onOk={this.handleArticle}
              onCancel={this.handleCancel}
              footer={footer}
              destroyOnClose={true}
              maskClosable={false}
              width={'80%'}
            >
              <MyEditor
                insertImage={this.insertImage}
                onRef={this.onRef}
              />
            </Modal>

          </Content>

        </Content>
      </Layout>


    );
  }
}

export default connect(({example, dispatch}) => ({example, dispatch}))(App);
