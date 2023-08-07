import React from 'react'
import './Crosshair.module.css'

export const Crosshair = () => {
  return (
    <span style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontSize: 28,
      fontWeight: 600
    }}>+</span>
  )
}
