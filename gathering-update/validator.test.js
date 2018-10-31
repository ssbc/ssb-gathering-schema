const test = require('tape')
const valid = require('./validator')

const GatheringUpdate = () => {
  return {
    type: 'about',
    about: '%WcE/QeRq1DQn5L+xP696fLq6qfIvRS4DBt4QXicas0A=.sha256',
    title: 'ziva\'s birthday',
    description: 'come celebrate 1 year of life with ziva',
    location: 'our place in mirimar',
    startDateTime: {
      epoch: Date.now() + 5e6,
      silent: true,
      tz: 'Pacific/Auckland',
      valid: true
    },
    image: {
      link: '&GGEZJfKVD5NLd2l+YT8/mXbljNFM05D6iBxK+gen4+o=.sha256',
      name: 'simone.jpg',
      size: 47904,
      type: 'image/jpeg'
    },
    recps: [
      '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
      '@SomeOne+PcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519'
    ]
  }
}

test('is-gathering-update', t => {
  t.true(valid(GatheringUpdate()))
  if (valid.errors) console.log(valid.errors)

  // misc keys
  const missingStrings = GatheringUpdate()
  delete missingStrings.title
  delete missingStrings.description
  delete missingStrings.location
  t.true(valid(missingStrings), 'missing title/ description/ location')

  // startDateTime
  const missingStart = GatheringUpdate()
  delete missingStart.startDateTime
  t.true(valid(missingStart), 'missing startDateTime')

  const bareStart = GatheringUpdate()
  bareStart.startDateTime = { epoch: Date.now() }
  t.true(valid(bareStart), 'minimal startDateTime')

  const brokenStart = GatheringUpdate()
  delete brokenStart.startDateTime.epoch
  t.false(valid(brokenStart), 'startDateTime missing epoch')

  // image
  const missingImage = GatheringUpdate()
  delete missingImage.image
  t.true(valid(missingImage), 'missing image')

  const minimalImage = GatheringUpdate()
  minimalImage.image = {
    link: '&GGEZJfKVD5NLd2l+YT8/mXbljNFM05D6iBxK+gen4+o=.sha256'
  }
  t.true(valid(minimalImage), 'minimal image')

  const brokenImage = GatheringUpdate()
  delete brokenImage.image.link
  t.false(valid(brokenImage), 'broken image')

  // recps
  const brokenRecps = GatheringUpdate()
  brokenRecps.recps = { link: '@SomeOne+PcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519', name: 'chip' }
  t.false(valid(brokenRecps), 'broken recps')

  t.end()
})
