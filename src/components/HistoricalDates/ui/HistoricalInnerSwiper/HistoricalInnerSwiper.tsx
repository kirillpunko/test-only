import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./HistoricalinnerSwiper.module.scss";
import {ReactComponent as ArrowIcon} from "../../../../assets/arrow.svg";

interface EventItem {
  id: number;
  year: number;
  description: string;
}

interface InnerSwiperProps {
  events: EventItem[];
}

export const HistoricalInnerSwiper = ({ events }: InnerSwiperProps) => {
  return (
    <div className={styles.innerSwiperContainer}>
      <div className={styles.navButtonPrev}>
        <ArrowIcon/>
      </div>
      <div className={styles.navButtonNext} style={{transform: "rotate(180deg)"}}>
        <ArrowIcon/>
      </div>

      <Swiper
        modules={[FreeMode, Navigation]}
        freeMode={true}
        spaceBetween={60}
        slidesPerView={"auto"}
        grabCursor={true}
        navigation={{
          nextEl: `.${styles.navButtonNext}`,
          prevEl: `.${styles.navButtonPrev}`,
        }}

      >
        {events.map((event) => (
          <SwiperSlide key={event.id} className={styles.slide}>
            <span className={styles.year}>{event.year}</span>
            <p className={styles.text}>{event.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
