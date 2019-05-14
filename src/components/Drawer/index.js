import React from 'react';
import {Col, Divider, Drawer, Row, Slider, Input} from 'antd';


const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

const SettingItem = ({title, value}) => (
  <Row
    style={{
      fontSize: 14,
      lineHeight: '36px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
      textAlign: 'right',
    }}
  >
    <Col span={6}>{title}:</Col>
    <Col span={12}><Slider value={value}/></Col>
    <Col span={4}><Input value={value}/></Col>
  </Row>
);



const SettingDrawer = ({ closeDrawer, drawerVisible, item }) => {

  return (
    <Drawer
      placement={"right"}
      closable={false}
      onClose={closeDrawer}
      visible={drawerVisible}
      width={450}
    >
      <p style={{ ...pStyle, marginBottom: 24 }}>车辆详情</p>
      <p style={pStyle}>配置</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title={"全称"} content={item.carName}/>
        </Col>
        <Col span={12}>
          <DescriptionItem title={"产商"} content={item.carType} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title={"级别"} content={item.carLevel}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <DescriptionItem title={"预览图"} content={<img alt={"none"} src={item.carPreloadUrl} style={{ width: '100%' }} />}/>
        </Col>
      </Row>
      <Divider/>
      <p style={pStyle}>调校配置</p>
      <SettingItem title={"刹车压力分配"} value={item.carSetting && item.carSetting.brakePressure}/>
      <SettingItem title={"刹车压力"} value={item.carSetting && item.carSetting.brake}/>
      <SettingItem title={"制动齿轮"} value={item.carSetting && item.carSetting.gear}/>
      <SettingItem title={"手刹强度"} value={item.carSetting && item.carSetting.handBrake}/>
      <SettingItem title={"悬挂强度"} value={item.carSetting && item.carSetting.suspension}/>
      <SettingItem title={"防倾杆"} value={item.carSetting && item.carSetting.antiRollBar}/>
      <SettingItem title={"轮胎抓地力"} value={item.carSetting && item.carSetting.wheelGrip}/>
      <SettingItem title={"前轮空气压力"} value={item.carSetting && item.carSetting.frontWheel}/>
      <SettingItem title={"后轮空气压力"} value={item.carSetting && item.carSetting.backWheel}/>
      <SettingItem title={"转向反应速度"} value={item.carSetting && item.carSetting.turnReaction}/>
      <SettingItem title={"转向半径"} value={item.carSetting && item.carSetting.turnRadius}/>
      <SettingItem title={"脚刹漂移辅助"} value={item.carSetting && item.carSetting.driftSupport}/>
      <SettingItem title={"漂移稳定性"} value={item.carSetting && item.carSetting.driftStability}/>
      <SettingItem title={"启动控制器"} value={item.carSetting && item.carSetting.startController}/>
    </Drawer>
  );
};

export default SettingDrawer;
