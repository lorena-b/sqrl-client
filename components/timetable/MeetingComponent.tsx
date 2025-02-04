import { Flex, Tooltip } from "@chakra-ui/react"
import React from "react"
import styled from "styled-components"
import { usePreferences } from "../../src/PreferencesContext"
import { capitalize } from "../../src/utils/misc"
import { minuteOffsetToTime } from "../../src/utils/time"
import { breakdownCourseCode } from "../../src/utils/course"
import { Meeting, MeetingDeliveryMode } from "./Meeting"
import { useTranslation } from "next-i18next"

interface MeetingProps {
  meeting: Meeting
  darkText?: boolean
  twentyFour: boolean
}

const deliveryAbbreviations: {
  [k in MeetingDeliveryMode]: string
} = {
  // "online asynchronous": "OA",
  // "online synchronous": "OS",
  "in person": "IP",
  "online synchronous": "SY",
  "online asynchronous": "AY",
  "online asynchronous with in-person final": "AY*",
  "online synchronous with in-person final": "SY*",
}

const categoryAbbreviations = {
  tutorial: "tut",
  lecture: "lec",
  practical: "pra",
}

const MeetingTitle = styled.div`
  padding-right: 0.3em;
  line-height: 1.2em;
  font-size: 1.2em;

  &,
  & > * {
    font-weight: 700;
    /* line-height: 2em; */
    /* overflow-wrap: break-word; */
    /* word-wrap: break-word; */
    text-align: left;

    /* white-space: pre-wrap; */
    font-family: interstate-mono, monospace;

    @media print {
      font-size: 12pt;
      line-height: 10pt;
    }
  }

  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
`

const MeetingSuffix = styled.span<{ darkText: boolean }>`
  font-size: 0.8em;
  font-weight: 500;
`

const MeetingInformation = styled.div<{ darkText: boolean }>`
  color: ${({ darkText }) => {
    return darkText ? `#111` : `#eee`
  }};
  transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;

  width: 100%;
  height: 100%;
`

const MeetingTimes = styled.div`
  position: relative;
  top: 0.1rem;
  font-size: 0.9em;
  line-height: 1em;
  opacity: 0.8;
  transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const MeetingDelivery = styled.div``

const MiscInfo = styled.div`
  font-family: interstate-mono, monospace;
  font-weight: 700;
  font-size: 0.9em;

  position: absolute;
  bottom: 0.4rem;
  right: 0.3rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  line-height: 1.2em;
  opacity: 0.6;
`

const MeetingComponent = ({
  meeting,
  darkText = true,
  twentyFour,
}: MeetingProps) => {
  const {
    state: {
      showTimeInMeeting,
      showCourseSuffix,
      showCategory,
      showDelivery,
      showSection,
    },
  } = usePreferences()

  const meetingTitle = meeting.title

  const { department, numeral, suffix } = breakdownCourseCode(meetingTitle)

  const startTime = minuteOffsetToTime(meeting.startTime, twentyFour)
  const endTime = minuteOffsetToTime(meeting.endTime, twentyFour)

  const { t } = useTranslation("common")

  return (
    <MeetingInformation darkText={darkText}>
      <MeetingTitle>
        {department + "\u200b"}
        <div>{numeral + "\u200b"}</div>
        <MeetingSuffix
          style={{
            opacity: showCourseSuffix ? "" : 0,
            display: showCourseSuffix ? "initial" : "none",
          }}
          darkText={darkText}
        >
          {suffix}
        </MeetingSuffix>
      </MeetingTitle>
      <MeetingTimes
        style={{
          opacity: showTimeInMeeting ? "" : 0,
        }}
      >
        {startTime + "\u200b"}-{"\u200b" + endTime}
      </MeetingTimes>
      <MiscInfo>
        {showDelivery && (
          <Tooltip hasArrow label={`${capitalize(meeting.delivery)}`}>
            <MeetingDelivery style={{ cursor: "default" }}>
              {deliveryAbbreviations[meeting.delivery]}
            </MeetingDelivery>
          </Tooltip>
        )}
        {(showCategory || showSection) && (
          <Tooltip
            hasArrow
            label={
              meeting.section
                ? `${capitalize(meeting.category)} section ${meeting.section}`
                : `${capitalize(meeting.category)}`
            }
          >
            {showCategory && showSection ? (
              <Flex
                cursor="default"
                flexWrap="wrap"
                justifyContent="flex-end"
                style={{ gap: "0.2em" }}
                lineHeight="1em"
              >
                <div>{t(categoryAbbreviations[meeting.category])}</div>
                {meeting.section}
              </Flex>
            ) : showCategory ? (
              <Flex
                cursor="default"
                flexWrap="wrap"
                justifyContent="flex-end"
                style={{ gap: "0.2em" }}
                lineHeight="1em"
              >
                <div>{t(categoryAbbreviations[meeting.category])}</div>
              </Flex>
            ) : (
              <Flex
                cursor="default"
                flexWrap="wrap"
                justifyContent="flex-end"
                style={{ gap: "0.2em" }}
                lineHeight="1em"
              >
                {meeting.section}
              </Flex>
            )}
          </Tooltip>
        )}
      </MiscInfo>
    </MeetingInformation>
  )
}

export default MeetingComponent
