const debug = require('debug')('crawl:read:tags');
const cheerio = require('cheerio');
const request = require('request-promise');

const weekMap = {
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7
};

async function getPages(url) {
  debug('开始读取所有页面');
  const options = {
    url
  };

  const body = await request(options);
  const $ = cheerio.load(body);
  const pages = [];

  $('.projectThumbnail').each(function (index, item) {
    const $this = $(this);
    const href = $this.find('a').attr('href');
    pages.push(href);
  });
  return pages;
}

async function getPlan(url) {
  debug('开始读取所有页面');
  const options = {
    url
  };

  const body = await request(options);
  const $ = cheerio.load(body);

  const title = $('.view_header')
    .find('.title')
    .text()
    .replace(/[计划]/g, '');
  console.log('=============', title);
  const plan = {
    name: title,
    planOfAllDays: Object.values(weekMap).map(value => ({ week: value, actions: [] })),
    completeStatus: []
  };

  $('.projectHome')
    .has('table')
    .each(function (index, item) {
      const $this = $(this);
      const week = weekMap[$this.find('.mtitle').text().match(/周(.)/)?.[1]];
      if (!week) return;
      const actions = $this
        .find('tbody tr')
        .map(function (index, item) {
          if (index === 0) return;

          const type = 1;
          const amount = {
            group: '4',
            count: '12'
          };
          const name = $(this).find('td').eq(1).text();
          const muscle = $(this).find('td').eq(3).text() + ' ' + $(this).find('td').eq(2).text();
          return {
            type,
            name,
            amount,
            muscle
          };
        })
        .toArray();

      const idx = plan.planOfAllDays.findIndex(item => item.week === week);
      plan.planOfAllDays.splice(idx, 1, { week, actions });
    });

  return plan;
}

module.exports = {
  getPages,
  getPlan
};
