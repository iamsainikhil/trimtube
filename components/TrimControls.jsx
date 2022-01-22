/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {useState, useEffect} from 'react'
import TimeInput from './TimeInput'
import formatTime from '../utils/formatTime'
import getTime from '../utils/getTime'
import {BiCut} from 'react-icons/bi'
import Button from './Button'
import {trackGAEvent} from '../utils/googleAnalytics'

const TrimControls = ({start, end, onTrim}) => {
  const [startTrimMinutes, setStartTrimMinutes] = useState(
    formatTime(start, 'Minutes')
  )
  const [startTrimSeconds, setStartTrimSeconds] = useState(
    formatTime(start, 'Seconds')
  )
  const [endTrimMinutes, setEndTrimMinutes] = useState(
    formatTime(end, 'Minutes')
  )
  const [endTrimSeconds, setEndTrimSeconds] = useState(
    formatTime(end, 'Seconds')
  )

  const handleTime = (name, type, e) => {
    const value = Number(e.target.value)
    if (name === 'start') {
      type === 'm' ? setStartTrimMinutes(value) : setStartTrimSeconds(value)
    } else {
      type === 'm' ? setEndTrimMinutes(value) : setEndTrimSeconds(value)
    }
  }

  const handleTrim = () => {
    const endTime = getTime(endTrimMinutes, endTrimSeconds)
    const trimValues = {
      start: getTime(startTrimMinutes, startTrimSeconds),
      end: endTime,
    }
    trackGAEvent(
      'video trim',
      `start: ${trimValues.start} end: ${trimValues.end}`
    )
    onTrim(trimValues)
  }

  useEffect(() => {
    setStartTrimMinutes(formatTime(start, 'Minutes'))
    setStartTrimSeconds(formatTime(start, 'Seconds'))
    setEndTrimMinutes(formatTime(end, 'Minutes'))
    setEndTrimSeconds(formatTime(end, 'Seconds'))
  }, [start, end])

  return (
    <div
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        my: 3,
        p: 3,
        borderRadius: '10px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'highlight',
        '@media (max-width: 40rem)': {
          flexFlow: 'column nowrap',
          justifyContent: 'center',
        },
      }}>
      <div
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          mx: 3,
        }}>
        <p sx={{mx: 1}}>Start</p>
        <TimeInput
          name='Start'
          type='Minute'
          time={startTrimMinutes}
          valueChange={(e) => handleTime('start', 'm', e)}
        />
        <TimeInput
          name='Start'
          type='Second'
          time={startTrimSeconds}
          valueChange={(e) => handleTime('start', 's', e)}
        />
      </div>

      <div
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          mx: 3,
        }}>
        <p sx={{mx: 1}}>End</p>
        <TimeInput
          name='End'
          type='Minute'
          time={endTrimMinutes}
          valueChange={(e) => handleTime('end', 'm', e)}
        />
        <TimeInput
          name='End'
          type='Second'
          time={endTrimSeconds}
          valueChange={(e) => handleTime('end', 's', e)}
        />
      </div>

      <p
        sx={{
          mx: 3,
        }}>
        <Button
          primary={{bg: 'shade2', color: 'text'}}
          hover={{bg: 'shade1', color: 'accent'}}
          action={handleTrim}>
          <BiCut sx={{mb: '-0.2rem', mr: 1}} />
          Trim
        </Button>
      </p>
    </div>
  )
}

export default TrimControls
