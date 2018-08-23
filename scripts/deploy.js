'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const signale = require('signale');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const manifestPath = './public/manifest.json';
const manifestJsonFile = fs.readFileSync(manifestPath, {
  encoding: 'utf-8',
});
const manifestJson = JSON.parse(manifestJsonFile);
const version = manifestJson.version;

signale.note(`Current local version: v${version}\n`);

inquirer
  .prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select deploy type: ',
      choices: ['patch', 'minor', 'major'],
    },
  ])
  .then(async ({ type }) => {
    const updatedVersion = updateVersion(type, version);

    manifestJson.version = updatedVersion;

    fs.writeFileSync(manifestPath, JSON.stringify(manifestJson));

    signale.note(`'New version: v${updatedVersion}\n`);

    await applyPrettier();
    signale.note(`Apply prettier to ${manifestPath}\n`);
    await releaseCommitAndPush(updatedVersion);
  });

function updateVersion(type, version) {
  const splittedVersion = version.split('.');
  const patchTarget = splittedVersion[2];
  const minorTarget = splittedVersion[1];
  const majorTarget = splittedVersion[0];

  switch (type) {
    case 'patch':
      return [majorTarget, minorTarget, Number(patchTarget) + 1].join('.');
    case 'minor':
      return [majorTarget, Number(minorTarget) + 1, 0].join('.');
    case 'major':
      return [Number(majorTarget) + 1, 0, 0].join('.');
  }
}

async function releaseCommitAndPush(version) {
  try {
    await commit(version);
    signale.success('commit completed!');
    await push();
    signale.success('push completed!');
  } catch (e) {
    signale.warn('Fail to commit or push!', e);
    return false;
  }
}

async function commit(version) {
  return exec(
    [
      `git commit`,
      `--allow-empty`,
      `-m ':tada: v${version}'`,
      `${manifestPath}`,
    ].join(' '),
  );
}

async function push() {
  return exec('git push origin master');
}

async function applyPrettier() {
  return exec('prettier --write ./public/manifest.json');
}
