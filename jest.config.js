// jest.config.js
module.exports = {
  // Indica o ambiente de teste do Jest
  testEnvironment: 'jest-environment-jsdom',
  // Arquivos que devem ser carregados antes dos testes
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Mapeamento para tratar arquivos CSS e outros assets não JavaScript
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
  },
  // Transformação de arquivos TypeScript com ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // Ignorar estas pastas
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

// jest.config.js
module.exports = {
  preset: 'ts-jest', // Usar ts-jest como o compilador
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
