const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

function loadYaml(filePath) {
  try {
    const fullPath = path.resolve(__dirname, '../', filePath);
    console.log('Trying to load YAML file from:', fullPath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return yaml.load(fileContents); // 使用 js-yaml 加载 YAML 文件
  } catch (error) {
    console.error(`Error loading YAML file at ${filePath}:`, error.message);
    throw error;
  }
}

module.exports = loadYaml;
