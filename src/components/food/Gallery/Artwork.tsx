import { Message } from "../../../lib/discord/structures/shared/Message";
import React from "react";
import styled, { css } from "styled-components";
import * as breakpoints from "../../../styles/breakpoints";
import pxcmprs from "../../../lib/pxcmprs";

/**
 * A masterpiece.
 */
export class Artwork {
  publishedAt: Date;
  url: string;
  title: string;

  constructor(publishedAt: Date, url: string, title: string) {
    this.publishedAt = publishedAt;
    this.url = url;
    this.title = title;
  }

  public static fromMessage(message: Message): Artwork[] {
    return message.attachments.map(
      (attachment) =>
        new Artwork(message.createdAt, attachment.url, message.content)
    );
  }

  public getScale(min: number, max: number): number {
    const random = (this.publishedAt.getTime() % 1000) / 1000;

    return random * (max - min) + min;
  }
}

const FlyingArtworkWrapper = styled.div<{ $scale: number; $src: string }>`
  overflow: hidden;
  position: relative;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.skeleton.base};
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  box-shadow: ${({ theme }) => theme.shadows.small};

  ${({ $scale }) => css`
    width: ${`calc(${$scale} * 2rem)`};
    height: ${`calc(${$scale} * 2rem)`};

    @media (min-width: ${breakpoints.medium}) {
      width: ${`calc(${$scale} * 3rem)`};
      height: ${`calc(${$scale} * 3rem)`};
    }

    @media (min-width: ${breakpoints.large}) {
      width: ${`calc(${$scale} * 4rem)`};
      height: ${`calc(${$scale} * 4rem)`};
    }

    @media (min-width: ${breakpoints.extraLarge}) {
      width: ${`calc(${$scale} * 6rem)`};
      height: ${`calc(${$scale} * 6rem)`};
    }
  `}
`;

export const FlyingArtwork: React.FunctionComponent<{
  artwork: Artwork;
}> = ({ artwork }) => {
  const src = pxcmprs.generateUrl({
    source: artwork.url,
    width: 128,
  });

  return <FlyingArtworkWrapper $scale={artwork.getScale(1, 1.2)} $src={src} />;
};
