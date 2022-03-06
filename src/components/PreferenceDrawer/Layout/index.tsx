import React from 'react';
import MixLayoutCard from '../components/MixLayoutCard';
import SideLayoutCard from '../components/SideLayoutCard';
import TopLayoutCard from '../components/TopLayoutCard';

interface StyleProps {
  layout: string | undefined;
  onChange: (key: string, value: string) => void;
}

const Style: React.FC<StyleProps> = (props) => {
  const { layout = 'side', onChange } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideLayoutCard
        checked={layout === 'side'}
        onChange={() => onChange('layout', 'side')}
        title="侧边菜单布局"
      />
      <TopLayoutCard
        checked={layout === 'top'}
        onChange={() => onChange('layout', 'top')}
        title="顶部菜单布局"
      />
      <MixLayoutCard
        checked={layout === 'mix'}
        onChange={() => onChange('layout', 'mix')}
        title="混合菜单布局"
      />
    </div>
  );
};

export default Style;
