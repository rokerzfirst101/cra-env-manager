#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const configOverridesPath = path.join(process.cwd(), 'config-overrides.js');

if (!fs.existsSync(configOverridesPath)) {
    const defaultConfig = `
const CRAEnvPlugin = require('cra-env-manager/webpack-plugin');

module.exports = function override(config, env) {
    configs.plugins.push(new CRAEnvPlugin());

    return config;
};
    `;

    fs.writeFileSync(configOverridesPath, defaultConfig);

    console.log('Created config-overrides.js for CRA environment manager.');
}

const scriptToRun = process.argv[2];

try {
    execSync(`react-app-rewired ${scriptToRun}`, { stdio: 'inherit' });
} catch (err) {
    console.error('Failed to execute script:', err);
}