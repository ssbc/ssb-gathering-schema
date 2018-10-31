const test = require('tape')
const valid = require('./validator')

const Gathering = () => {
  return {
    'key': '%r8Ol0jrDXRdwC1QU8LMiI6eLm4i35pRYTfHg+0N7HGQ=.sha256',
    'value': {
      'previous': '%J/qLJvGH9/cbbrBlk7pLGyhPXZqOXFNLf/r84djxvkQ=.sha256',
      'sequence': 14155,
      'author': '@NeB4q4Hy9IiMxs5L08oevEhivxW+/aDu/s/0SkNayi0=.ed25519',
      'timestamp': 1540676859557,
      'hash': 'sha256',
      'content': {
        'type': 'gathering',
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
      },
      'signature': 'yNqEufDmzcrB96gVCn4/gogO6SwEJ+dYV7yTWAIyxcQNX35jH26FteJqg/VdgZ95DMdCXUu23JtRjtYhmyn7Dg==.sig.ed25519'
    }
  }
}

test('is-gathering', t => {
  t.true(valid(Gathering()), 'valid gathering')
  if (valid.errors) console.log(valid.errors)

  // misc keys
  t.true(valid({ type: 'gathering' }), 'type only')

  // progenitor
  const incorrectProgenitor = Gathering()
  incorrectProgenitor.value.content.progenitor = 'dog'
  t.false(valid(incorrectProgenitor), 'incorrect progenitor')

  // mentions
  const brokenMentions = Gathering()
  brokenMentions.value.content.mentions = ['dave']
  t.false(valid(brokenMentions), 'broken mentions')

  // recps
  const brokenRecps = Gathering()
  brokenRecps.value.content.recps = [{ link: '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519', name: 'dave' }]
  t.false(valid(brokenRecps), 'broken recps')

  t.end()
})
