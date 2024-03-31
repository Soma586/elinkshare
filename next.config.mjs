/** @type {import('next').NextConfig} */
export default {
    webpack(config, { isServer }) {
      // Exclude font files from the default Webpack rule that handles JavaScript and JSON.
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        issuer: {
          and: [/\.(js|ts|jsx|tsx)$/]
        },
        use: [
          {
            loader: 'file-loader',
            options: {
              // Set the public path for font files
              publicPath: '/_next/static/',
              // Output font files to the static directory
              outputPath: 'static/',
              // Preserve the filename and extension of the original font file
              name: '[name].[ext]',
            },
          },
        ],
      });
  
      // Add @svgr/webpack loader with oneOf configuration
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          'url-loader' // or 'file-loader' if needed
        ]
      });
  
      return config;
    },
  };
