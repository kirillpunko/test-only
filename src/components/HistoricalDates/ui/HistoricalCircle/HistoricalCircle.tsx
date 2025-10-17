import React, { useEffect, useMemo, useRef } from "react";
import styles from "./HistoricalCircle.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setActivePeriod } from "../../lib/TimeLineSlice";
import gsap from "gsap";
import {IRootState} from "../../store/historicalDatesProvider";

type circleType = {
  label: string;
  slideIndex: number;
  id: number;
};
type CirclesType = {
  circles: circleType[];
  startYear: number;
  endYear: number;
  onSelectCircle: (index: number) => void;
};

const circleRadius = 530 / 2;
const ROTATION_DURATION = 0.8;

const HistoricalCircle = ({ circles, startYear, endYear, onSelectCircle }: CirclesType) => {
  const dispatch = useDispatch();
  const activePeriod = useSelector((state:IRootState) => state.timeline.activePeriod);
  const circleRef = useRef<HTMLDivElement>(null);
  const currentRotationDegRef = useRef<number>(0);
  const startYearRef = useRef<HTMLDivElement>(null);
  const endYearRef = useRef<HTMLDivElement>(null);
  const prevStartYearRef = useRef<number | null>(null);
  const prevEndYearRef = useRef<number | null>(null);

  const activeIndex = useMemo(() => {
    if (!activePeriod) return -1;
    return circles.findIndex((c) => c.id === activePeriod.id);
  }, [circles, activePeriod]);

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    gsap.set(el, { transformOrigin: "50% 50%" });
    el.style.setProperty("--rotationDeg", `0deg`);
  }, []);

  const normalizeToNearest = (current: number, target: number): number => {
    let result = target;
    while (result - current > 180) result -= 360;
    while (current - result > 180) result += 360;
    return result;
  };

  /*CIRCLE & TITLE*/
  useEffect(() => {
    const el = circleRef.current;
    if (!el || activeIndex < 0 || circles.length === 0) return;

    const anglePerIndexRad = (2 * Math.PI) / circles.length;
    const activeAngleRad = anglePerIndexRad * activeIndex;
    const desiredAngleRad = -Math.PI / 3;
    const targetRotationRad = desiredAngleRad - activeAngleRad;
    const targetRotationDeg = (targetRotationRad * 180) / Math.PI;

    const current = currentRotationDegRef.current;
    const nearestTarget = normalizeToNearest(current, targetRotationDeg);
    gsap.to(`.${styles.circleTitle}`, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.out",
    });

    gsap.to(el, {
      rotation: nearestTarget,
      duration: ROTATION_DURATION,
      ease: "power2.inOut",
      onUpdate: () => {
        currentRotationDegRef.current = gsap.getProperty(el, "rotation") as number;
        el.style.setProperty("--rotationDeg", `${currentRotationDegRef.current}deg`);
      },
      onComplete: () => {
        currentRotationDegRef.current = nearestTarget;
        el.style.setProperty("--rotationDeg", `${nearestTarget}deg`);
        const activeEl = document.querySelector(`.${styles.circleBtn}.${styles.activeBtn} .${styles.circleTitle}`);
        if (activeEl) {
          gsap.to(activeEl, {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      },
    });
  }, [activeIndex, circles.length]);

  /*YEARS*/
  useEffect(() => {
    const startEl = startYearRef.current;
    const endEl = endYearRef.current;
    if (startEl) {
      const from = prevStartYearRef.current ?? startYear;
      const obj = { val: from } as { val: number };
      gsap.to(obj, {
        val: startYear,
        duration: ROTATION_DURATION,
        ease: "power1.out",
        onUpdate: () => {
          startEl.textContent = `${Math.round(obj.val)}`;
        },
      });
    }
    if (endEl) {
      const from = prevEndYearRef.current ?? endYear;
      const obj = { val: from } as { val: number };
      gsap.to(obj, {
        val: endYear,
        duration: ROTATION_DURATION,
        ease: "power1.out",
        onUpdate: () => {
          endEl.textContent = `${Math.round(obj.val)}`;
        },
      });
    }
    prevStartYearRef.current = startYear;
    prevEndYearRef.current = endYear;
  }, [startYear, endYear]);

  const circleClickHandler = (id: number, slideIndex: number) => {
    dispatch(setActivePeriod(id));
    onSelectCircle(slideIndex);
  };

  return (
    <div className={styles.circleContainer}>
      <div className={styles.circle} ref={circleRef}>
        {circles.map((circle: circleType, index: number) => {
          const angle = (2 * Math.PI * index) / circles.length;

          const x = Math.cos(angle) * circleRadius;
          const y = Math.sin(angle) * circleRadius;
          return (
            <button
              className={`${styles.circleBtn} ${activePeriod?.id === circle.id ? styles.activeBtn : ""}`}
              key={circle.id}
              onClick={() => {
                circleClickHandler(circle.id, circle.slideIndex);
              }}
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: "translate(-50%, -50%)" }}
            >
              <div className={`${styles.circleTextContainer} ${activePeriod?.id === circle.id ? styles.active : ""}`}>
                <div className={`${styles.circleNum} ${activePeriod?.id === circle.id ? styles.active : ""}`}>
                  {circle.id}
                </div>
                <div className={`${styles.circleTitle} ${activePeriod?.id === circle.id ? styles.active : ""}`}>
                  {circle.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className={styles.yearsBlock}>
        <div className={styles.yearsBlockStart} ref={startYearRef}>
          {startYear}
        </div>
        <div className={styles.yearsBlockEnd} ref={endYearRef}>
          {endYear}
        </div>
      </div>
    </div>
  );
};

export default HistoricalCircle;
