import React from 'react';
import {
  Slider, InputNumber, Row, Col,
} from 'antd';

export default class SliderNumber extends React.Component {


  render() {

    return (
      <Row>
        <Col span={12}>
          <Slider
            min={0}
            max={100}
            onChange={this.props.onChange}
            value={this.props.value}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={100}
            onChange={this.props.onChange}
            value={this.props.value}
            style={{ marginLeft: 16 }}
          />
        </Col>
      </Row>
    );
  }
}
