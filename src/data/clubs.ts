import type { Club } from '../types'

export const clubs: Club[] = [
  {
    id: 'pagina-37',
    name: 'Pagina 37',
    description:
      'Club presencial para quienes quieren leer narrativa contemporanea y comentarla con vino, notas y conversaciones largas.',
    city: 'Madrid',
    modality: 'presencial',
    genres: ['Narrativa', 'Contemporanea'],
    nextBook: 'Los restos del dia',
    nextDate: '12 mayo · 19:30',
    spotsLeft: 4,
    hostName: 'Lidia Sanz',
    image: 'P37',
    pace: 'mensual',
  },
  {
    id: 'orbita-ciencia-ficcion',
    name: 'Orbita Ciencia Ficcion',
    description:
      'Sesiones online quincenales para lectores que disfrutan mundos especulativos, tecnologia y debates sobre futuros posibles.',
    city: 'Online',
    modality: 'online',
    genres: ['Ciencia ficcion', 'Ensayo'],
    nextBook: 'Klara y el Sol',
    nextDate: '8 mayo · 20:00',
    spotsLeft: 9,
    hostName: 'Ruben Salas',
    image: 'SCI',
    pace: 'quincenal',
  },
  {
    id: 'casa-amarilla',
    name: 'Casa Amarilla',
    description:
      'Grupo presencial centrado en autoras, memorias y libros que invitan a comentar la vida real sin solemnidad.',
    city: 'Barcelona',
    modality: 'presencial',
    genres: ['Memorias', 'Narrativa'],
    nextBook: 'Nada se opone a la noche',
    nextDate: '14 mayo · 18:45',
    spotsLeft: 3,
    hostName: 'Paula Casas',
    image: 'CASA',
    pace: 'mensual',
  },
  {
    id: 'luna-noir',
    name: 'Luna Noir',
    description:
      'Para quienes buscan thriller, misterio y una energia de serie limitada. Online, directo y con ritmo.',
    city: 'Online',
    modality: 'online',
    genres: ['Thriller', 'Misterio'],
    nextBook: 'La paciente silenciosa',
    nextDate: '2 mayo · 21:00',
    spotsLeft: 12,
    hostName: 'Andrea Lobo',
    image: 'NOIR',
    pace: 'quincenal',
  },
  {
    id: 'atlas-fantastico',
    name: 'Atlas Fantastico',
    description:
      'Encuentros presenciales para lectores de fantasia que valoran mundo, simbolos, mapas y personajes de largo recorrido.',
    city: 'Valencia',
    modality: 'presencial',
    genres: ['Fantasia', 'Young adult'],
    nextBook: 'El nombre del viento',
    nextDate: '18 mayo · 19:00',
    spotsLeft: 5,
    hostName: 'Hector Vidal',
    image: 'ATLAS',
    pace: 'mensual',
  },
  {
    id: 'ensayo-vivo',
    name: 'Ensayo Vivo',
    description:
      'Lecturas online sobre cultura, tecnologia y pensamiento para quien quiere ideas nuevas y una charla afinada.',
    city: 'Online',
    modality: 'online',
    genres: ['Ensayo', 'Tecnologia'],
    nextBook: 'La era del capitalismo de vigilancia',
    nextDate: '6 mayo · 19:30',
    spotsLeft: 7,
    hostName: 'Marta Navas',
    image: 'IDEA',
    pace: 'mensual',
  },
  {
    id: 'patio-poetico',
    name: 'Patio Poetico',
    description:
      'Club presencial para poesia, lecturas cortas y sesiones intimas en librerias y patios del centro.',
    city: 'Sevilla',
    modality: 'presencial',
    genres: ['Poesia', 'Clasicos'],
    nextBook: 'Veinte poemas de amor',
    nextDate: '9 mayo · 20:15',
    spotsLeft: 6,
    hostName: 'Clara Mena',
    image: 'POEM',
    pace: 'quincenal',
  },
  {
    id: 'norte-clasico',
    name: 'Norte Clasico',
    description:
      'Club presencial en Bilbao para redescubrir clasicos con guia, contexto y una conversacion muy aterrizada.',
    city: 'Bilbao',
    modality: 'presencial',
    genres: ['Clasicos', 'Historia'],
    nextBook: 'Madame Bovary',
    nextDate: '21 mayo · 19:15',
    spotsLeft: 8,
    hostName: 'Jon Arregi',
    image: 'NRT',
    pace: 'mensual',
  },
]

export const availableCities = Array.from(
  new Set(clubs.map((club) => club.city).filter((city) => city !== 'Online')),
).sort((a, b) => a.localeCompare(b))

export const availableGenres = Array.from(
  new Set(clubs.flatMap((club) => club.genres)),
).sort((a, b) => a.localeCompare(b))
