import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(frenchStrings);

const LastSeen = ({date, ...props}) => (
  <TimeAgo date={date} formatter={formatter} />
)

export default LastSeen;