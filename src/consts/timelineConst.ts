import { TimeSegment } from "../types/timeLineType";

export const timelineSegments: TimeSegment[] = [
  {
    id: 1,
    startYear: 1987,
    endYear: 1991,
    label: "Кино",
    slideIndex: 0,
    events: [
      { id: 11111, year: 1987, description: "«Хищник» / Predator, США (реж. Джон Мактирнан)" },
      {
        id: 11112,
        year: 1988,
        description: "«Кто подставил кролика Роджера» / Who Framed Roger Rabbit, США (реж. Роберт Земекис)",
      },
      { id: 11113, year: 1989, description: "«Назад в будущее 2» / Back To The Future 2, США (реж. Роберт Земекис)" },
      { id: 11114, year: 1990, description: "«Крепкий орешек 2» / Die Hard 2, США (реж. Ренни Харлин)" },
      { id: 11115, year: 1991, description: "«Семейка Аддамс» / The Addams Family, США, (реж. Барри Зонненфельд)" },
    ],
  },
  {
    id: 2,
    startYear: 1992,
    endYear: 1997,
    label: "Литература",
    slideIndex: 1,
    events: [
      {
        id: 11121,
        year: 1992,
        description:
          "Нобелевская премия по литературе – Дерек Уолкотт, «За блестящий образец карибского эпоса в 64 разделах».",
      },
      { id: 11122, year: 1994, description: "«Бессонница» – роман Стивена Кинга." },
      { id: 11123, year: 1995, description: "Нобелевская премия по литературе – Шеймас Хини" },
      { id: 11124, year: 1997, description: "«Гарри Поттер и философский камень» – Джоан Роулинг." },
    ],
  },
  {
    id: 3,
    startYear: 1999,
    endYear: 2004,
    label: "Театр",
    slideIndex: 2,
    events: [
      {
        id: 11131,
        year: 1999,
        description: "премьера балета «Золушка» в постановке Жан-Кристофа Майо, сценография Эрнеста Пиньона",
      },
      { id: 11132, year: 2000, description: "возобновлено издание журнала «Театр»" },
      {
        id: 11133,
        year: 2002,
        description: "премьера трилогии Тома Стоппарда «Берег Утопии», Королевский Национальный театр, Лондон",
      },
      { id: 11134, year: 2003, description: "В Венеции «Феникс» пережил пожар" },
    ],
  },
  {
    id: 4,
    startYear: 2015,
    endYear: 2022,
    label: "Наука",
    slideIndex: 3,
    events: [
      {
        id: 11141,
        year: 2015,
        description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        id: 11142,
        year: 2016,
        description:
          "Телескоп «Хаббл» обнаружил самую удаленную из всех обнаруженных галактик, получившую обозначение GN-z11",
      },
      {
        id: 11143,
        year: 2017,
        description: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
      },
      {
        id: 11144,
        year: 2018,
        description: "Старт космического аппарата Solar Probe Plus, предназначенного для изучения Солнца",
      },
      { id: 11145, year: 2019, description: "Google объявил о создании 53-кубитного квантового компьютера." },
      { id: 11146, year: 2020, description: "Корабль Crew Dragon вернулся на Землю из первого пилотируемого полёта" },
    ],
  },
  {
    id: 5,
    startYear: 2022,
    endYear: 2025,
    label: "Спорт",
    slideIndex: 4,
    events: [
      { id: 11111, year: 1987, description: "«Хищник» / Predator, США (реж. Джон Мактирнан)" },
      {
        id: 11112,
        year: 1988,
        description: "«Кто подставил кролика Роджера» / Who Framed Roger Rabbit, США (реж. Роберт Земекис)",
      },
      { id: 11113, year: 1989, description: "«Назад в будущее 2» / Back To The Future 2, США (реж. Роберт Земекис)" },
      { id: 11114, year: 1990, description: "«Крепкий орешек 2» / Die Hard 2, США (реж. Ренни Харлин)" },
      { id: 11115, year: 1991, description: "«Семейка Аддамс» / The Addams Family, США, (реж. Барри Зонненфельд)" },
    ],
  },
  {
    id: 6,
    startYear: 2025,
    endYear: 2040,
    label: "Киберспорт",
    slideIndex: 5,
    events: [
      {
        id: 11141,
        year: 2025,
        description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        id: 11142,
        year: 2026,
        description:
          "Телескоп «Хаббл» обнаружил самую удаленную из всех обнаруженных галактик, получившую обозначение GN-z11",
      },
      {
        id: 11143,
        year: 2027,
        description: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
      },
      {
        id: 11144,
        year: 2028,
        description: "Старт космического аппарата Solar Probe Plus, предназначенного для изучения Солнца",
      },
      { id: 11145, year: 2039, description: "Google объявил о создании 53-кубитного квантового компьютера." },
      { id: 11146, year: 2040, description: "Корабль Crew Dragon вернулся на Землю из первого пилотируемого полёта" },
    ],
  },
];
