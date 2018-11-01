const test = require('tape')
const definitions = require('ssb-schema-definitions')

var Validator = require('../lib/build-validator')

test('feed', t => {
  var schema = {
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['feed'],
    properties: {
      mentions: { $ref: '#/definitions/mentions/feed' }
    },
    definitions
  }

  const eg = {
    progenitor: '%xreTFMVpQZDpgpu/mH+jYHtUtp3ucYd0GzfXGwm8du8=.sha256',
    feed: {
      'link': '@NeB4q4Hy9IiMxs5L08oevEhivxW+/aDu/s/0SkNayi0=.ed25519',
      'name': 'dan hassan'
    },
    recps: [
      '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
      '@Chip+id+PcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519'
    ]
  }

  const valid = Validator(schema)

  t.true(valid(eg), 'valid feed')
  if (!valid(eg)) console.log(valid.errors)
  t.end()
})

test('mentions:feed', t => {
  var schema = {
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['mentions'],
    properties: {
      mentions: {
        type: 'array',
        items: { $ref: '#/definitions/mentions/feed' }
      }
    },
    definitions
  }

  const eg = {
    'progenitor': '%xreTFMVpQZDpgpu/mH+jYHtUtp3ucYd0GzfXGwm8du8=.sha256',
    'mentions': [
      {
        'link': '@NeB4q4Hy9IiMxs5L08oevEhivxW+/aDu/s/0SkNayi0=.ed25519',
        'name': 'dan hassan'
      },
      {
        'link': '@MpDd66GPXgN1+eMNrZInHkWq1THMurWwLdMx8BZ1ncw=.ed25519',
        'name': 'kieran'
      },
      {
        'link': '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
        'name': 'mix'
      },
      {
        'link': '@vEJe4hdnbHJl549200IytOeA3THbnP0oM+JQtS1u+8o=.ed25519',
        'name': 'peg'
      }
    ],
    recps: [
      '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
      '@Chip+id+PcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519'
    ]
  }

  const valid = Validator(schema)

  t.true(valid(eg), 'valid mentions')
  if (!valid(eg)) console.log(valid.errors)
  t.end()
})

test('mentions:any', t => {
  var schema = {
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['mentions'],
    properties: {
      mentions: { $ref: '#/definitions/mentions/any' }
    },
    definitions
  }

  const eg = {
    'progenitor': '%xreTFMVpQZDpgpu/mH+jYHtUtp3ucYd0GzfXGwm8du8=.sha256',
    'mentions': [
      {
        'link': '@NeB4q4Hy9IiMxs5L08oevEhivxW+/aDu/s/0SkNayi0=.ed25519',
        'name': 'dan hassan'
      },
      {
        'link': '@MpDd66GPXgN1+eMNrZInHkWq1THMurWwLdMx8BZ1ncw=.ed25519',
        'name': 'kieran'
      },
      {
        'link': '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
        'name': 'mix'
      },
      {
        'link': '@vEJe4hdnbHJl549200IytOeA3THbnP0oM+JQtS1u+8o=.ed25519',
        'name': 'peg'
      }
    ],
    recps: [
      '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
      '@Chip+id+PcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519'
    ]
  }

  const valid = Validator(schema)

  t.true(valid(eg), 'valid mentions')
  if (!valid(eg)) console.log(valid.errors)
  t.end()
})
