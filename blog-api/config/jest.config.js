module.exports = {
  testEnvironment: 'node',
  forceExit: true,
  maxWorkers: 1, 
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  detectOpenHandles: true,
};


