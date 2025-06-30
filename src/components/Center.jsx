import React from 'react'
import styled from 'styled-components'


const StyledCenter = styled.div`
  width: ${props => props.size};
  aspect-ratio: 1/1;
  background: ${props => props.bg};
  border-radius: 50%;
  border: ${props => props.border};
  z-index: 10;
`

const Center = (props) => {
  const { ...rest } = props
  const config = {
    size: "15px",
    bg: "#848484",
    border: "2px solid #fff"
  }
  return <StyledCenter {...config} {...rest} />

}

export default Center