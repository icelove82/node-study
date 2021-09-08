const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {
  encoding: 'utf-8',
});

const writeStream = fs.createWriteStream('./docs/blog4.txt');

// stream
readStream.on('data', (chunk) => {
  console.log('--- NEW Chunk ---');
  console.log(chunk);

  writeStream.write('\nNEW Chunk\n');
  writeStream.write(chunk);
});

// pipe
readStream.pipe(writeStream);
