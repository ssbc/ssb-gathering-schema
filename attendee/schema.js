const definitions = require('ssb-schema-definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'about', 'attendee'],
  properties: {
    type: {
      type: 'string',
      pattern: '^about$'
    },
    about: { $ref: '#/definitions/messageId' },
    attendee: {
      type: 'object',
      required: 'link',
      properties: {
        link: { $ref: '#/definitions/feedId' },
        remove: { type: 'boolean' }
      }
    },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions
}
