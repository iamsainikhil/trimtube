/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {useState} from 'react'
// import getDuration from '../utils/videoDuration'
import TimeInput from './TimeInput'
import formatTime from '../utils/formatTime'
import getTime from '../utils/getTime'
import {BiCut} from 'react-icons/bi'

const TrimControls = ({videoInfo, start, end, onTrim}) => {
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
    // const {minutes, seconds} = getDuration(videoInfo)
    const endTime = getTime(endTrimMinutes, endTrimSeconds)
    // get video duration to just check the endTime with videoDuration
    // const videoDuration = getTime(minutes, seconds)
    const trimValues = {
      start: getTime(startTrimMinutes, startTrimSeconds),
      end: endTime,
      // end: endTime > videoDuration ? videoDuration : endTime,
    }
    onTrim(trimValues)
  }

  return (
    <div
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        my: 3,
        p: 2,
        borderRadius: '10px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'highlight',
        '@media (max-width: 40rem)': {
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          p: 3,
        },
        '@media (min-width: 50rem)': {
          py: 3,
          px: 5,
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
          type='Minutes'
          time={startTrimMinutes}
          valueChange={(e) => handleTime('start', 'm', e)}
        />
        <TimeInput
          name='Start'
          type='Seconds'
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
          type='Minutes'
          time={endTrimMinutes}
          valueChange={(e) => handleTime('end', 'm', e)}
        />
        <TimeInput
          name='End'
          type='Seconds'
          time={endTrimSeconds}
          valueChange={(e) => handleTime('end', 's', e)}
        />
      </div>

      <p
        sx={{
          mx: 3,
        }}>
        <button
          sx={{
            py: 2,
            px: 4,
            bg: 'shade2',
            color: 'text',
            fontFamily: 'medium',
            fontSize: [1, 2],
            textTransform: 'uppercase',
            letterSpacing: '2px',
            border: 'none',
            borderRadius: '2rem',
            cursor: 'pointer',
            '&:hover': {
              bg: 'shade1',
              color: 'accent',
            },
          }}
          onClick={handleTrim}>
          <BiCut sx={{mb: '-0.2rem', mr: 1}} />
          Trim
        </button>
      </p>
    </div>
  )
}

export default TrimControls
