module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type'],
  properties: {
    type: {
      type: 'string',
      pattern: '^gathering$'
    }
  }
}
