import React from 'react';
import styles from './index.less'
import PropTypes from 'prop-types';
import { config } from '../../config';
import { Input, Select, Menu, Icon, Layout } from 'antd';


const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const Option = Select.Option;
const {
  Header, Footer, Content
} = Layout;


export default class GlobalHeader extends React.PureComponent {

  state = {
    current: 'home'
  };

  static propTypes = {
    onSearch: PropTypes.func,
  };

  handleSearch = (e) => {
      console.log(e.target.value)
  };

  handleClick = (e) => {
    console.log("click", e);
    this.setState({
      current: e.key
    })
  };

  render() {

    const SelectBefore = (
      <Select defaultValue="video" style={{ width: 70 }}>
        <Option value="video">視頻</Option>
        <Option value="article">文章</Option>
      </Select>
    );

    return (
      <Layout>
        <Header className={styles.header} style={{backgroundImage: `url(${config.imageResourcesURL}/globalheader.png)`}}>
          <img src={`${config.imageResourcesURL}/title.png`} />
        </Header>
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
                <Icon type="team" />加入我们
              </Menu.Item>

            </Menu>
          </div>
          <div className={styles.searchBar}>
            <Input addonBefore={SelectBefore} onChange={this.handleSearch} placeholder={"搜索内容"} size={"large"} />
          </div>
        </Footer>

      </Layout>
    )
  }
}
