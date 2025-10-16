import { timelineSegments } from "../../consts/timelineConst";
import { Swiper, SwiperSlide } from "swiper/react";
import {FreeMode, Navigation, Pagination} from "swiper/modules";
import styles from "./HistoricalDates.module.scss";
import text from "../../assets/locales/ru.json";
import HistoricalCircle from "./ui/HistoricalCircle/HistoricalCircle";
import { RootState } from "./store/historicalDatesProvider";
import { useSelector } from "react-redux";
import {useRef, useState} from "react";
import {ReactComponent as ArrowIcon} from "../../assets/arrow.svg";
import {HistoricalInnerSwiper} from "./ui/HistoricalInnerSwiper/HistoricalInnerSwiper";

const ru = text.historicalDates;

const HistoricalDates = () => {
  const activePeriod = useSelector((state: RootState) => state.timeline.activePeriod);
  const swiperRef = useRef<any>(null);

  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(timelineSegments.length);

  return (
    <div className={styles.container}>
      <h2 className={styles.timelineTitle}>{ru.title}</h2>
      <HistoricalCircle
        circles={timelineSegments.map(({label, id}) => ({label, id}))}
        startYear={activePeriod?.startYear}
        endYear={activePeriod?.endYear}
      />


      <div className={styles.timelineSwiperContainer}>
        <Swiper
          onSwiper={(swiper: { slides: string | any[]; }) => {
            swiperRef.current = swiper;
            setTotal(swiper.slides.length);
          }}
          onSlideChange={(swiper: { activeIndex: number; }) => setCurrent(swiper.activeIndex + 1)}
          slidesPerView={1}
          cssMode={true}
          modules={[Pagination, Navigation]}
          className={"my-swiper"}
        >
          {timelineSegments.map((segment, index) => (
            <SwiperSlide key={segment.id}>
              <HistoricalInnerSwiper events={segment.events}/>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.navigationPanel}>
          <div className={styles.pagination}>
            {String(current).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.navBtn}
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={current === 1}
            >
              <ArrowIcon/>
            </button>
            <button
              className={styles.navBtn }
              onClick={() => swiperRef.current?.slideNext()}
              disabled={current === total}
              style={{transform: "rotate(180deg)"}}
            >
              <ArrowIcon/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalDates;
