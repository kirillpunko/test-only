// HistoricalTimeline.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { timelineSegments } from "../../consts/timelineConst";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./HistoricalDates.module.scss";
import text from "../../assets/locales/ru.json";
import HistoricalCircle from "./ui/HistoricalCircle/HistoricalCircle";
import HistoricalDatesProvider, { RootState } from "./store/historicalDatesProvider";
import { useSelector } from "react-redux";

// Константы
const SEGMENTS_COUNT = timelineSegments.length;
const SEGMENT_ANGLE = 360 / SEGMENTS_COUNT; // Угол между точками (для 4 точек это 90 градусов)
const RADIUS = 150; // Радиус окружности для размещения точек

const ru = text.historicalDates;

const getPointPosition = (index: number) => {
  const angleDeg = -90 + index * SEGMENT_ANGLE;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: RADIUS * Math.cos(angleRad),
    y: RADIUS * Math.sin(angleRad),
  };
};

const HistoricalDates = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSegment = timelineSegments[activeIndex];
  const activePeriod = useSelector((state: RootState) => state.timeline.activePeriod);
  // Рефы для GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  // Реф для Swiper API (нужен для навигации)
  const swiperRef = useRef<any>(null);

  // Используем useGSAP для создания контекста GSAP, который автоматически очищается
  useGSAP(
    () => {
      const circleElement = circleRef.current;
      const yearsElement = yearsRef.current;

      if (!circleElement || !yearsElement) return;

      // 1. Инициализация точек на окружности и текста сегментов
      gsap.set(".timeline__dot", {
        x: (i) => getPointPosition(i).x,
        y: (i) => getPointPosition(i).y,
        transformOrigin: "50% 50%",
      });

      // 2. Создание таймлайна для анимации вращения
      timelineRef.current = gsap.timeline({
        defaults: { duration: 0.5, ease: "power2.inOut" },
      });

      // Инициализируем поворот в соответствии с активным индексом.
      // -90 для компенсации, чтобы первая точка была сверху.
      const initialRotation = -activeIndex * SEGMENT_ANGLE;

      // Устанавливаем начальное положение
      gsap.set(circleElement, { rotation: initialRotation });
      gsap.set(yearsElement.children, { opacity: 0 }); // Скрываем годы по умолчанию

      // Первая анимация (после монтирования)
      timelineRef.current
        .to(yearsElement, { opacity: 1, duration: 0.3 }, 0)
        .fromTo(yearsElement.children[1], { x: 50 }, { x: 0, opacity: 1, duration: 0.5 }, 0.2) // Конечный год (розовый)
        .fromTo(yearsElement.children[0], { x: -50 }, { x: 0, opacity: 1, duration: 0.5 }, 0.2); // Начальный год (синий)
    },
    { scope: containerRef, dependencies: [] } // Зависимости пустые, чтобы запускалось только при монтировании
  );

  // Функция для анимации при смене активного сегмента
  const animateSegmentChange = useCallback(
    (newIndex: number) => {
      const targetRotation = -newIndex * SEGMENT_ANGLE;

      // Анимация вращения круга
      gsap.to(circleRef.current, {
        rotation: targetRotation,
        duration: 0.7,
        ease: "power2.inOut",
      });

      // Анимация исчезновения и появления годов
      const years = yearsRef.current?.children;
      if (years) {
        gsap
          .timeline({ defaults: { duration: 0.3, ease: "power1.inOut" } })
          .to(years, { opacity: 0, y: (i) => (i === 0 ? 20 : -20) }) // Скрываем сдвигом
          .set(years, {
            y: (i) => (i === 0 ? -20 : 20),
            onComplete: () => {
              // Обновляем состояние после завершения анимации исчезновения
              setActiveIndex(newIndex);
            },
          })
          .to(years, { opacity: 1, y: 0, stagger: 0.1, delay: 0.1 }); // Показываем новый год
      }
    },
    [SEGMENT_ANGLE]
  );

  // Эффект для автоматической прокрутки Swiper при смене сегмента
  useEffect(() => {
    if (swiperRef.current?.swiper) {
      // Сброс слайдера на первый слайд при смене сегмента
      swiperRef.current.swiper.slideTo(0, 0);
    }
  }, [activeIndex]);

  return (
    <HistoricalDatesProvider>
      <div className={styles.container} ref={containerRef}>
        <h2 className={styles.timelineTitle}>{ru.title}</h2>
        <HistoricalCircle
          circles={timelineSegments.map(({ label, id }) => ({ label, id }))}
          startYear={activePeriod?.startYear}
          endYear={activePeriod?.endYear}
        />

        {/* Метка и индекс сегмента */}
        <div className={styles["timeline__segment-info"]}>
          <span className={styles["timeline__segment-index"]}>
            {activeSegment.id.toString().padStart(2, "0")}/{SEGMENTS_COUNT.toString().padStart(2, "0")}
          </span>
          <span className={styles["timeline__segment-label"]}>{activeSegment.label}</span>
        </div>

        <div className={styles["timeline__visual-area"]}>
          <div className={styles["timeline__circle-container"]}>
            {/* Контейнер для вращения */}
            <div className={styles["timeline__circle-rotator"]} ref={circleRef}>
              {/* Точки навигации */}
              {timelineSegments.map((segment, index) => {
                const isActive = index === activeIndex;
                const pointPosition = getPointPosition(index);
                return (
                  <div
                    key={segment.id}
                    className={styles[`timeline__dot ${isActive ? "timeline__dot--active" : ""}`]}
                    style={{
                      transform: `translate(${pointPosition.x}px, ${pointPosition.y}px)`,
                    }}
                    onClick={() => handleDotClick(index)}
                  >
                    {isActive && <div className={styles["timeline__dot-indicator"]} />}
                  </div>
                );
              })}
            </div>

            {/* Годы (не вращаются) */}
            <div className={styles["timeline__years"]} ref={yearsRef}>
              <div className={styles["timeline__year timeline__year--start"]}>{activeSegment.startYear}</div>
              <div className={styles["timeline__year timeline__year--end"]}>{activeSegment.endYear}</div>
            </div>
          </div>
        </div>

        {/* Стрелки переключения сегментов */}
        <div className={styles["timeline__segment-controls"]}>
          <button
            className={styles["timeline__segment-prev"]}
            onClick={handlePrevSegment}
            aria-label={"Предыдущий временной отрезок"}
          >
            &lt;
          </button>
          <button
            className={styles["timeline__segment-next"]}
            onClick={handleNextSegment}
            aria-label="Следующий временной отрезок"
          >
            &gt;
          </button>
        </div>

        {/* Слайдер событий (Swiper.js) */}
        <div className={styles["timeline__swiper-wrapper"]}>
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={false}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4, // До 4 событий, как в примере
              },
            }}
            // Для кастомной навигации и пагинации
            navigation={{
              prevEl: ".timeline__swiper-prev",
              nextEl: ".timeline__swiper-next",
            }}
            pagination={{ clickable: true }}
            className={styles["timeline-swiper"]}
          >
            {activeSegment.events.map((event) => (
              <SwiperSlide key={event.id} className={styles["timeline-swiper__slide"]}>
                <div className={styles["event-card"]}>
                  <span className={styles["event-card__year"]}>{event.year}</span>
                  <p className={styles["event-card__description"]}>{event.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Кастомная навигация Swiper */}
          <div className={styles["timeline__swiper-nav"]}>
            <button
              className={styles["timeline__swiper-prev"]}
              onClick={handleSwiperPrev}
              aria-label="Предыдущее событие"
            >
              &lt;
            </button>
            <button
              className={styles["timeline__swiper-next"]}
              onClick={handleSwiperNext}
              aria-label="Следующее событие"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </HistoricalDatesProvider>
  );
};

export default HistoricalDates;
