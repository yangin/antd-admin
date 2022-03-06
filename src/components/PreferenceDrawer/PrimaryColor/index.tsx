import React from 'react';
import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { DEFAULT_COLOR_LIST } from '@/constants/preference';
import styles from './index.less';

interface PrimaryColorProps {
  colors?: object[];
  primaryColor: string | undefined;
  onChange: (key: string, value: string) => void;
}

const PrimaryColor: React.FC<PrimaryColorProps> = (props) => {
  const {
    colors = DEFAULT_COLOR_LIST,
    primaryColor = '#1890ff',
    onChange,
  } = props;

  const handleChange = (color: string) => {
    if (color === primaryColor) return;
    onChange('primaryColor', color);
  };

  return (
    <ul className={styles.container}>
      {colors.map(({ key, color }) => (
        <Tooltip key={color} title={key}>
          <li
            className={styles.item}
            style={{ backgroundColor: color }}
            onClick={() => {
              handleChange(color);
            }}
          >
            {primaryColor === color && (
              <CheckOutlined style={{ color: '#fff' }} />
            )}
          </li>
        </Tooltip>
      ))}
    </ul>
  );
};

export default PrimaryColor;
