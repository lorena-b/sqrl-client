import {
    MeetingDeliveryMode,
    MeetingCategoryType,
    Meeting,
} from "./components/timetable/Meeting"
import { Course } from "./Course"
import { UserMeeting } from "./SqrlContext"
import { Day, timeToMinuteOffset } from "./utils/time"

const standardMeetingDays = {
    MO: Day.MONDAY,
    TU: Day.TUESDAY,
    WE: Day.WEDNESDAY,
    TH: Day.THURSDAY,
    FR: Day.FRIDAY,
}

const standardMeetingDeliveryMode = {
    ONLSYNC: MeetingDeliveryMode.OnlineSync,
    ONLASYNC: MeetingDeliveryMode.OnlineAsync,
    CLASS: MeetingDeliveryMode.InPerson,
}

const standardMeetingCategoryType = {
    TUT: MeetingCategoryType.Tutorial,
    LEC: MeetingCategoryType.Lecture,
}

const MeetingsFabricator = (
    courses: Course[],
    userMeetings: { [key: string]: UserMeeting },
    section: "F" | "S" | "Y"
): Meeting[] => {
    let meetings: Meeting[] = []

    for (const [index, course] of courses.entries()) {
        if (
            section !== "Y" &&
            course.section !== "Y" &&
            course.section !== section
        )
            continue
        for (const [userCourse, userMeeting] of Object.entries(userMeetings)) {
            if (course.courseId !== userCourse) continue

            for (const meetingName of Object.values(userMeeting)) {
                const meeting = course.meetings[meetingName]
                for (const schedule of Object.values(meeting.schedule)) {
                    const day =
                        standardMeetingDays[
                            schedule.meetingDay as
                                | "MO"
                                | "TU"
                                | "WE"
                                | "TH"
                                | "FR"
                        ]
                    // TODO Handle case where meetingStartTime is null
                    const startTime = schedule.meetingStartTime
                        .split(":")
                        .map((time) => parseInt(time))
                    const endTime = schedule.meetingEndTime
                        .split(":")
                        .map((time) => parseInt(time))

                    meetings.push(
                        new Meeting(
                            day,
                            timeToMinuteOffset(startTime[0], startTime[1]),
                            timeToMinuteOffset(endTime[0], endTime[1]),
                            course.code,
                            index + 1,
                            standardMeetingDeliveryMode[
                                meeting.deliveryMode as
                                    | "ONLSYNC"
                                    | "ONLASYNC"
                                    | "CLASS"
                            ],
                            standardMeetingCategoryType[
                                meeting.teachingMethod as "TUT" | "LEC"
                            ],
                            meeting.sectionNumber
                        )
                    )
                }
            }
        }
    }

    return meetings
}

export default MeetingsFabricator