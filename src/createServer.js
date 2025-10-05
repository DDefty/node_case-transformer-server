const { createServer: _createServer } = require('http');
const { wordsToCase } = require('./convertToCase/wordsToCase');
const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase');

const paramsType = ["SNAKE", "KEBAB", "CAMEL", "PASCAL", "UPPER"];

function createServer() {
    const server = _createServer((req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const path = url.pathname.slice(1);
        const errorMessage = [];
        const response = {};

        const params = Object.fromEntries(url.searchParams.entries());

        console.log(path);
        console.log(params);
        
        if (!path) {
            errorMessage.push({message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`});
        }
        
        if (!params.toCase) {
            errorMessage.push({message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`});
        }
        
        if (params.toCase && !paramsType.includes(params.toCase)) {
            errorMessage.push({message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`});
        }
        
        if (errorMessage.length > 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ errors: errorMessage }));
            return;
        }


        response.originalCase = detectCase(path);
        response.targetCase = params.toCase;
        response.originalText = path;
        response.convertedText = convertToCase(path, params.toCase).convertedText;


        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    });

    return server;
}

module.exports = { createServer };
