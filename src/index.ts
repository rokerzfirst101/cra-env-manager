import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const loadEnvs = (): void => {
    if (process.env.NODE_ENV === "development") {
        dotenv.config();
    } else {
        const envFilePath = path.resolve(process.cwd(), 'public/.well-known/environment.js');

        if (fs.existsSync(envFilePath)) {
            const envData: NodeJS.ProcessEnv = require(envFilePath) as NodeJS.ProcessEnv;

            Object.keys(envData).forEach(key => {
                process.env[key] = envData[key];
            });
        }
    }
};

module.exports = loadEnvs;
