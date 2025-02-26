var http = require('http');
const { getMatchMock, initMock } = require('./getMockData');
const url = require('url');
const pathToRegexp = require('path-to-regexp');
const match = pathToRegexp.match;
function parseJson(req) {
  return new Promise(resolve => {
    let body = '';
    let jsonStr = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      try {
        jsonStr = JSON.parse(body);
      } catch (err) {
        jsonStr = '';
      }
      resolve(jsonStr);
      return;
    });
  });
}
initMock({
  mockUrlList: [/api/],
});
http
  .createServer(async function (req, res) {
    let matchMock = getMatchMock(req.url);
    if (matchMock) {
      let queryParams = {};

      if (req.url) {
        queryParams = url.parse(req.url, true);
      }

      const reqUrl = queryParams.pathname;
      let query = queryParams.query;
      if (reqUrl) {
        const isGet = req.method && req.method.toUpperCase() === 'GET';
        if ((isGet && JSON.stringify(query) === '{}') || !isGet) {
          const urlMatch = match(url, { decode: decodeURIComponent });
          const params = urlMatch(reqUrl).params;
          if (JSON.stringify(params) !== '{}') {
            query = urlMatch(reqUrl).params || {};
          } else {
            query = queryParams.query || {};
          }
        }
      }
      const body = await parseJson(req);
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      res.send = opt => res.end(JSON.stringify(opt));
      res.json = opt => res.end(JSON.stringify(opt));
      matchMock.handler({ url: req.url, body, query, headers: req.headers }, res);
    } else {
      res.end();
    }
  })
  .listen(8083);
