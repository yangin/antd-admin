import { useMemo } from 'react';
import { Space } from 'antd';
import AvatarDropdown from './AvatarDropdown';

const HeaderRight: React.FC = () => {
  const render = useMemo(() => {
    return (
      <Space>
        <AvatarDropdown />
      </Space>
    );
  }, []);
  return render;
};

export default HeaderRight;
