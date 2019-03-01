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

signale.note(`Current version: v${version}`);

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

    signale.note(`=> New version: v${updatedVersion}\n`);

    await applyPrettier();
    signale.note(`Complete to update version. start to release!\n`);
    await release(updatedVersion);
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

async function release(version) {
  try {
    await commit(version);
    await tag(version);
    await push();
    await pushTag();
    signale.success('release completed!');
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
  return exec('git push');
}

async function tag(version) {
  return exec(`git tag ${version}`);
}

async function pushTag() {
  return exec(`git push --tags`);
}

async function applyPrettier() {
  return exec('prettier --write ./public/manifest.json');
}
