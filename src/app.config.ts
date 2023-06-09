// import routes from '@/router/routes.json';
// const pages = Object.keys(routes['main']).map(key => `pages/${routes['main'][key].path}`);

export default defineAppConfig({
  pages: ['pages/home/index', 'pages/record/index'],
  subPackages: [
    {
      root: 'pages2',
      pages: ['add/index']
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#ADA4A5',
    selectedColor: '#C58BF2',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        selectedIconPath: 'assets/images/home-active.png',
        iconPath: 'assets/images/home.png',
        text: '首页'
      },
      {
        pagePath: 'pages/record/index',
        selectedIconPath: 'assets/images/record-active.png',
        iconPath: 'assets/images/record.png',
        text: '打卡记录'
      }
    ]
  }
  // lazyCodeLoading: 'requiredComponents',
});
