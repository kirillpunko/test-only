import React from "react";
import styles from "./HistoricalCircle.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setActivePeriod } from "../../lib/TimeLineSlice";
import { RootState } from "../../store/historicalDatesProvider";

type circleType = {
  label: string;
  id: number;
};
type CirclesType = {
  circles: circleType[];
  startYear: number;
  endYear: number;
};

const circleRadius = 530 / 2;

const HistoricalCircle = ({ circles, startYear, endYear }: CirclesType) => {
  const dispatch = useDispatch();
  const activePeriod = useSelector((state: RootState) => state.timeline.activePeriod);

  const circleClickHandler = (id: number) => {
    dispatch(setActivePeriod(id));
  };

  return (
    <div className={styles.circleContainer}>
      <div className={styles.circle}>
        {circles.map((circle: circleType, index: number) => {
          const angle = (2 * Math.PI * index) / circles.length;

          const x = Math.cos(angle) * circleRadius;
          const y = Math.sin(angle) * circleRadius;
          return (
            <button
              className={`${styles.circleBtn}`}
              key={circle.id}
              onClick={() => {
                circleClickHandler(circle.id);
              }}
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: "translate(-50%, -50%)" }}
            >
              <div className={styles.circleTextContainer}>
                <div className={styles.circleNum}>{circle.id}</div>
                <div className={`${styles.circleTitle} ${activePeriod?.id === circle.id ? styles.active : ""}`}>
                  {circle.label}
                </div>
              </div>
            </button>
          );
        })}
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalCircle;
