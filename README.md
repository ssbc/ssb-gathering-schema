# ssb-gathering-schema

## Usage


```js
var { isGathering, isGatheringUpdate, isAttendee } = require('ssb-gathering-schema')

isGathering(msg)
// => true
```

## Schemas

schemas describe the `content` section of messages

### gathering

```js
{
  type: gathering,
  progenitor: MessageId  // (optional) the thing that spawned this gathering
  mentions: Array,       // (optional) people to notify
  recps: Array           // (optional) private recipients
}
```

`mentions` / `recps` entries each a `FeedId`, or a 'link' object: `{ link: FeedId, name: String}`


### gathering-update (type: `about`)

Updates to the details of a gathering are about messages with some / all of the following attributes.
(everything but `type` and `about` are optional)

```js
{
  type: 'about'
  about: MessageId,     // gathering
  title: String,        // (optional)
  description: String,  // (optional)
  location: String,     // (optional)
  startDateTime: {      // (optional)
    epoch: Integer,       // unix time
    tz: TimeZoneString,   // *
    bias: Integer         // * ?
    silent: Boolean       // * ?
  },
  image: {              // (optional)
    link: BlobId,
    name: String,
    size: Integer,
    type: MimeType
  },
  recps: Array          // (optional)
}
```

`recps` entries each a `FeedId`, or a 'link' object: `{ link: FeedId, name: String}`

### attendee (type: `about`)

```js
{
  type: 'about',
  about: MessageId, // gathering
  attendee: {
    link: FeedId    // can be about another person!
    remove: true    // (optional)
  },
  recps: Array      // (optional)
}
```

`recps` entries each a `FeedId`, or a 'link' object: `{ link: FeedId, name: String}`
