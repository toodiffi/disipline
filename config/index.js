import path from 'path';
import Components from 'unplugin-vue-components/webpack';

const NutUIResolver = () => {
  return name => {
    console.log('index', 'name', name);
    if (name.startsWith('Nut')) {
      const partialName = name.slice(3);
      return {
        name: partialName,
        from: '@nutui/nutui-taro',
        sideEffects: `@nutui/nutui-taro/dist/packages/${partialName.toLowerCase()}/style`
      };
    }
  };
};

const config = {
  projectName: 'discipline',
  date: '2023-2-25',
  designWidth(input) {
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375;
    }
    return 375;
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-html',
    [
      '@tarojs/plugin-framework-vue3',
      {
        vueLoaderOption: {
          compilerOptions: {
            isCustomElement: tag => tag.includes('calendar'),
            whitespace: 'preserve'
          },
          reactivityTransform: true // 开启vue3响应性语法糖
        }
      }
    ]
  ],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    // https://github.com/NervJS/taro/issues/12553
    prebundle: { enable: false, force: true }
  },
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  logger: {
    quiet: false
  },
  sass: {
    resource: [
      path.resolve(__dirname, '..', 'src/styles/custom_theme.scss'),
      path.resolve(__dirname, '..', 'src/app.scss')
    ],
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src')
  },
  mini: {
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(
        Components({
          resolvers: [NutUIResolver()]
        })
      );
      chain.merge({
        plugin: {
          install: {
            plugin: require('eslint-webpack-plugin'),
            args: [
              {
                fix: true /* 自动帮助修复 */,
                failOnError: false, // 错误时继续构建而不直接退出
                extensions: ['js', 'json', 'ts', 'vue'],
                exclude: 'node_modules'
              }
            ]
          }
        }
      });
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          // selectorBlackList: ['nut-']
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(
        Components({
          resolvers: [NutUIResolver()]
        })
      );
    },
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro', 'icons-vue-taro'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
