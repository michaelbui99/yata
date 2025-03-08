import * as path from 'path';
import * as fs from 'fs-extra';

console.log("Moving yata-client dist...")
fs.moveSync(path.resolve("./yata-client/dist/yata-client"), path.resolve('./yata-server/dist/yata-client'));
console.log("Post build completed.")
