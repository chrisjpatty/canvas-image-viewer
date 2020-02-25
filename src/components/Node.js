import React from 'react';
import { Rect, Group, Text } from 'react-konva';
import { StageContext } from '../context'
// import Konva from 'konva';

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const Node = ({ title: lowerTitle }) => {
  const title = lowerTitle.toUpperCase()
  const stage = React.useContext(StageContext)
  const [width, setWidth] = React.useState(200)
  const [height, setHeight] = React.useState(140)
  const [origin, setOrigin] = React.useState({x: 20, y: 20})

  return (
    <Group
      x={20}
      y={20}
      draggable
      dragBoundFunc={pos => ({
        x: Math.ceil(pos.x / 20) * 20,
        y: Math.ceil(pos.y / 20) * 20
      })}
      onDragEnd={e => {
        if(e.target.attrs.name !== "resize-handle"){
          setOrigin({
            x: Math.ceil(e.target.attrs.x / 20) * 20,
            y: Math.ceil(e.target.attrs.y / 20) * 20
          })
        }
      }}
    >
      <Rect
        name="node-body"
        width={width}
        height={height}
        shadowOffsetY={10}
        shadowColor="rgba(0,0,0,.3)"
        shadowBlur={20}
        fill="#c0c3c9"
        cornerRadius={5}
        onMouseEnter={stage.resetCursor}
        onMouseLeave={stage.resetCursor}
      />
      <Rect
        name="title-background"
        fill="#a7a9af"
        cornerRadius={[5,5,0,0]}
        x={0}
        y={0}
        width={width}
        height={26}
      />
      <Text
        x={7}
        y={7}
        text={title}
        fontSize={14}
        fontStyle="bold"
      />
      <Rect
        name="resize-handle"
        x={190}
        y={height - 10}
        width={12}
        height={12}
        fill=""
        cornerRadius={3}
        draggable
        dragBoundFunc={pos => {
          setWidth(clamp((Math.ceil(pos.x / 20) * 20) - origin.x, 180, 1000))
          setHeight(clamp((Math.ceil(pos.y / 20) * 20) - origin.y, 140, 1000))
          return {
            x: clamp((Math.ceil(pos.x / 20) * 20) - 10, origin.x + 170, origin.x + 1000),
            y: clamp((Math.ceil(pos.y / 20) * 20) - 10, origin.y + 130, origin.y + 1000)
          }
        }}
        onDragStart={() => stage.setCursor("nwse-resize")}
        onDrageEnd={stage.resetCursor}
        onMouseEnter={() => stage.setCursor("nwse-resize")}
        onMouseLeave={stage.resetCursor}
      />
    </Group>
  )
}

export default Node
