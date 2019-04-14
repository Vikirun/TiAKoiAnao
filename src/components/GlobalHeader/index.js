import React from 'react';
import styles from './index.less';
import { config } from '../../config';
import {  Layout } from 'antd';

const { Header } = Layout;

const GlobalHeader = () => {
  return (
    <Layout className={styles["ant-layout"]}>
      <Header className={styles.header} style={{backgroundImage: `url(${config.imageResourcesURL}/globalheader.png)`}}>
        <img alt={""} src={`${config.imageResourcesURL}/title.png`}/>
      </Header>
    </Layout>
  );
};

export default GlobalHeader;
