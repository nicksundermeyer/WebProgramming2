import { lab4 } from './lab4';

let testInstance = new lab4();

console.log('Should print contents of sample file to screen');
console.log(testInstance.syncFileRead('./sample.txt'));

console.log('Should compress file sample.txt into sample.txt.gz');
testInstance.compressFileStream('./sample.txt', './sample.txt.gz').on('finish', () => {
  console.log('Should decompress file sample.txt.gz into sample1.txt');
  testInstance.decompressFileStream('./sample.txt.gz', 'sample1.txt').on('finish', () => {
    console.log('Should print contents of decompressed file to screen');
    testInstance.asyncFileRead('./sample1.txt', data => {
      console.log(data);
      console.log('Should list contents of lab4 directory');
      testInstance.listDirectoryContents('./', files => {
        files.forEach(file => console.log(file));
      });
    });
  });
});


