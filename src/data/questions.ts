export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Quelle est la date d'anniversaire de Jules ?",
    options: ['17 février 2001', '17 février 2000', '3 février 2001', '3 février 2000'],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "Quel est le premier parc d'attractions que tu as fait ?",
    options: ['Disneyland', 'PortAventura', 'Walibi', 'Futuroscope'],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "Qu'est-ce que tu demandes tous les ans à Noël ?",
    options: ['Un poney', 'Un short de sport', 'Un lapin', 'Des protéines'],
    correctIndex: 0,
  },
  {
    id: 4,
    question: "Comment s'appelait ton premier chat ?",
    options: ['Piqueboufigue', 'Sat', 'la salope (pistouffle)', 'T-shirt'],
    correctIndex: 0,
  },
  {
    id: 5,
    question: 'Quelle est ta boisson chaude préférée ?',
    options: ['Café au lait', 'Thé', 'Chocolat chaud', 'Tisane'],
    correctIndex: 0,
  },
  {
    id: 6,
    question: 'Quel est ton alcool préféré ?',
    options: ['Ruinart', 'Vin blanc', 'Captain Morgan', 'Ricard'],
    correctIndex: 0,
  },
  {
    id: 7,
    question: "Pourquoi on t'appelle Shrek ?",
    options: ['Tu pètes beaucoup', 'Tu as la peau verte', 'Tu rotes', 'Tu pue la mort'],
    correctIndex: 0,
  },
  {
    id: 8,
    question: 'Combien as-tu de piercings ?',
    options: ['12', '9', '16', '67'],
    correctIndex: 0,
  },
  {
    id: 9,
    question: 'Qui accompagne toujours Malzahar en bot ?',
    options: ['Miss Fortune', 'Lux', 'Jinx', 'Ashe'],
    correctIndex: 3,
  },
  {
    id: 10,
    question: 'Quel est ton genre préféré de film ?',
    options: ["Film d'horreur", 'Comédie romantique', 'Film d’action', 'Documentaire animalier'],
    correctIndex: 0,
  },
  {
    id: 11,
    question: "Comment s'appelle l'usine de chocolat visitée en Suisse ?",
    options: ['Cailler', 'Lindt', 'Nestlé', "Côte d'Or"],
    correctIndex: 0,
  },
  {
    id: 12,
    question: "En quelle année l'équipe de rugby de La Rochelle a gagné le championnat d'Europe pour la deuxième fois ?",
    options: ['2023', '2020', '2021', '2022'],
    correctIndex: 0,
  },
  {
    id: 13,
    question: 'Quel est le nom du musée des statues de cire de Londres ?',
    options: ['Madame Tussauds', 'Madame Claude', 'Madame Tricot', 'Madame Cirette'],
    correctIndex: 0,
  },
  {
    id: 14,
    question: 'Quelles étaient les couleurs de ta tenue de pom-pom girl quand tu as gagné le championnat ?',
    options: ['Bleu, blanc et rouge', 'Rose, noir et blanc', 'Violet, jaune et vert', 'Orange, bleu et argent'],
    correctIndex: 0,
  },
  {
    id: 15,
    question: 'Quelle était la couleur de tes premières expériences capillaires ?',
    options: ['Rouge', 'Bleu', 'Blond platine', 'Vert'],
    correctIndex: 0,
  },
  {
    id: 16,
    question: 'Par quelle marque pourrais-tu être sponsorisée ?',
    options: ['Hello Kitty', 'Nike', 'Zara', 'Bershka'],
    correctIndex: 0,
  },
  {
    id: 17,
    question: "Quel est le premier restaurant que tu as fait à Lyon ?",
    options: ['Paul Bocuse', 'Un petit bouchon lyonnais', 'Brasserie Georges', 'Le Sud'],
    correctIndex: 0,
  },
  {
    id: 18,
    question: 'Quel sport as-tu tenté à Lyon ?',
    options: ['Heels dance', 'Pom-pom girl', 'Tennis', 'Lancer de nain'],
    correctIndex: 0,
  },
  {
    id: 19,
    question: 'Quel est ton chat préféré ?',
    options: ['Nono', 'La loutre', 'la salope (Pistouffle)', 'Patachon'],
    correctIndex: 0,
  },
  {
    id: 20,
    question: 'Quel est ton frère préféré ?',
    options: ['Jules', 'Jules évidemment', 'Encore Jules', 'Quelqu’un d’autre'],
    correctIndex: 0,
  },
];