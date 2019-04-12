import React from 'react';
import { Icon, Input, Layout, Select, Menu } from "antd";
import styles from "../GlobalHeader/index.less";
import PropTypes from "prop-types";


const SubMenu = Menu.SubMenu;
const Option = Select.Option;
const {
  Footer,
} = Layout;


export default class MenuBar extends React.Component {

  state = {
    current: 'home',
  };

  static propTypes = {
    onSearch: PropTypes.func,
  };

  handleSearch = (e) => {
    console.log(e.target.value);
  };

  handleClick = (e) => {
    console.log("click", e);
    this.setState({
      current: e.key,
    });
  };

  render() {

    const SelectBefore = (
      <Select defaultValue="video" style={{ width: 70 }}>
        <Option value="video">視頻</Option>
        <Option value="article">文章</Option>
      </Select>
    );

    return (
      <Footer>
        <div style={{width: '60%', float: 'left'}}>
          <Menu
            mode={"horizontal"}
            selectedKeys={[this.state.current]}
            onClick={this.handleClick}
          >
            <Menu.Item key={"home"}>
              <Icon type="car" />主页
            </Menu.Item>

            <SubMenu title={<span><Icon type="video-camera" />视频</span>}>
              <Menu.Item key={"teaching"}>教学系列</Menu.Item>
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
              <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=d68220e84090c7186e7aba16dff8c266231e8ba318b7bd9b49f3548b9e38c9e1">
                <Icon type="team" />加入我们
              </a>
            </Menu.Item>

          </Menu>
        </div>
        <div className={styles.searchBar}>
          <Input addonBefore={SelectBefore} onChange={this.handleSearch} placeholder={"搜索内容"} size={"large"} />
        </div>
      </Footer>
    );
  }
}
