const test = require('tape')
const valid = require('./validator')

const Attendee = () => {
  return {
    type: 'about',
    about: '%WcE/QeRq1DQn5L+xP696fLq6qfIvRS4DBt4QXicas0A=.sha256',
    attendee: {
      link: '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
      remove: true
    },
    recps: [
      '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
      { link: '@SomeOne+PcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519', name: 'chip' }
    ]
  }
}

test('is-attendee', t => {
  t.true(valid(Attendee()), 'remove attendee')

  const withoutRemove = Attendee()
  delete withoutRemove.attendee.remove
  t.true(valid(withoutRemove), 'add attendee')

  const withoutAttendee = Attendee()
  delete withoutAttendee.attendee
  t.false(valid(withoutAttendee), 'must have attendee prop')

  const incorrectAttendee = Attendee()
  incorrectAttendee.attendee.link = 'mix'
  t.false(valid(incorrectAttendee), 'attendee.link must be a feedId')

  t.end()
})
