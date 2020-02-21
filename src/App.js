import React from 'react';
import useFrame from './hooks/useFrame'
import 'normalize.css'
import './App.css';

function App() {
  const image = React.useRef(null)
  const canvas = React.useRef()
  const context = React.useRef()
  const origin = React.useRef({x: 0, y: 0})
  const startOrigin = React.useRef({x: 0, y: 0})
  const scaleDelta = React.useRef(0)

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
      ctx.save()
      ctx.scale(1 + scaleDelta.current, 1 + scaleDelta.current)
      ctx.drawImage(image.current, origin.current.x, origin.current.y)
      ctx.restore()
    }
  })

  React.useEffect(() => {
    const handleMouseMove = e => {
      // const { left, top } = canvas.current.getBoundingClientRect()
      const x = (e.clientX + startOrigin.current.x);
      const y = (e.clientY + startOrigin.current.y);
      // const x = (e.clientX + startOrigin.current.x) / (1 + scaleDelta.current);
      // const y = (e.clientY + startOrigin.current.y) / (1 + scaleDelta.current);
      origin.current = {x, y}
    }

    const handleMouseDown = e => {
      e.preventDefault()
      startOrigin.current = {
        x: (origin.current.x - e.clientX),
        y: (origin.current.y - e.clientY)
        // x: (origin.current.x - e.clientX) / (1 + scaleDelta.current),
        // y: (origin.current.y - e.clientY) / (1 + scaleDelta.current)
      }
      document.addEventListener('mousemove', handleMouseMove)
    }

    const handleMouseUp = e => {
      e.preventDefault()
      document.removeEventListener('mousemove', handleMouseMove)
    }

    const handleScroll = e => {
      scaleDelta.current += (e.deltaY * .001)
      // console.log(image.current.naturalWidth);
      // origin.current = {
      //   x: origin.current.x - (scaleDelta.current * e.clientX),
      //   y: origin.current.y - (scaleDelta.current * e.clientY)
      // }
    }

    context.current = canvas.current.getContext("2d")
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
    <div className="App">
      <h1>Canvas Test</h1>
      <input type="file" onChange={handleUpload} />
      <canvas ref={canvas} width="900" height="800" ></canvas>
    </div>
  );
}

export default App;
