import React from 'react'
import useFrame from '../hooks/useFrame'

const dpi = window.devicePixelRatio || 1

export default () => {
  const image = React.useRef(null)
  const canvas = React.useRef()
  const context = React.useRef()
  const origin = React.useRef({x: 0, y: 0})
  const startOrigin = React.useRef({x: 0, y: 0})
  const scaleDelta = React.useRef(0)
  const [canvasDimensions, setCanvasDimensions] = React.useState({width: 900, height: 800})
  const [canvasStyle, setCanvasStyle] = React.useState({width: 900, height: 800})

  const handleUpload = e => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      var img = new Image();   // Create new img element
      img.src = reader.result
      image.current = img
    }, false);
    reader.readAsDataURL(e.target.files[0])
  }

  useFrame(delta => {
    if(image.current){
      const ctx = context.current;
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      ctx.drawImage(image.current, origin.current.x, origin.current.y)
    }
  })

  React.useEffect(() => {
    const handleMouseMove = e => {
      const x = (e.clientX + startOrigin.current.x);
      const y = (e.clientY + startOrigin.current.y);
      origin.current = {x, y}
    }

    const handleMouseDown = e => {
      e.preventDefault()
      startOrigin.current = {
        x: (origin.current.x - e.clientX),
        y: (origin.current.y - e.clientY)
      }
      document.addEventListener('mousemove', handleMouseMove)
    }

    const handleMouseUp = e => {
      e.preventDefault()
      document.removeEventListener('mousemove', handleMouseMove)
    }

    const handleScroll = e => {
      scaleDelta.current += (e.deltaY * .001)
    }
    const newCanvasDimensions = {width: canvasDimensions.width * dpi, height: canvasDimensions.height * dpi}
    setCanvasDimensions(x => newCanvasDimensions)

    context.current = canvas.current.getContext("2d")
    context.current.scale(dpi,dpi)

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    window.addEventListener("wheel", handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener("wheel", handleScroll)
    }
  }, [])

  return (
    <>
      <input type="file" onChange={handleUpload} />
      <canvas ref={canvas} width={canvasDimensions.width} height={canvasDimensions.height} style={canvasStyle} ></canvas>
    </>
  )
}
