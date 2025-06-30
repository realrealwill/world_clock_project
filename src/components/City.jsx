import styled from "styled-components";

const StyledCity = styled.div`
  color: ${({ light, theme }) => light ? theme.color.light : theme.color.dark};
  margin-bottom: ${props => props.margin_bottom};
`

const City = (props) => {
  const { ...rest } = props
  const margin_bottom = `2rem`
  return (
    <StyledCity margin_bottom={margin_bottom} {...rest} >
    </StyledCity>
  )
}

export default City;