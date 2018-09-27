const test = require('tape')
const valid = require('./validator')

const Gathering = () => {
  return {
    type: 'gathering',
    progenitor: '%WcE/QeRq1DQn5L+xP696fLq6qfIvRS4DBt4QXicas0A=.sha256',
    mentions: [
      '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
      { link: '@Chip+id+PcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519', name: 'chip' },
      { link: '@Dale+id+PcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519', name: 'id' }
    ],
    recps: [
      '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
      { link: '@Chip+id+PcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519', name: 'chip' }
    ]
  }
}

test('is-gathering', t => {
  t.true(valid(Gathering()))
  if (valid.errors) console.log(valid.errors)

  // misc keys
  t.true(valid({ type: 'gathering' }), 'type only')

  // progenitor
  const incorrectProgenitor = Gathering()
  incorrectProgenitor.progenitor = 'dog'
  t.false(valid(incorrectProgenitor), 'incorrect progenitor')

  // mentions
  const brokenMentions = Gathering()
  brokenMentions.mentions = brokenMentions.mentions[0]
  t.false(valid(brokenMentions), 'broken mentions')

  // recps
  const brokenRecps = Gathering()
  brokenRecps.recps = brokenRecps.recps[0]
  t.false(valid(brokenRecps), 'broken recps')

  t.end()
})
