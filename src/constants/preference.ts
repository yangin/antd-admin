import { Preference } from '@/type/preference';

export const DEFAULT_COLOR_LIST = [
  { key: '拂晓蓝', color: '#1890ff' },
  { key: '薄暮', color: '#f5222d' },
  { key: '火山', color: '#fa541c' },
  { key: '日暮', color: '#faad14' },
  { key: '明青', color: '#13c2c2' },
  { key: '极光绿', color: '#52c41a' },
  { key: '极客蓝', color: '#2f54eb' },
  { key: '酱紫', color: '#722ed1' },
];

export const DEFAULT_PREFERENCE: Preference = {
  navTheme: 'dark', // 导航主题
  primaryColor: '#1890ff', // 主题色
  layout: 'side', // 布局
};
