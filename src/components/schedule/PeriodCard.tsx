import { Card, CardContent } from "../basic/Card";
import React from "react";
import { SinglePeriod } from "../../lib/schedule/Period";
import styled, { keyframes } from "styled-components";
import { transparentize } from "polished";
import { useTime } from "../../hooks/time";
import { Muted } from "../basic/Typography";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useLang } from "../../hooks/lang";

dayjs.extend(relativeTime);

const waveAnimation = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-256px);
  }
`;

const WaveContainer = styled.div`
  overflow: hidden;
  height: 64px;
  padding-top: 64px;

  svg {
    animation: ${waveAnimation} 5s linear infinite;
    width: calc(100% + 256px);
  }
`;

const WavePattern = styled.pattern<{ $color: string }>`
  width: 256px;
  height: 64px;

  path {
    fill: ${({ $color, theme }) =>
      transparentize(theme.dark ? 0.75 : 0.9, $color)};
  }
`;

const Waves: React.FunctionComponent<{ color: string }> = ({ color }) => {
  return (
    <WaveContainer>
      <svg>
        <defs>
          <WavePattern
            id="waves"
            x="0"
            y="0"
            width="256"
            height="64"
            patternUnits="userSpaceOnUse"
            $color={color}
          >
            <path
              d="m 0 32 C 64 32 64 0 128 0 C 192 0 192 32 256 32 L 256 64 L 0 64 z"
              stroke="none"
            />
          </WavePattern>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#waves)" />
      </svg>
    </WaveContainer>
  );
};

export const PeriodCard: React.FunctionComponent<{
  period: SinglePeriod;
  groupName: string;
}> = ({ period }) => {
  const now = useTime(1000);
  const lang = useLang();

  const timeLeft = period.start.nextAbsolute(now).locale(lang).from(now);

  return (
    <Card $hoverable={false}>
      <CardContent>
        <h2>Nästa lektion: {period.subject.name}</h2>
        <Muted>
          {period.subject.name} {period.start.format()}–{period.end.format()} i{" "}
          {period.room} ({timeLeft}).
        </Muted>
      </CardContent>
      <Waves color={period.subject.color} />
    </Card>
  );
};
