const WebpackObfuscator = require('webpack-obfuscator');
const path = require('path');

module.exports = {
  plugins: [
    new WebpackObfuscator(
      {
        identifierNamesGenerator: 'dictionary',
        identifiersDictionary: ['clarkSaidNo', 'iStick2myPaperlikeAStapler', 'oof', 'omegaLul', 'ifItFeelsGoodDoit', 'Ijustwantajob', 'pleasehireme'],
        rotateStringArray: true,
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: false,
        log: false,
        numbersToExpressions: false,
        renameGlobals: false,
        selfDefending: false,
        shuffleStringArray: true,
        simplify: true,
        splitStrings: false,
        stringArray: true,
        stringArrayEncoding: [],
        stringArrayIndexShift: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        // stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false,
      },
      ['excluded_bundle_name.js']
    ),
  ],
  entry: ['./assets/js/index.js'],
  output: {
    filename: 'main.[contenthash].js',
  },
};
