"use client";
import React, { useEffect, useState } from "react";
import styles from "./ClinicHours.module.css";

interface Timing {
  dayName: string;
  hours: string;
  isOpenDay: boolean;
  dayIndex: number; // 0 for Sun, 1 for Mon, etc.
}

const timingsData: Timing[] = [
  { dayName: "Monday", hours: "9:00 AM - 7:00 PM", isOpenDay: true, dayIndex: 1 },
  { dayName: "Tuesday", hours: "9:00 AM - 7:00 PM", isOpenDay: true, dayIndex: 2 },
  { dayName: "Wednesday", hours: "9:00 AM - 7:00 PM", isOpenDay: true, dayIndex: 3 },
  { dayName: "Thursday", hours: "9:00 AM - 7:00 PM", isOpenDay: true, dayIndex: 4 },
  { dayName: "Friday", hours: "9:00 AM - 7:00 PM", isOpenDay: true, dayIndex: 5 },
  { dayName: "Saturday", hours: "9:00 AM - 7:00 PM", isOpenDay: true, dayIndex: 6 },
  { dayName: "Sunday", hours: "Closed", isOpenDay: false, dayIndex: 0 },
];

export default function ClinicHours() {
  const [mounted, setMounted] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [currentDayIdx, setCurrentDayIdx] = useState(-1);

  useEffect(() => {
    let active = true;

    // Defer state update to next tick to avoid synchronous setState inside useEffect warning
    const timeoutId = setTimeout(() => {
      if (active) setMounted(true);
    }, 0);

    const checkClinicStatus = () => {
      // Calculate Indian Standard Time (IST: UTC + 5:30)
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utcTime + 3600000 * 5.5);

      const day = istTime.getDay(); // 0-6
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const timeInMinutes = hours * 60 + minutes;

      // 9:00 AM is 540 minutes, 7:00 PM is 1140 minutes
      const openTime = 9 * 60;
      const closeTime = 19 * 60;

      if (active) {
        setCurrentDayIdx(day);

        if (day >= 1 && day <= 6) {
          if (timeInMinutes >= openTime && timeInMinutes < closeTime) {
            setIsOpenNow(true);
          } else {
            setIsOpenNow(false);
          }
        } else {
          setIsOpenNow(false);
        }
      }
    };

    checkClinicStatus();
    const interval = setInterval(checkClinicStatus, 60000); // refresh every minute

    return () => {
      active = false;
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.hoursCard}>
      <div className={styles.statusHeader}>
        <span
          className={`${styles.statusDot} ${
            mounted && isOpenNow ? styles.statusDotOpen : styles.statusDotClosed
          }`}
          aria-hidden="true"
        />
        <h3
          className={`${styles.statusTitle} ${
            mounted && isOpenNow ? styles.statusTitleOpen : styles.statusTitleClosed
          }`}
        >
          {mounted ? (isOpenNow ? "Open Now" : "Clinic Closed") : "Loading Timings..."}
        </h3>
      </div>

      <div className={styles.timingsList}>
        {timingsData.map((t) => {
          const isActive = mounted && currentDayIdx === t.dayIndex;
          return (
            <div
              key={t.dayName}
              className={`${styles.timingRow} ${isActive ? styles.timingRowActive : ""}`}
            >
              <span className={styles.dayName}>
                {t.dayName} {isActive && "•"}
              </span>
              <span className={styles.timeText}>{t.hours}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
