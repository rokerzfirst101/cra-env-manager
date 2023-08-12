import * as fs from 'fs';
import * as path from 'path';
import { Compiler } from "webpack";

interface CRAEnvPluginOptions {
    includedEnvs?: string[];
 }

class CRAEnvPlugin {
    private includedEnvs: string[] = [];

    constructor() {
        const packageJsonPath = path.resolve(process.cwd(), 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = require(packageJsonPath)
            if (packageJson.craEnvManager && Array.isArray(packageJson.craEnvManager.includedEnvs)) {
                this.includedEnvs = packageJson.craEnvManager.includedEnvs;
            }
        }
    }

    apply(compiler: Compiler) {
        compiler.hooks.emit.tapAsync('CRAEnvPlugin', (_compilation, callback) => {
            const allEnvs = process.env;

            const envsToInclude: { [key: string]: string | undefined } = {};
            this.includedEnvs.forEach((envKey) => {
                envsToInclude[envKey] = allEnvs[envKey]
            })

            const envs = JSON.stringify(envsToInclude, null, 2);
            const content = `window.env = ${envs};`;

            fs.writeFileSync(path.resolve(process.cwd(), 'public/.well-known/environment.js'), content);

            callback();
        })
    }
}

export default CRAEnvPlugin;