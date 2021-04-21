/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from "classnames/bind";
import React, { FunctionComponent, useCallback, useEffect } from "react";
import useKeyboardEffect from "../../../hooks/useKeyboardEffect";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import useResponsiveCalendarScope from "../../../lib/calendar/hooks/useResponsiveCalendarScope";
import PageHeading from "../../typography/headings/PageHeading";
import CalendarTable from "../CalendarTable";
import CursorText from "../CursorText";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * A component returning different calendars depending on the specified `scope`.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const CalendarController: FunctionComponent = () => {
  const { scope } = useCalendarContext();

  switch (scope) {
    case "month":
      return <p>month</p>;
    default:
      return <CalendarTable />;
  }
};

/**
 * The main calendar component component, displaying the events.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const MainCalendar: FunctionComponent = () => {
  const {
    setScope,
    moveCursor,
  } = useCalendarContext();

  const responsiveScope = useResponsiveCalendarScope();

  const keypressCallback = useCallback(({ code }: KeyboardEvent) => {
    switch (code) {
      case "KeyW":
        setScope("week");
        break;
      case "KeyD":
        setScope("day");
        break;
      case "ArrowRight":
        moveCursor(1);
        break;
      case "ArrowLeft":
        moveCursor(-1);
        break;
      default:
    }
  }, [moveCursor, setScope]);

  useKeyboardEffect(keypressCallback);

  useEffect(() => {
    setScope(responsiveScope);
  }, [responsiveScope, setScope]);

  return (
    <div className={cx("base")}>
      <PageHeading>
        <CursorText controls="left" />
      </PageHeading>
      <CalendarController />
    </div>
  );
};

export default MainCalendar;
