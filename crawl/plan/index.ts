const read = require('./read.ts');
const write = require('./write.ts');
const rates = [3, 4, 5];
const basicUrl = 'http://www.fitsns.cn/project/plan/rate/'; //所有的标签的列表
(async function () {
  const plans = [];

  for (let i = 0; i < rates.length; i++) {
    const url = basicUrl + rates[i];
    const pages = await read.getPages(url);
    for (let j = 0; j < pages.length; j++) {
      const plan = await read.getPlan(pages[j]);
      plans.push(plan);
    }
  }
  await write.writeFile(plans);
  process.exit();
})();
