import { timelineSegments } from "../../consts/timelineConst";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import styles from "./HistoricalDates.module.scss";
import text from "../../assets/locales/ru.json";
import HistoricalCircle from "./ui/HistoricalCircle/HistoricalCircle";
import { IRootState } from "./store/historicalDatesProvider";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import { HistoricalInnerSwiper } from "./ui/HistoricalInnerSwiper/HistoricalInnerSwiper";
import gsap from "gsap";
import { setActivePeriod } from "./lib/TimeLineSlice";
import {useCheckWindowSize} from "../../utils/useCheckWindowSize";

const ru = text.historicalDates;

const HistoricalDates = () => {
  const activePeriod = useSelector((state: IRootState) => state.timeline.activePeriod);
  const swiperRef = useRef<any>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const {isWindowWidthLower, isWindowHeightLower} = useCheckWindowSize();

  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(timelineSegments.length);

  const animateSlideChange = (targetIndex: number) => {
    const container = fadeRef.current;
    const swiper = swiperRef.current;
    if (!container || !swiper) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 0.8 },
    });

    tl.to(container, {
      opacity: 0,
      onComplete: () => {
        swiper.slideTo(targetIndex, 0);
        gsap.to(container, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      },
    });
  };

  const handleSlide = (direction: "next" | "prev") => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const targetIndex = direction === "next" ? swiper.activeIndex + 1 : swiper.activeIndex - 1;
    if (targetIndex < 0 || targetIndex >= timelineSegments.length) return;
    const newPeriod = timelineSegments[targetIndex];

    dispatch(setActivePeriod(newPeriod.id));
    animateSlideChange(targetIndex);
    setCurrent(targetIndex + 1);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.timelineTitle}>{ru.title}</h2>
      <HistoricalCircle
        circles={timelineSegments.map(({ label, id, slideIndex }) => ({ label, id, slideIndex }))}
        startYear={activePeriod?.startYear}
        endYear={activePeriod?.endYear}
        onSelectCircle={animateSlideChange}
      />

      <div className={styles.timelineSwiperContainer}>
        <div ref={fadeRef}>
          <Swiper
            speed={0}
            initialSlide={0}
            onSwiper={(swiper: { slides: string | any[] }) => {
              swiperRef.current = swiper;
              setTotal(swiper.slides.length);
            }}
            slidesPerView={1}
            cssMode={true}
            freeMode={true}
            modules={[Navigation, FreeMode]}
            className={"my-swiper"}
          >
            {timelineSegments.map((segment) => (
              <SwiperSlide key={segment.id}>
                <HistoricalInnerSwiper events={segment.events} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {(isWindowWidthLower(780) || isWindowHeightLower(890)) &&
            <div className={styles.paginationDots}>
              {timelineSegments.map((_, index) => (
                <span
                  key={_.id}
                  className={`${styles.dot} ${current === index + 1 ? styles.activeDot : ""}`}
                  onClick={() => {
                    dispatch(setActivePeriod(_.id));
                    animateSlideChange(_.slideIndex);
                    setCurrent(index + 1);
                  }}
                />
              ))}
            </div>
        }
        <div className={styles.navigationPanel}>
          <div className={styles.pagination}>
            {String(current).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </div>
          <div className={styles.buttons}>
            <button className={styles.navBtn} onClick={() => handleSlide("prev")} disabled={current === 1}>
              <ArrowIcon />
            </button>
            <button
              className={styles.navBtn}
              onClick={() => handleSlide("next")}
              disabled={current === total}
              style={{ transform: "rotate(180deg)" }}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalDates;
