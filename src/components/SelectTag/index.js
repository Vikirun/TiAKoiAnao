import React from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

let arr = [];

export default class SelectTag extends React.Component {

  state = {
    value: [],
  };

  handleChange = (index) => {
    arr[index] = arr[index] ? !arr[index] : true;
    this.setState({
      value: arr,
    });
  };

  render() {
    return <CheckableTag {...this.props} onChange={this.handleChange.bind(this, this.props.value)} checked={this.state.value[this.props.value]} />;
  }
}
