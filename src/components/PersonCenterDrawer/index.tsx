import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

interface PersonCenterProps {
  visible: boolean;
  onClose: () => void;
}

const PersonCenter: React.FC<PersonCenterProps> = (props) => {
  const { visible, onClose } = props;

  return (
    <Drawer
      title="个人中心"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default PersonCenter;
