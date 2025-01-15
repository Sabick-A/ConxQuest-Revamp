import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: whitesmoke;
  transition: all 0.1s ease-out;
  font-family: 'Press Start 2P', cursive;
  font-size: 20px;
  pointer-events: none;
`

function XBtn({ position }) {
  return (
    <StyledButton top={position.y - 100} left={position.x - 15}>
        <h3>X</h3>
    </StyledButton>
  )
}

export default XBtn