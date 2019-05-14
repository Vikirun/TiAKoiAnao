import React from 'react';
import {connect} from 'dva';
import {Divider, Form, Icon, Input, message, Modal, Select, Upload} from "antd";
import SliderNumber from '../Slider/index';

const { Option } = Select;

const data = ["阿斯顿·马丁", "奥迪", "阿尔法罗米欧", "宝马", "本田",
  "比亚迪", "别克", "宾利", "布加迪", "大众", "道奇",
  "法拉利", "菲亚特", "丰田", "福特", "Jeep吉普", "捷豹",
  "凯迪拉克", "柯尼赛格", "兰博基尼", "雷克萨斯", "雷诺",
  "路虎", "MG", "马自达", "玛莎拉蒂", "迈巴赫", "MINI",
  "讴歌", "帕加尼", "日产", "三菱", "斯巴鲁", "斯柯达",
  "smart", "沃尔沃", "五菱汽车", "雪佛兰", "英菲尼迪", "一汽",
];


@Form.create()
class UploadCarForm extends React.Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({
      fileList,
    });
  };

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      message.error("只能上传图片");
      return false;
    }
    const isLimit = file.size / 1024 / 1024 < 10;
    if (!isLimit) {
      message.error("图片必须小于10M");
      return false;
    }
    return (isJPG || isJPEG || isGIF || isPNG) && isLimit;
  };

  closePreview = () => {
    this.setState({
      previewVisible: false,
    });
  };


  handleForm = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let setting = {};
        Object.assign(setting, values);
        delete setting.carPreloadUrl;
        delete setting.carName;
        delete setting.carType;
        delete setting.carLevel;

        let data = {
          carPreloadUrl: values.carPreloadUrl,
          carType: values.carType,
          carLevel: values.carLevel,
          carName: values.carName,
        };
        data['carSetting'] = JSON.stringify(setting);
        data.carPreloadUrl = this.state.fileList[0].response.data;

        this.props.dispatch({
          type: 'form/insertCar',
          payload: data,
        }).then(response => {
          if (response.status === 0) {
            message.success("新增车辆成功");
            this.setState({
              fileList: [],
            });
            this.props.onCancel();
          }
        }).catch(err => {
          message.error("新增车辆失败");
        });
      }
    });
  };


  render() {

    const formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Modal
        visible={this.props.visible}
        title={"新增车辆"}
        onOk={this.handleForm}
        maskClosable={false}
        onCancel={this.props.onCancel}
        destroyOnClose={true}
        bodyStyle={{overflowY: 'scroll', height: '400px'}}
      >
        <Form
          {...formLayout}
          labelAlign={"right"}
        >
          <Form.Item label={"封面"}>
            {getFieldDecorator('carPreloadUrl', {
              rules:[{ required: true, message: '请上传对应的封面图'}],
            })(
              <div>
                <Upload
                  name={"file"}
                  action={"http://localhost:8080/api/article/insertImage"}
                  data={{keyPath: 'car'}}
                  beforeUpload={this.beforeUpload}
                  listType={"picture-card"}
                  onChange={this.handleChange}
                  onPreview={this.handlePreview}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal destroyOnClose={true} visible={previewVisible} footer={null} onCancel={this.closePreview}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            )}
          </Form.Item>

          <Form.Item label={"汽车品牌"}>
            {getFieldDecorator('carType', {
              rules: [{ required: true, message: '请选择对应的品牌'}],
            })(
              <Select
                showSearch
                placeholder={"选择车辆对应品牌"}
                optionFilterProp={"children"}
              >
                {data.map(item => {
                  return (
                    <Option key={item} value={item}>{item}</Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>

          <Form.Item label={"名称"}>
            {getFieldDecorator('carName', {
              rules: [{ required: true, message: '请输入名称'}],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item label={"级别"}>
            {getFieldDecorator('carLevel', {
              initialValue: 'S',
            })(
              <Select>
                <Option value={"A"}>A级</Option>
                <Option value={"S"}>S级</Option>
                <Option value={"SS"}>SS级</Option>
              </Select>
            )}
          </Form.Item>

          <Divider orientation={"left"} style={{color: 'red'}}>调校设置</Divider>

          <Form.Item label={"刹车压力分配"}>
            {getFieldDecorator('brakePressure', {
              initialValue: 50,
            })(
               <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"刹车压力"}>
            {getFieldDecorator('brake', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"制动齿轮"}>
            {getFieldDecorator('gear', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"手刹强度"}>
            {getFieldDecorator('handBrake', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"悬挂强度"}>
            {getFieldDecorator('suspension', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"防倾杆"}>
            {getFieldDecorator('antiRollBar', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"轮胎抓地力"}>
            {getFieldDecorator('wheelGrip', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"前轮空气压力"}>
            {getFieldDecorator('frontWheel', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"后轮空气压力"}>
            {getFieldDecorator('backWheel', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"转向反应速度"}>
            {getFieldDecorator('turnReaction', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"转向半径"}>
            {getFieldDecorator('turnRadius', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"脚刹漂移辅助"}>
            {getFieldDecorator('driftSupport', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"漂移稳定性"}>
            {getFieldDecorator('driftStability', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>

          <Form.Item label={"启动控制器"}>
            {getFieldDecorator('startController', {
              initialValue: 50,
            })(
              <SliderNumber />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return state.form;
}

export default connect(mapStateToProps)(UploadCarForm);
