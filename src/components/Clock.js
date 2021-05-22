import React from "react";
import styled from "styled-components";

import useTime from "../hooks/useTime";

const TimeWrapper = styled.div`
  float: right;
  display: inline-flex;
  align-items: center;
  height: 50px;
`;

export default function Clock() {
  const time = useTime();
  return <TimeWrapper>{time}</TimeWrapper>;
}
