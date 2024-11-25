const { defineConfig } = require('@playwright/test');
const loadYaml = require('./utils/loadYaml.js'); // utils 目录下的工具函数
const config = loadYaml('./configs/config.yml');     // 加载 config.yml 文件

module.exports = defineConfig({
  testDir: './tests', // 测试用例存放目录
  testMatch: '**/*.js', // 匹配所有 .js 文件
  timeout: 30 * 1000, // 每个测试用例的超时时间
  retries: 2,         // 重试次数
  reporter: [
    ['list'],          // 控制台输出
    ['html', { outputFolder: 'reports/html-report' }] // HTML 报告
  ],
  use: {
    // browserName: 'firefox', // 指定使用 Firefox 浏览器(firfox兼容有些问题，弃用)
    headless: false,    // 启用无头模式
    baseURL: config.baseURL, // 默认的测试基准 URL
    trace: 'on-first-retry', // 在第一次重试时生成跟踪
    video: 'on', // 失败时保存视频
  },
});
