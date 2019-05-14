import React from 'react';
import { Modal } from 'antd';



const PreviewModal = (props) => {

  return (
    <Modal destroyOnClose={true} width={"900px"} visible={props.previewVisible} footer={null} onCancel={props.closePreview}>
      <img alt={"测试"} style={{ width: '100%' }} src={props.imageUrl} />
    </Modal>
  );
};

export default PreviewModal;
