#!/usr/bin/env node
import fs from 'fs';

var index = fs.readFileSync('index.html', 'utf-8'),
	footer = fs.readFileSync('src/footer.inc.html', 'utf-8');

index = index.replace('</body>', '\n'+footer+'\n</body>');
index = index.replace('</head>', '  <link rel="me" href="https://github.com/regorxxx">\n</head>');
index = index.replace('<body>', '<body><div class="wrap">');
index = index.replace('</body>', '</div></body>');

fs.writeFileSync('index.html', index);
