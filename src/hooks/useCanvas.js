import React from 'react'

export const canvasContext = React.createContext()
let contextObject = {}

export const CanvasProvider = ({children}) => {
  const canvas = React.useRef()
  const context = React.useRef()
  const [canvasDimensions, setCanvasDimensions] = React.useState({width: 900, height: 800})
  const [canvasStyle, setCanvasStyle] = React.useState({width: 900, height: 800})
  contextObject.canvas = canvas.current
  contextObject.context = context.current

  return <canvasContext.Provider value={contextObject}>{children}</canvasContext.Provider>
}

export default props => {


  return <canvas {...props} />
}
