'use strict';

const fs = require('fs');
const signale = require('signale');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const manifestPath = './public/manifest.json';
const manifestJsonFile = fs.readFileSync(manifestPath, {
  encoding: 'utf-8',
});
const manifestJson = JSON.parse(manifestJsonFile);
const currentVersion = manifestJson.version;

async function removeTag(version) {
  return exec(`git tag -d ${version}`);
}

async function removeRemoteTag(version) {
  return exec(`git push -d origin ${version}`);
}

async function revert() {
  return exec(`git reset HEAD^`);
}

async function reset() {
  return exec(`git checkout -- .`);
}

async function forcedPush() {
  return exec('git push -f');
}

(async function rollback() {
  signale.info(`Rollback!`);

  await removeTag(currentVersion);
  await removeRemoteTag(currentVersion);
  await revert();
  await reset();
  await forcedPush();

  const manifestJsonFile = fs.readFileSync(manifestPath, {
    encoding: 'utf-8',
  });
  const manifestJson = JSON.parse(manifestJsonFile);
  const version = manifestJson.version;

  signale.note(`Current version: v${version}`);
})();
