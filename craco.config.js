const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const resolve = dir => path.resolve(__dirname, dir); 
module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      "components": resolve("src/components")
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            // name: '[path][name].[ext]',

            name() {
              // `resourcePath` - `/absolute/path/to/file.js`
              // `resourceQuery` - `?foo=bar`

              if (process.env.NODE_ENV === 'development') {
                return '[path][name].[ext]';
              }

              return '[contenthash].[ext]';
            },
            publicPath: `/_next/static/images`,
            outputPath: 'static/images',
            limit: 1000,
          },
        }
      ]
    }
  },
  
}
