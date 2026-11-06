export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-node', // Change to 'jsdom' if testing browser/DOM elements
};
