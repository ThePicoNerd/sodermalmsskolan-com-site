import RRule from "rrule";
import CalendarEvent from "../calendar/event/CalendarEvent";
import ScheduledCalendarEvent from "../calendar/event/ScheduledCalendarEvent";
import { getHumanReadableDuration } from "../calendar/utils/humanReadable";
import Subject from "./subject";

/**
 * A class representing a period, with utilities for converting to regular calendar events.
 */
export default class Period {
  /**
   * The weekday of the period, with `0` representing **Monday**.
   */
  weekday: number;

  hour: number;

  minute: number;

  /**
   * Duration of the period in **minutes**.
   */
  duration: number;

  subject: Subject;

  room: string;

  canceled = false;

  note: string;

  collection?: string;

  /**
   * Construct a new period.
   *
   * @param {number} weekday The weekday of the period.
   * @param {number} hour The starting hour of the period.
   * @param {number} minute The starting minute of the period.
   * @param {number} duration The duration of the period in seconds.
   * @param {Subject} subject The subject in which the period is held.
   * @param {number} room The location of the period.
   */
  constructor(
    weekday: number,
    hour: number,
    minute: number,
    duration: number,
    subject: Subject,
    room: string,
  ) {
    this.weekday = weekday;
    this.hour = hour;
    this.minute = minute;
    this.duration = duration;
    this.subject = subject;
    this.room = room;
  }

  get totalMinutes(): number {
    return this.hour * 60 + this.minute;
  }

  get totalSeconds(): number {
    return this.totalMinutes * 60;
  }

  /**
   * A unique identifier, based on the period's room and time. The subject is without significance,
   * since no more than one period can be held in a room at any given time.
   *
   * @returns {string} The ID.
   */
  get id(): string {
    return `${this.room}-${this.weekday}T${getHumanReadableDuration(this.totalSeconds)}`;
  }

  first(): Date {
    // January 13th is a Monday
    return new Date(Date.UTC(2020, 0, 13 + this.weekday, this.hour, this.minute));
  }

  rrule(): RRule {
    return new RRule({
      dtstart: this.first(),
      until: new Date(Date.UTC(2022, 1, 1)),
      freq: RRule.WEEKLY,
      tzid: "Europe/Stockholm",
    });
  }

  calendarEvent(): CalendarEvent {
    return new CalendarEvent({
      duration: this.duration * 60,
      title: this.subject.name,
      shortTitle: this.subject.symbol,
      color: this.subject.color,
      location: this.room,
      canceled: this.canceled,
      tag: this.collection,
      description: this.note || (this.canceled ? "Inställd" : undefined),
    });
  }

  scheduledEvent(): ScheduledCalendarEvent {
    return new ScheduledCalendarEvent(this.rrule(), this.calendarEvent());
  }
}
