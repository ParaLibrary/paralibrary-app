import { useState, useEffect, useCallback, useRef } from "react";

function useRefreshedTime() {
  const [time, setTime] = useState(new Date());
  const refreshRate = useRef(1000);
  useEffect(() => {
    if (refreshRate.current > 0) {
      const id = setTimeout(() => setTime(new Date()), refreshRate.current);
      return () => {
        clearTimeout(id);
      };
    }
  }, [time]);

  const timeSince = useCallback(
    (date: Date) => {
      const sec = Math.floor((time.getTime() - date.getTime()) / 1000);
      if (sec < 1) {
        return "right now";
      } else if (sec === 1) {
        return "1 second ago";
      } else if (sec < 60) {
        return `${sec} seconds ago`;
      }
      refreshRate.current = 1000 * 60;
      const min = Math.floor(sec / 60);
      if (min === 1) {
        return `1 minute ago`;
      } else if (min < 60) {
        return `${min} minutes ago`;
      }
      refreshRate.current = 1000 * 60 * 60;
      const hour = Math.floor(min / 60);
      if (hour === 1) {
        return "1 hour ago";
      } else if (hour < 24) {
        return `${hour} hours ago`;
      }
      refreshRate.current = 0;
      // Don't refresh after this point, not worth it :)
      const day = Math.floor(hour / 24);
      if (day === 1) {
        return "1 day ago";
      } else if (hour < 7) {
        return `${day} days ago`;
      }
      const week = Math.floor(day / 7);
      if (week === 1) {
        return "1 week ago";
      } else {
        return `${week} weeks ago`;
      }
    },
    [time]
  );

  return timeSince;
}

export default useRefreshedTime;
