const fs = require('fs');

// reading files - 异步读取
fs.readFile('./docs/blog1.txt', (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});

// writing files - 异步写入
fs.writeFile('./docs/blog2.txt', 'hello, again', () => {
  console.log('file was written');
});

// directories - 同步 阻塞式处理
if (!fs.existsSync('./assets')) {
  fs.mkdir('./assets', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('folder created');
  });
} else {
  fs.rmdir('./assets', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('folder deleted');
  });
}

// deleting files - 同步 阻塞式处理
if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('file deleted');
  });
}
