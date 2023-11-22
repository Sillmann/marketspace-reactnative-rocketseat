module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@contexts': './src/contexts',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@services': './src/services',
            '@dtos': './src/dtos',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@storage': './src/storage'
          },
        },	  
      ],
    ],	
  };
};
