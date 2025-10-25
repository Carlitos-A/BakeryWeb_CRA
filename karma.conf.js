module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      'src/setupTests.js', // carga configuración previa (RTL, matchers, cleanup)
      'src/**/*.spec.js', // busca tests en src/
      { pattern: 'public/assets/**/*', watched: false, included: false, served: true } // archivos estáticos
    ],

    preprocessors: {
      'src/setupTests.js': ['webpack'],
      'src/**/*.spec.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic', development: true }]
                ]
              }
            }
          },
          // CSS
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          // Imágenes
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/i,
            type: 'asset/inline',
          },
          // Fuentes
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[name][ext]'
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    reporters: ['spec', 'coverage'],
    specReporter: {
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    proxies: {
      '/assets/': '/base/public/assets/' // Proxy para archivos estáticos
    },

    browsers: ['ChromeHeadless'],
    singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
