const fs = require('fs');
const inquirer = require('inquirer');
const signale = require('signale');

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
  .then(({ type }) => {
    const updatedVersion = updateVersion(type, version);

    manifestJson.version = updatedVersion;

    fs.writeFileSync(manifestPath, JSON.stringify(manifestJson));

    signale.note(`'Version update complete: v${updatedVersion}\n`);
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
      return [majorTarget, Number(minorTarget) + 1, patchTarget].join('.');
    case 'major':
      return [Number(majorTarget) + 1, minorTarget, patchTarget].join('.');
  }
}
