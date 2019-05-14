import React from 'react';
import {Button, Card, Col, Icon, Pagination, Row, Layout} from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types';
import UploadCarForm from "../Form/uploadCarForm";
import PreviewModal from "../PreviewModal";
import SettingDrawer from '../Drawer/index';


const { Meta } = Card;
const { Content} = Layout;


export default class CarList extends React.Component {

  state = {
    current: 1,
    visible: false,
    previewVisible: false,
    imageUrl: '',
    drawerVisible: false,
    drawerProps: '',
  };

  static propTypes = {
    dataSource: PropTypes.array.isRequired,
  };

  openModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };

  closePreview = () => {
    this.setState({
      previewVisible: false,
    });
  };

  changePage = (current) => {
    this.setState({
      current,
    });
  };

  openView = (imageUrl) => {
    this.setState({
      previewVisible: true,
      imageUrl,
    });
  };

  openDrawer = (props) => {
    this.setState({
      drawerVisible: true,
      drawerProps: props,
    });
  };

  closeDrawer = () => {
    this.setState({
      drawerVisible: false,
    });
  };

  render() {

    return (
      <Content style={{marginTop: 64}}>
        <div className={styles.titleBar}>
          <h2 style={{borderLeft: 'grey 3px solid', paddingLeft: '10px'}}>调校</h2>
          <Button onClick={this.openModal}>新增</Button>
          <UploadCarForm
            visible={this.state.visible}
            onCancel={this.closeModal}
          />
        </div>

        <Row>
        {this.props.dataSource.slice((this.state.current - 1) * 4, (this.state.current - 1) * 4 + 4).map(item => {
          return (
            <Col key={item.uuid} span={6} className={styles.cardList}>
              <Card
                hoverable
                style={{width: 300}}
                cover={<img alt={"example"} src={item.carPreloadUrl} onClick={this.openView.bind(this, item.carPreloadUrl)} />}
                actions={[
                  <Icon type="setting" onClick={this.openDrawer.bind(this, item)} />,
                  <Icon type="edit" />,
                  <Icon type="ellipsis" />,
                  ]}
              >
                <Meta
                  title={item.carName}
                  description={item.carType}
                />
              </Card>

            </Col>
          );
        })}
          <PreviewModal
            imageUrl={this.state.imageUrl}
            previewVisible={this.state.previewVisible}
            closePreview={this.closePreview}
          />

          <SettingDrawer
            drawerVisible={this.state.drawerVisible}
            closeDrawer={this.closeDrawer}
            item={this.state.drawerProps}
          />
        </Row>
        <div style={{float: 'right', height: 50, marginTop: 16}}>
          <Pagination
            current={this.state.current}
            showTotal={(e) => {return `共${e}辆`;}}
            pageSize={4}
            total={this.props.dataSource.length}
            defaultCurrent={1}
            onChange={this.changePage}
          />
        </div>

      </Content>

    );
  }
}
