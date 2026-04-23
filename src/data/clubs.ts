import type { Club } from '../types'

export const clubs: Club[] = [
  {
    id: 'entre-paginas',
    name: 'Entre paginas',
    description:
      'Club presencial para quienes disfrutan la narrativa contemporanea, las preguntas abiertas y una mesa larga para conversar sin prisa.',
    city: 'Madrid',
    modality: 'presencial',
    genres: ['Novela contemporanea', 'Narrativa'],
    nextBook: 'Los abismos',
    nextDate: 'Sabado 24 may · 11:00',
    spotsLeft: 5,
    hostName: 'Laura G.',
    image: 'ENTRE',
    pace: 'mensual',
    imageUrl:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
    members: 12,
    venue: 'Cafe La Esquina, Madrid',
    about:
      'Un club para lectoras y lectores que quieren comentar libros recientes con calma, buen contexto y conversaciones honestas.',
  },
  {
    id: 'letras-en-dialogo',
    name: 'Letras en dialogo',
    description:
      'Grupo online para cruzar literatura, oficio y vida cotidiana con sesiones agiles y muy bien moderadas.',
    city: 'Online',
    modality: 'online',
    genres: ['Clasicos', 'Ensayo'],
    nextBook: 'La campana de cristal',
    nextDate: 'Martes 27 may · 19:30',
    spotsLeft: 11,
    hostName: 'Sara M.',
    image: 'LETRAS',
    pace: 'quincenal',
    imageUrl:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    members: 24,
    venue: 'Zoom',
    about:
      'Ideal para quien quiere un ritmo mas vivo y una mezcla de clasicos, oficio de escritura y debates contemporaneos.',
  },
  {
    id: 'los-margenes',
    name: 'Los margenes',
    description:
      'Encuentros hibridos para lectoras y lectores que alternan presencia y remoto sin perder continuidad ni criterio.',
    city: 'Madrid',
    modality: 'presencial',
    genres: ['Ensayo', 'No ficcion'],
    nextBook: 'Una habitacion propia',
    nextDate: 'Domingo 25 may · 12:00',
    spotsLeft: 6,
    hostName: 'Julia S.',
    image: 'MARG',
    pace: 'mensual',
    imageUrl:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80',
    members: 18,
    venue: 'The Mun, Madrid',
    about:
      'Funciona bien para perfiles curiosos que buscan textos con mas tesis, mas contexto y una comunidad consistente.',
  },
  {
    id: 'poesia-en-voz-alta',
    name: 'Poesia en voz alta',
    description:
      'Sesiones pequeñas para leer en voz alta, descubrir poetas y comentar sin solemnidad pero con sensibilidad.',
    city: 'Madrid',
    modality: 'presencial',
    genres: ['Poesia', 'Clasicos'],
    nextBook: 'La casa encendida',
    nextDate: 'Miercoles 28 may · 18:00',
    spotsLeft: 9,
    hostName: 'Claudia P.',
    image: 'POESIA',
    pace: 'quincenal',
    imageUrl:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
    members: 9,
    venue: 'Madrid, Espana',
    about:
      'Pensado para quien quiere un entorno intimo, sensible y muy oral alrededor de poesia y textos breves.',
  },
  {
    id: 'ciencia-y-ficcion',
    name: 'Ciencia y ficcion',
    description:
      'Club online para quienes disfrutan mundos especulativos, tecnologia, futuros posibles y conversaciones afiladas.',
    city: 'Online',
    modality: 'online',
    genres: ['Ciencia ficcion', 'Ensayo'],
    nextBook: 'Klara y el Sol',
    nextDate: 'Viernes 30 may · 20:00',
    spotsLeft: 7,
    hostName: 'Ruben T.',
    image: 'SCI',
    pace: 'quincenal',
    imageUrl:
      'https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1200&q=80',
    members: 16,
    venue: 'Online',
    about:
      'Una comunidad para quien quiere ideas, ficcion especulativa y referencias tecnicas en la misma mesa.',
  },
  {
    id: 'lecturas-que-sanan',
    name: 'Lecturas que sanan',
    description:
      'Grupo hibrido con foco en memorias, relatos y no ficcion que ayuda a pensar la vida real desde el libro adecuado.',
    city: 'Madrid',
    modality: 'presencial',
    genres: ['No ficcion', 'Relato'],
    nextBook: 'El acontecimiento',
    nextDate: 'Sabado 31 may · 10:30',
    spotsLeft: 4,
    hostName: 'Marta L.',
    image: 'SANAN',
    pace: 'mensual',
    imageUrl:
      'https://images.unsplash.com/photo-1455885666463-9f41f5f48c4b?auto=format&fit=crop&w=1200&q=80',
    members: 14,
    venue: 'Madrid, Espana',
    about:
      'Para personas que buscan libros pegados a la experiencia personal y una conversacion muy cuidada.',
  },
]

export const availableCities = Array.from(
  new Set(clubs.map((club) => club.city).filter((city) => city !== 'Online')),
).sort((a, b) => a.localeCompare(b))

export const availableGenres = Array.from(
  new Set(clubs.flatMap((club) => club.genres)),
).sort((a, b) => a.localeCompare(b))
