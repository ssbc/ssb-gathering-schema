const definitions = require('ssb-schema-definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'about'],
  properties: {
    type: {
      type: 'string',
      pattern: '^about$'
    },
    about: { $ref: '#/definitions/messageId' },
    title: { type: 'string' },
    description: { type: 'string' },
    location: { type: 'string' },
    startDateTime: {
      type: 'object',
      required: ['epoch'],
      properties: {
        epoch: { type: 'integer' },
        tz: { type: 'string' }
      }
    },
    image: {
      type: 'object',
      required: ['link'],
      properties: {
        link: { $ref: '#/definitions/blobId' },
        name: { type: 'string' },
        size: { type: 'integer' },
        type: {
          type: 'string',
          pattern: '^image/\\w+$'
        }
      }
    }
  },
  definitions: definitions
}
