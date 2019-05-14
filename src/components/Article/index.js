import React from 'react';
import styles from "./index.less";
import {Button, Input, Layout, List, message, Modal, Popconfirm} from "antd";
import moment from 'moment';
import {connect} from "dva";
import {Link} from 'dva/router';
import MyEditor from '../../components/Editor';


const { Content } = Layout;


class ArticleList extends React.Component {

  state = {
    visible: false,
    title: '',
    current: 1,
    total: 0,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'example/listArticles',
      payload: {
        currentPage: this.state.current,
        pageSize: 5,
      },
      callback: (response) => {
        this.setState({
          total: response.data.total,
        });
      },
    });
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  insertImage = (files, insert) => {
    if (files[0]) {
      const formData = new window.FormData();
      formData.append('file', files[0], 'cover.jpg');
      formData.append('keyPath', 'image');
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
    if (this.state.title === `` || this.child.getContent() === "<p><br></p>") {
      message.error("标题或者内容不能为空");
    } else {
      this.props.dispatch({
        type: 'example/insertArticle',
        payload: {
          articleTitle: this.state.title,
          articleContent: this.child.getContent(),
        },
      }).then(response => {
        if (response.status === 0) {
          message.success("文章保存成功！");
        }
      });

      this.setState({
        title: '',
        visible: false,
      });
    }
  };

  getArticles = (currentPage) => {
    this.props.dispatch({
      type: 'example/listArticles',
      payload: {
        currentPage,
        pageSize: 5,
      },
      callback: (response) => {
        this.setState({
          total: response.data.total,
          current: currentPage,
        });
      },
    });
  };


  render() {

    const paginationProps = {
      current: this.state.current,
      pageSize: 5,
      total: this.state.total,
      onChange: this.getArticles,
    };

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

    const { example } = this.props;
    const { articleList } = example;

    return (
      <Content className={styles.articleContent}>
        <List
          size="large"
          header={
            <span className={styles.moduleTitle}>
              <h2 style={{borderLeft: 'blue 3px solid', paddingLeft: '10px'}}>文章</h2>
              <Button onClick={this.openModal}>上传</Button>
            </span>
          }
          pagination={paginationProps}
          dataSource={articleList.list}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<Link style={{fontSize: '1rem'}} key={item.uuid} to={{pathname: '/article', state: item}}>{item.articleTitle}</Link>}
                description={<div dangerouslySetInnerHTML={{ __html: item.articleContent.match(/<p>(.*?)<\/p>/)[1]}} />}
              />
              <div>{moment(item.articleUploadTime).format("YYYY-MM-DD")}</div>
            </List.Item>
          )}
        />

        <Modal
          visible={this.state.visible}
          title={"上传文章"}
          onCancel={this.handleCancel}
          footer={footer}
          destroyOnClose={true}
          maskClosable={false}
          width={'80%'}
        >
          <Input placeholder={"请输入标题"} value={this.state.title} onChange={this.changeTitle} size={"large"} />
          <MyEditor
            method={this.insertImage}
            onRef={this.onRef}
          />
        </Modal>
      </Content>
    );
  }
}

export default connect(({example, dispatch}) => ({example, dispatch}))(ArticleList);

