import { BiochemModule, CardProgress, StudyCard } from './models';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

export const BIOCHEM_MODULES: BiochemModule[] = [
  {
    id: 'amino-acids',
    title: 'Аминокислоты',
    description: 'Классификация, свойства радикалов, заменимые и незаменимые аминокислоты.',
    estimatedMinutes: 35,
    cardsTotal: 4,
    color: '#1f8a70'
  },
  {
    id: 'gluconeogenesis',
    title: 'Глюконеогенез',
    description: 'Обход необратимых реакций гликолиза, регуляция и клинические связи.',
    estimatedMinutes: 40,
    cardsTotal: 3,
    color: '#c05621'
  },
  {
    id: 'krebs-cycle',
    title: 'Цикл Кребса',
    description: 'Ферменты, энергетический выход, анаплеротические реакции.',
    estimatedMinutes: 45,
    cardsTotal: 3,
    color: '#2f6f9f'
  },
  {
    id: 'enzymes',
    title: 'Ферменты',
    description: 'Кинетика, ингибирование, коферменты и диагностическое значение.',
    estimatedMinutes: 30,
    cardsTotal: 3,
    color: '#7a4f9f'
  }
];

export const STUDY_CARDS: StudyCard[] = [
  {
    id: 'aa-01',
    moduleId: 'amino-acids',
    front: 'Какие аминокислоты являются незаменимыми у взрослого человека?',
    back: 'Валин, лейцин, изолейцин, лизин, метионин, треонин, фенилаланин, триптофан.',
    clinicalNote: 'Аргинин и гистидин становятся условно незаменимыми в период роста и восстановления.',
    tags: ['классификация', 'питание']
  },
  {
    id: 'aa-02',
    moduleId: 'amino-acids',
    front: 'Какие аминокислоты имеют кислые боковые радикалы?',
    back: 'Аспартат и глутамат. При физиологическом pH они обычно несут отрицательный заряд.',
    clinicalNote: 'Заряд радикалов важен для структуры белка и активных центров ферментов.',
    tags: ['заряд', 'структура']
  },
  {
    id: 'aa-03',
    moduleId: 'amino-acids',
    front: 'Почему пролин часто нарушает альфа-спираль?',
    back: 'Его циклическая структура ограничивает вращение пептидной цепи и мешает водородным связям.',
    clinicalNote: 'Пролин часто встречается в поворотах белковой цепи и коллагене.',
    tags: ['белки', 'структура']
  },
  {
    id: 'aa-04',
    moduleId: 'amino-acids',
    front: 'Какая аминокислота содержит серу и может образовывать дисульфидные мостики?',
    back: 'Цистеин. Две молекулы цистеина образуют цистин через дисульфидную связь.',
    clinicalNote: 'Дисульфидные мостики стабилизируют внеклеточные белки и гормоны.',
    tags: ['сера', 'цистеин']
  },
  {
    id: 'gluco-01',
    moduleId: 'gluconeogenesis',
    front: 'Какая реакция глюконеогенеза обходит пируваткиназу?',
    back: 'Пируват превращается в оксалоацетат пируваткарбоксилазой, затем в ФЕП с помощью ФЕП-карбоксикиназы.',
    clinicalNote: 'Пируваткарбоксилаза активируется ацетил-КоА.',
    tags: ['регуляция', 'ферменты']
  },
  {
    id: 'gluco-02',
    moduleId: 'gluconeogenesis',
    front: 'Где в клетке начинается глюконеогенез из пирувата?',
    back: 'В митохондрии: пируват карбоксилируется до оксалоацетата.',
    clinicalNote: 'Оксалоацетат переносится в цитозоль через малатный или аспартатный путь.',
    tags: ['локализация']
  },
  {
    id: 'gluco-03',
    moduleId: 'gluconeogenesis',
    front: 'Какой гормон усиливает глюконеогенез в печени?',
    back: 'Глюкагон, особенно при голодании и снижении уровня глюкозы крови.',
    clinicalNote: 'Инсулин действует противоположно и подавляет продукцию глюкозы печенью.',
    tags: ['гормоны']
  },
  {
    id: 'krebs-01',
    moduleId: 'krebs-cycle',
    front: 'Какая реакция цикла Кребса образует GTP?',
    back: 'Превращение сукцинил-КоА в сукцинат с участием сукцинил-КоА-синтетазы.',
    clinicalNote: 'Это пример субстратного фосфорилирования.',
    tags: ['энергетика']
  },
  {
    id: 'krebs-02',
    moduleId: 'krebs-cycle',
    front: 'Какие ферменты цикла Кребса образуют NADH?',
    back: 'Изоцитратдегидрогеназа, альфа-кетоглутаратдегидрогеназа и малатдегидрогеназа.',
    clinicalNote: 'NADH далее передает электроны в дыхательную цепь.',
    tags: ['ферменты', 'NADH']
  },
  {
    id: 'krebs-03',
    moduleId: 'krebs-cycle',
    front: 'Какой фермент цикла Кребса находится во внутренней мембране митохондрий?',
    back: 'Сукцинатдегидрогеназа, она же комплекс II дыхательной цепи.',
    clinicalNote: 'Связывает цикл Кребса с электрон-транспортной цепью.',
    tags: ['митохондрии']
  },
  {
    id: 'enz-01',
    moduleId: 'enzymes',
    front: 'Что показывает Km в уравнении Михаэлиса-Ментен?',
    back: 'Концентрацию субстрата, при которой скорость реакции равна половине Vmax.',
    clinicalNote: 'Меньший Km часто означает более высокое сродство фермента к субстрату.',
    tags: ['кинетика']
  },
  {
    id: 'enz-02',
    moduleId: 'enzymes',
    front: 'Как конкурентный ингибитор влияет на Km и Vmax?',
    back: 'Увеличивает кажущийся Km, но не меняет Vmax при достаточном количестве субстрата.',
    clinicalNote: 'Эффект можно ослабить повышением концентрации субстрата.',
    tags: ['ингибирование']
  },
  {
    id: 'enz-03',
    moduleId: 'enzymes',
    front: 'Что такое аллостерическая регуляция?',
    back: 'Изменение активности фермента при связывании регулятора вне активного центра.',
    clinicalNote: 'Часто встречается у ключевых ферментов метаболических путей.',
    tags: ['регуляция']
  }
];

export const INITIAL_PROGRESS: CardProgress[] = STUDY_CARDS.map((card, index) => ({
  cardId: card.id,
  status: index < 3 ? 'review' : index < 7 ? 'learning' : 'new',
  repetitions: index % 4,
  easeFactor: 2.4,
  intervalDays: index % 3,
  dueAt: (index % 4 === 0 ? yesterday : index % 4 === 1 ? today : tomorrow).toISOString(),
  lastReviewedAt: index < 6 ? yesterday.toISOString() : undefined
}));
