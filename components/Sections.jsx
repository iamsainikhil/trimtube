import React from 'react'
import Section from './Section'
import stepsData from '../constants/stepsData'

const Sections = () => {
  return (
    <div>
      {stepsData.map((step, index) => (
        <Section key={index} position={index} data={step} />
      ))}
    </div>
  )
}

export default Sections
