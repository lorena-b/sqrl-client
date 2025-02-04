import { chakra } from "@chakra-ui/react"
import Colour from "color"
import styled from "styled-components"

export const StyledTimetableContainer = styled(chakra.div)`
  width: 100%;
  /* overflow-x: scroll; */
  font-size: 0.625rem;
  /* background: #fafafa; */
`

export const StyledTimetable = styled.table`
  display: table;
  position: relative;
  width: calc(100% - 0.25rem);
  min-width: 450px;
  margin: 1rem;
  margin-left: 0;
  margin-top: 0;
  padding: 0;

  border-collapse: collapse;
  @media print {
    width: 100vw;
    margin: 0;
  }
`

export const StyledThead = styled.thead<{ dark: boolean }>`
    /* position: fixed;{ */
    /* position: sticky; */
    /* top: 0; */
    /* z-index: 10; */
    /* background: var(${({ dark }) =>
      dark ? "--chakra-colors-gray-500" : "--chakra-colors-gray-100"}); */

    /* &:first-of-type { */
    /*   background: transparent; */
    /* } */
  /* background: white; */
}
`

export const StyledHead = styled.tr`
  position: relative;
  /* position: fixed; */
  /* top: 5rem; */
  opacity: 0.8;
  z-index: 1;

  text-transform: uppercase;

  /* background-color: red; */
`

export const StyledTh = styled.th<{ dark: boolean; days?: number }>`
  /* z-index: 1;
    position: sticky;
    top: 0; */
  /* position: fixed; */
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(
    ${({ dark }) =>
      dark ? "--chakra-colors-gray-800" : "--chakra-colors-gray-75"}
  );
  backdrop-filter: blur(3px);

  /* &:first-child { */
  /*   background: transparent; */
  /* } */

  /* border-left: 3px solid red; */
  /* box-shadow: 0px 5px 10px -10px rgba(0, 0, 0, 0.4); */
  /* border-left: 1px solid ${({ dark }) => (dark ? `#414141` : `#e2e8f0`)}; */
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  padding: 0.6em 0;

  /* background-color: #fafafa; */

  &:first-of-type {
    border-left: none;
    opacity: 0;
  }

  &:first-of-type:not() {
    width: ${({ days = 5 }) => `calc((100% - 4em) / ${days})`};
  }
