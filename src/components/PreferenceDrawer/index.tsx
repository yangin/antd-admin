import React, { useState } from 'react';
import { Drawer } from 'antd';
import { Preference } from '@/type/preference';
import { preference as configPreference } from '../../../config/preference.config';
import { DEFAULT_PREFERENCE } from '@/constants/preference';
import Style from './Style';
import PrimaryColor from './PrimaryColor';
import Layout from './Layout';
import styles from './index.less';

interface PreferenceDrawerProps {
  visible: boolean;
  preference: Preference;
  onClose: () => void;
  onChangeSetting: (params: object) => void;
}

const PreferenceDrawer: React.FC<PreferenceDrawerProps> = (props) => {
  const {
    visible,
    preference: inPreference = {},
    onChangeSetting,
    onClose,
  } = props;
  const currentPreference = {
    ...DEFAULT_PREFERENCE,
    ...configPreference,
    ...inPreference,
  };
  const [preference, setPreference] = useState<Preference>(currentPreference);
  const { navTheme, layout, primaryColor } = preference;

  const handleChangeSetting = (key: string, value: string) => {
    const newPreference = { ...preference, [key]: value };
    setPreference(newPreference);
    onChangeSetting(newPreference);
  };

  return (
    <Drawer
      title="偏好设置"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <div>
        <section className={styles.item}>
          <h3 className={styles.title}>风格设置</h3>
          <Style onChange={handleChangeSetting} navTheme={navTheme} />
        </section>
        <section className={styles.item}>
          <h3 className={styles.title}>主题色</h3>
          <PrimaryColor
            primaryColor={primaryColor.toLocaleLowerCase()}
            onChange={handleChangeSetting}
          />
        </section>
        <section className={styles.item}>
          <h3 className={styles.title}>导航模式</h3>
          <Layout layout={layout} onChange={handleChangeSetting} />
        </section>
      </div>
    </Drawer>
  );
};

export default PreferenceDrawer;
