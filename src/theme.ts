const themeList = ['light', 'dark'];

const themeColor = {
  fontColor: ['#000', '#fff'],
};

/**
 * 获取主题颜色map
 * @return {container: {light: '#fff', dark: '#0d212f'}, box: {light: '#edf0f3', dark: '#263845'}}
 */
const getThemeColorMap = () => {
  let themeMap = {};
  Object.keys(themeColor).forEach((key) => {
    let colorItems = {};
    themeList.forEach((item, index) => {
      colorItems[item] = themeColor[key][index];
    });
    themeMap[key] = colorItems;
  });
  return themeMap;
};

const theme = getThemeColorMap();

export default theme;