`

export const StyledTr = styled.tr<{
  size: number
  resolution: number
  dark: boolean
}>`
  & .time {
    text-align: right;
    color: rgba(0, 0, 0, 0);
    font-size: 1.4em;
    transform: scale(0.8);
    transition: color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    z-index: 10;
    background: var(
      ${({ dark }) =>
        dark ? "--chakra-colors-gray-800" : "--chakra-colors-gray-75"}
    );
    /* background: var(--chakra-colors-gray-700); */
    &:hover {
      color: ${({ dark }) =>
        dark ? `rgba(230, 230, 230, 0.6)` : `rgba(0,0,0,0.6)`};
    }
    &::after {
      content: "-";
      transform: scale(1);
      color: ${({ dark }) =>
        dark ? `rgba(255,255,255, 0.2)` : `rgba(0, 0, 0, 0.2)`};
    }
  }

  /* set line height for noninteger times */
  & td {
    line-height: ${({ size = 20 }: { size?: number }) =>
      (size / 100) * 2 + "em"};

    transition: line-height 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  /* border-bottom: 1px solid red; */

  /* &:hover::after {
        content: "";
        width: 100%;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        top: 0.1em;
        background-color: rgba(0, 0, 0, 0.6);
        border-top: 1px solid black;
    } */

  /* &::after { */
  /*   content: ""; */
  /*   position: absolute; */
  /*   left: 0; */
  /*   right: 0; */
  /*   width: 100%; */
  /*   border-bottom: 1px solid red; */
  /* } */

  &:nth-child(${({ resolution = 15 }: { resolution?: number }) =>
        `${60 / resolution}n - ${60 / resolution - 1}`}) {
    &::after {
      content: "";
      position: absolute;
      z-index: -10;
      /* left: calc(100% / 6); */
      right: 0;
      width: calc(100%);
      /* border-bottom: 1px solid red; */
      border-bottom: 1px solid
        ${({ dark }: { dark: boolean }) => (dark ? `#414141` : `#e2e8f0`)};
    }
    & td {
      line-height: var(--chakra-lineHeights-base);
    }

    position: relative;

    .time {
      transform: scale(1);
      color: ${({ dark }) => (dark ? `#dcdcdc` : `#333`)};
      font-weight: 500;

      &::after {
        content: "";
      }
    }
  }

  &:nth-child(1) {
    &::after {
      border-bottom: none;
    }
  }
`

export const StyledTbody = styled.tbody``

export const StyledTimeLabelTd = styled.td`
  width: 1px;
  font-variant-numeric: proportional-nums;
  font-family: interstate-mono, monospace;
  padding-right: 1em;
  position: relative;
  top: -0.7em;

  font-size: 1.4em;
  line-height: 1.4em;
  user-select: none;
`

export const MeetingTimeCell = styled.td<{ days: number; dark: boolean }>`
  padding: 0;
  position: relative;
  font-size: 1.2em;
  width: ${({ days = 5 }: { days: number }) => `calc((100%)  / ${days})`};

  /*   border-bottom: 1px solid */
  /*     ${({ dark }: { dark: boolean }) => (dark ? `#414141` : `#e2e8f0`)}; */

  /* } */

  /* &:nth-child(5) { */
  /* border-bottom: 1px solid */
  /*     ${({ dark }: { dark: boolean }) => (dark ? `#414141` : `#e2e8f0`)}; */

  /* } */

  /* border-right: 1px solid */
  /*     ${({ dark }: { dark: boolean }) => (dark ? `#414141` : `#e2e8f0`)}; */

  /* border-left: 1px solid */
  /*     ${({ dark }: { dark: boolean }) => (dark ? `#414141` : `#e2e8f0`)}; */

  &:first-of-type {
    border-left: none;
  }
`

export const MeetingTime = styled.div<{
  courseKey: number
  palette: keyof Palettes
  dark: boolean
  highlight: boolean
  conflict?: boolean
}>`
  position: absolute;
  top: 0.2em;
  right: 0.1em;
  bottom: 0.1em;
  left: 0.2em;

  cursor: pointer;
  /* border-radius: 0.4em; */

  &,
  & > * {
    /* flex: 1; */
    word-break: keep-all;
    /* white-space: nowrap; */
    overflow: hidden;
    text-overflow: ellipsis;
  }

  font-weight: 500;
  /* line-height: 1.5em; */

  padding: 0.4rem;

  @media (max-width: 800px) {
    padding: 0.3rem;
    padding-left: 0.4rem;
  }

  padding-right: 0.3em;
  transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
    box-shadow 0s cubic-bezier(0.645, 0.045, 0.355, 1);
  background-color: ${({ courseKey = 0, palette, dark }) =>
    courseKeyToColour(courseKey, dark, palettes[palette] as any)};

  box-shadow: ${({ highlight, dark }) => {
    if (!highlight) return `1px 1px 4px -2.6px rgba(0, 0, 0, 0.8);`

    if (!dark) return ` 0 0 0 0.1rem rgba(0,0,0,0.6)`
    return ` 0 0 0 0.1rem rgba(255, 255, 255, 0.8)`
    // if (!dark) return `inset 0 0 0 2px rgba(0,0,0,0.6)`
    // return `inset 0 0 0 2px rgba(255, 255, 255, 0.6)`
  }};

  @media print {
    font-size: 10pt;
    line-height: 14pt;
    padding: 0.6rem;
    border: ${({ conflict = false }) =>
      conflict ? "1px solid #c53030" : "1px solid black"};

    box-shadow: none !important;

    &,
    & > * {
      overflow: visible;
    }
  }
`

export const courseKeyToColour = (
  courseKey: number,
  dark: boolean,
  colours?: string[]
) => {
  const defaultColours = palettes.default
  colours = colours || defaultColours

  if (dark) colours = HSLDarken(colours)

  return colours[courseKey % colours.length]
}

// const HSLGrayscale = (colours: string[]) =>
//     colours.map((colour) => Colour(colour, "hsl").grayscale().toString())

const HSLDarken = (colours: string[]) =>
  colours.map((colour) =>
    // Colour(colour, "hsl").darken(0.75).saturate(1.2).toString()
    Colour(colour, "hsl").darken(0.7).desaturate(0.4).alpha(1).toString()
  )

const HSLAlpha = (colours: string[], alpha: number = 0.5) =>
  colours.map((colour) => Colour(colour, "hsl").alpha(alpha).toString())

export interface Palettes {
  default: string[]
  accessible: string[]
  monochrome: string[]
  rainbow: string[]
}

export const palettes: Palettes = {
  default: [
    "hsl(0, 0%, 91.76470588235294%)",
    "hsl(0, 100%, 89.01960784313725%)",
    "hsl(205.16129032258067, 100%, 93.92156862745098%)",
    "hsl(127.24137931034483, 85.29411764705883%, 86.66666666666667%)",
    // "c9f7f7",
    "hsl(242.06896551724137, 52.72727272727269%, 89.21568627450979%)",
    "hsl(207.05882352941174, 67.99999999999997%, 85.29411764705883%)",
    "hsl(14.545454545454547, 100%, 93.52941176470588%)",
    "hsl(223.33333333333334, 64.28571428571435%, 89.01960784313725%)",
    "hsl(95.625, 72.73%, 91.37%)",
    // "hsl(167.5, 63.16%, 85%)",
    // "hsl(264, 45.45454545454547%, 87.05882352941177%)",
    "#feffd7",
  ],

  accessible: [
    "hsl(115, 100%, 69.41176470588235%)",
    "hsl(241.9230769230769, 100%, 69.41176470588235%)",
    "hsl(0, 100%, 50%)",
    "hsl(120, 100%, 50%)",
    "hsl(240, 100%, 50%)",
    "hsl(180, 100%, 50%)",
  ],
  monochrome: ["hsl(0, 0%, 95%)", "hsl(0, 0%, 85%)"],
  // monochrome: HSLGrayscale([
  //     "hsl(0, 0%, 91.76470588235294%)",
  //     "hsl(44, 92.59259259259261%, 84.11764705882354%)",
  //     "hsl(205.16129032258067, 100%, 93.92156862745098%)",
  //     "hsl(127.24137931034483, 85.29411764705883%, 86.66666666666667%)",
  //     "hsl(242.06896551724137, 52.72727272727269%, 89.21568627450979%)",
  //     "hsl(207.05882352941174, 68%, 85.29411764705883%)",
  //     "hsl(14.545454545454547, 100%, 93.52941176470588%)",
  //     "hsl(223.33333333333334, 64.28571428571435%, 89.01960784313725%)",
  //     "hsl(95.625, 72.72727272727275%, 91.37254901960785%)",
  //     "hsl(167.5, 63.15789473684209%, 85.09803921568627%)",
  //     "hsl(264, 45.45454545454547%, 87.05882352941177%)",
  // ]),
  rainbow: HSLAlpha(
    [
      "#ffc6ff",
      "#ffadad",
      "#ffd6a5",
      "#fdffb6",
      "#caffbf",
      "#9bf6ff",
      "#a0c4ff",
      "#bdb2ff",
    ],
    0.7
  ),
}
