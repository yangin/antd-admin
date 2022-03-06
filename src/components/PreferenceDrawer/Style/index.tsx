import React from 'react';
import SideLayoutCard from '../components/SideLayoutCard';

interface StyleProps {
  navTheme: 'light' | 'dark' | undefined;
  onChange: (key: string, value: string) => void;
}

const Style: React.FC<StyleProps> = (props) => {
  const { navTheme = 'light', onChange } = props;

  const handleChange = (value: string) => {
    if (navTheme === value) return;
    onChange('navTheme', value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideLayoutCard
        checked={navTheme === 'light'}
        menuTheme="light"
        onChange={() => handleChange('light')}
        title="亮色菜单风格"
      />
      <SideLayoutCard
        checked={navTheme === 'dark'}
        menuTheme="dark"
        onChange={() => handleChange('dark')}
        title="暗色菜单风格"
      />
    </div>
  );
};

export default Style;
