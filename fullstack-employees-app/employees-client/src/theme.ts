import { theme, ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#3c40c6',
    borderRadius: 5,
    colorBgLayout: 'transparent'
  },
  components: {
    Typography: {
      titleMarginBottom: 0
    },
    Form: {
      itemMarginBottom: 0,
      verticalLabelPadding: 0
    }
  }
} as const;