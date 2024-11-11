module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
  };
  