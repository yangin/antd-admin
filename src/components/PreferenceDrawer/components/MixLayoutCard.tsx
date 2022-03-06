import React from 'react';
import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import styles from './index.less';

interface MixLayoutCardProps {
  checked: boolean;
  title?: string;
  onChange: () => void;
}

const MixLayoutCard: React.FC<MixLayoutCardProps> = (props) => {
  const { checked = false, title, onChange } = props;

  const handleChange = () => {
    if (checked) return;
    onChange();
  };

  return (
    <Tooltip title={title}>
      <div
        className={`${styles.container} ${styles.mix}`}
        onClick={handleChange}
      >
        <div className={`${styles.topBar} ${styles.dark}`}></div>
        <div className={styles.side} style={{ height: '100%' }}>
          <div className={`${styles.leftBar} ${styles.light}`}></div>
          <div className={styles.content}>
            {checked && <CheckOutlined className={styles.icon} />}
          </div>
        </div>
      </div>
    </Tooltip>
  );
};

export default MixLayoutCard;
