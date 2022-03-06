import React from 'react';
import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import styles from './index.less';

interface TopLayoutCardProps {
  checked: boolean;
  title?: string;
  onChange: () => void;
}

const TopLayoutCard: React.FC<TopLayoutCardProps> = (props) => {
  const { checked = false, title, onChange } = props;

  const handleChange = () => {
    if (checked) return;
    onChange();
  };

  return (
    <Tooltip title={title}>
      <div
        className={`${styles.container} ${styles.top}`}
        onClick={handleChange}
      >
        <div className={`${styles.topBar} ${styles.dark}`}></div>
        <div className={styles.content}>
          {checked && <CheckOutlined className={styles.icon} />}
        </div>
      </div>
    </Tooltip>
  );
};

export default TopLayoutCard;
