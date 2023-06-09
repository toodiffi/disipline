const fs = require('fs');

async function writeFile(data) {
  try {
    const writeStr = JSON.stringify(data);
    fs.writeFileSync('../../src/config/plan-templates.json', writeStr);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  writeFile
};
