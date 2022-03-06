import React from 'react';
import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import styles from './index.less';

interface SideLayoutCardProps {
  checked: boolean;
  title?: string;
  menuTheme?: 'light' | 'dark';
  onChange: () => void;
}

const SideLayoutCard: React.FC<SideLayoutCardProps> = (props) => {
  const { checked = false, menuTheme = 'dark', title, onChange } = props;

  const handleChange = () => {
    if (checked) return;
    onChange();
  };

  return (
    <Tooltip title={title}>
      <div
        className={`${styles.container} ${styles.side}`}
        onClick={handleChange}
      >
        <div
          className={`${styles.leftBar} ${
            menuTheme === 'dark' ? styles.dark : styles.light
          }`}
        ></div>
        <div className={styles.top} style={{ width: '100%' }}>
          <div className={`${styles.topBar} ${styles.light}`}></div>
          <div className={styles.content}>
            {checked && <CheckOutlined className={styles.icon} />}
          </div>
        </div>
      </div>
    </Tooltip>
  );
};

export default SideLayoutCard;
