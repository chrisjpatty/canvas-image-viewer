import React from 'react'

const useFrame = onFrame => {
  React.useEffect(() => {
    let shouldContinue = true;
    const frame = delta => {
      onFrame(delta)
      if(shouldContinue){
        window.requestAnimationFrame(frame)
      }
    }
    window.requestAnimationFrame(frame)
    return () => {
      shouldContinue = false;
    }
  }, [onFrame])
}

export default useFrame
