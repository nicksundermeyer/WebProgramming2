
import zlib from 'zlib';
import fs from 'fs';

export class lab4 {
    syncFileRead(fileName) {
        return fs.readFileSync(fileName, 'utf8');
    }

    asyncFileRead(fileName, callbackFunction) {
        fs.readFile(fileName, function (err, data) {
            if (err) return console.error(err);
            callbackFunction(data.toString());
        });
    }

    compressFileStream(inputFile, outputFile) {
        return fs.createReadStream(inputFile).pipe(zlib.createGzip()).pipe(fs.createWriteStream(outputFile));
    }

    decompressFileStream(inputFile, outputFile) {
        return fs.createReadStream(inputFile).pipe(zlib.createGunzip()).pipe(fs.createWriteStream(outputFile));
    }

    listDirectoryContents(dirName, callbackFunction) {
        return fs.readdir(dirName, function (err, data) {
            if (err) return console.error(err);
            return callbackFunction(data);
        });
    }

}