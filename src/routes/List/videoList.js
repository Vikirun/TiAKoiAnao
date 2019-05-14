import React from 'react';
import {Card, Col, Form, Input, List, Row, Select} from 'antd';
import moment from 'moment';
import styles from './videoList.less';
import {Link} from 'dva/router';

import GlobalHeader from "../../components/GlobalHeader";
import {connect} from "dva";
import SelectTag from "../../components/SelectTag";

const { Option } = Select;
const FormItem = Form.Item;


@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log(changedValues, allValues);
  },
})
class VideoList extends React.Component {

  state = {
    current: 1,
    total: 0,
    pageSize: 8,
    pagination: {},
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'video/listVideos',
      payload: {
        currentPage: this.state.current,
        pageSize: this.state.pageSize,
      },
      callback: (response) => {
        this.setState({
          total: response.data.total,
        });
      },
    });
  }


  pageChange = (value) => {
    this.props.dispatch({
      type: 'video/listVideos',
      payload: {
        currentPage: value,
        pageSize: this.state.pageSize,
      },
      callback: (response) => {
        this.setState({
          total: response.data.total,
          current: value,
        });
      },
    });
  };

  handleSearch = (value) => {
    this.props.dispatch({
      type: 'video/listVideos',
      payload: {
        currentPage: this.state.current,
        pageSize: this.state.pageSize,
        videoTitle: value.toString(),
      },
      callback: (response) => {
        this.setState({
          total: response.data.total,
          current: response.data.pageNum,
        });
      },
    });
  };

  render() {
    const { video, form } = this.props;
    const { getFieldDecorator } = form;
    const {videoList} = video;

    const paginationProps = {
      current: this.state.current,
      pageSize: this.state.pageSize,
      total: this.state.total,
      onChange: this.pageChange,
      position: 'bottom',
    };

    const cardList =
      <List
        rowKey="id"
        grid={{ gutter: 16, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={videoList}
        pagination={paginationProps}
        renderItem={item => (
          <Link to={{
            pathname: "/video/display",
            state: item.videoUrl,
          }} title={item.videoTitle} key={item.uuid}>
            <List.Item>
              <Card
                className={styles.card}
                hoverable
                cover={<img alt={item.videoTitle} src={item.videoPreloadUrl} />}
              >
                <Card.Meta
                  title={<a>{item.videoTitle}</a>}
                  description={item.videoDesc}
                />
                <div className={styles.cardItemContent}>
                  <span>{moment.unix(item.videoUploadTime).fromNow()}</span>
                </div>
              </Card>
            </List.Item>
          </Link>
        )}
      />;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    return (
      <div className={styles.coverCardList}>
        <GlobalHeader/>
        <div style={{width: '60%', margin: '36px auto 0px auto'}}>

          <Input.Search
            addonBefore={<img alt={"无"} src={require("./222.png")} height={"35px"}/>}
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={this.handleSearch}
          />
        </div>
        <Card bordered={false}>
          <Form layout={"horizontal"}>
            <FormItem label={"检索类目"} {...formItemLayout}>
              {getFieldDecorator('category')(
                <div>
                  <SelectTag value={0}>类目一</SelectTag>
                  <SelectTag value={1}>类目二</SelectTag>
                  <SelectTag value={2}>类目三</SelectTag>
                  <SelectTag value={3}>类目四</SelectTag>
                  <SelectTag value={4}>类目五</SelectTag>
                  <SelectTag value={5}>类目六</SelectTag>
                  <SelectTag value={6}>类目七</SelectTag>
                  <SelectTag value={7}>类目八</SelectTag>
                  <SelectTag value={8}>类目九</SelectTag>
                  <SelectTag value={9}>类目十</SelectTag>
                </div>
              )}
            </FormItem>
            <Row gutter={16}>
              <Col span={3} offset={5}>
                <FormItem label="作者" {...formItemLayout}>
                  {getFieldDecorator('author')(
                    <Select placeholder={"不限"}>
                      <Option value={"list"}>王昭君</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="视频类别">
                  {getFieldDecorator('videoType', {})(
                    <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                      <Option value="0">教学系列</Option>
                      <Option value="1">极限系列</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <div className={styles.cardList}>{cardList}</div>
      </div>
    );
  }
}


export default connect(({video, dispatch}) => ({video, dispatch}))(VideoList);
