import React, {useState} from 'react';
import styled from "styled-components";
import Pointer from "./Pointer";
import City from "./City";
import Time from "./Time";
import Center from "./Center";
import Core from "./Core";

const StyledClock = styled.div`
  width: ${props => props.size};
  aspect-ratio: 1/1;
  background-color: ${({light, theme}) => light ? theme.colorBackground.light : theme.colorBackground.dark};
  color: ${({light, theme}) => light ? theme.color.light : theme.color.dark};

  border-radius: 2rem;
  padding: 2rem;
  margin: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`

const Clock = (props) => {
  const { city, timezone } = props;
  const size = '40rem'
  const [light, setLight] = React.useState(false)
  const [timeData, setTimeData] = React.useState(
    {
      dateTime: new Date(),
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      secoundDeg: 0,
      minuteDeg: 0,
      hourDeg: 0
    }
  )

  React.useEffect(() => {
    calculateTime()
    const handle = setInterval(() => {
      calculateTime()
    }, 200)
    return () => {
      clearInterval(handle)
    }
  }, [timezone, city])

  React.useEffect(() => {
    setLight(timeData.hour > 6 && timeData.hour < 18)
  }, [timeData.hour])

  const calculateTime = () => {
    const currentTime = new Date()
    const offset = timezone * 60 * 60 * 1000
    const timeWithOffset = new Date(currentTime.getTime() + offset)

    const unitDeg = 360 / 60
    const bigUnitDeg = 360 / 12

    const hour = timeWithOffset.getUTCHours()
    const minute = timeWithOffset.getUTCMinutes()
    const second = timeWithOffset.getUTCSeconds()

    setTimeData({
      dateTime: timeWithOffset,
      year: timeWithOffset.getUTCFullYear(),
      month: timeWithOffset.getUTCMonth() + 1,
      day: timeWithOffset.getUTCDate(),
      hour,
      minute,
      second,
      secoundDeg: second * unitDeg,
      minuteDeg: minute * unitDeg + second * unitDeg / 60,
      hourDeg: hour * bigUnitDeg + minute * unitDeg / 12,
    })
  }

  return (
    <StyledClock light={light} size={size}>
      <City light={light}>{city}</City>
      <Pointer light={light}>
        <Center light={light}></Center>
        <Core light={light} angle={timeData.hourDeg} pointer_width={7} pointer_light="#848484" pointer_dark="#FF6767"></Core>

        <Core light={light} angle={timeData.minuteDeg} block_size={120} pointer_light="#848484" pointer_dark="#fff"></Core>

        <Core light={light} angle={timeData.secoundDeg} pointer_width={2} block_size={150} tail={25}></Core>
      </Pointer>
      <Time light={light}>{timeData.year}-{timeData.month}-{timeData.day}-{timeData.hour}-{timeData.hour}:{timeData.minute}:{timeData.second}</Time>
    </StyledClock>
  )
}

export default Clock;