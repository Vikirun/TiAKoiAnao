import React from 'react';
import {Icon, Input, Menu, Select} from "antd";
import PropTypes from "prop-types";
import styles from './index.less';
import {connect} from "dva";


const SubMenu = Menu.SubMenu;
const Option = Select.Option;


class MenuBar extends React.Component {

  state = {
    current: 'home',
  };

  static propTypes = {
    onSearch: PropTypes.func,
  };

  componentDidMount() {
    if (this.props.selectedKeys) {
      this.setState({
        current: this.props.selectedKeys,
      });
    }
  }

  handleSearch = (value) => {
    this.props.handleSearch(value);
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
    if (this.props.sign !== 1) {
      this.props.anchorMethod(e.key);
    } else {
      this.props.dispatch({
        type: 'example/redirect',
      });
    }
  };

  render() {

    const SelectBefore = (
      <Select defaultValue="video" style={{ width: 70 }}>
        <Option value="video">視頻</Option>
        <Option value="article">文章</Option>
      </Select>
    );

    return (
      <div className={styles.menuBar}>
        <div className={styles.leftMenu}>
          <Menu
            mode={"horizontal"}
            selectedKeys={[this.state.current]}
            onClick={this.handleClick}
          >
            <Menu.Item key={"home"}>
              <Icon type="car" />主页
            </Menu.Item>

            <SubMenu title={<span><Icon type="video-camera" />视频</span>}>
              <Menu.Item key={"teach"}>教学系列</Menu.Item>
              <Menu.Item key={"extreme"}>极限系列</Menu.Item>
            </SubMenu>

            <Menu.Item key={"article"}>
              <Icon type="book" />文章
            </Menu.Item>

            <Menu.Item key={"adjust"}>
              <Icon type="tool" />调校
            </Menu.Item>

            <Menu.Item key={"trophy"}>
              <Icon type="trophy" />赛事
            </Menu.Item>

            <Menu.Item key={"join"}>
              <a target="_blank" rel="noopener noreferrer" href="//shang.qq.com/wpa/qunwpa?idkey=d68220e84090c7186e7aba16dff8c266231e8ba318b7bd9b49f3548b9e38c9e1">
                <Icon type="team" />加入我们
              </a>
            </Menu.Item>
          </Menu>
        </div>

        <div>
          <Input.Search addonBefore={SelectBefore} onSearch={this.handleSearch} placeholder={"搜索内容"} size={"large"} />
        </div>

      </div>
    );
  }
}

export default connect(({example, dispatch}) => ({example, dispatch}))(MenuBar);

