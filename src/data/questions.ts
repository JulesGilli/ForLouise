export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
}

export const questions: Question[] = [
{
  id: 1,
  question: 'Quelle est la capitale de la France ?',
  options: ['Lyon', 'Marseille', 'Paris', 'Bordeaux'],
  correctIndex: 2
},
{
  id: 2,
  question: 'Combien de jours y a-t-il dans une année bissextile ?',
  options: ['365', '366', '364', '367'],
  correctIndex: 1
},
{
  id: 3,
  question: 'Quel est le plus grand océan du monde ?',
  options: ['Atlantique', 'Indien', 'Arctique', 'Pacifique'],
  correctIndex: 3
},
{
  id: 4,
  question: 'Qui a peint la Joconde ?',
  options: ['Picasso', 'Van Gogh', 'Léonard de Vinci', 'Monet'],
  correctIndex: 2
},
{
  id: 5,
  question: 'Quelle planète est surnommée la planète rouge ?',
  options: ['Vénus', 'Mars', 'Jupiter', 'Saturne'],
  correctIndex: 1
},
{
  id: 6,
  question: 'Combien de continents y a-t-il sur Terre ?',
  options: ['5', '6', '7', '8'],
  correctIndex: 2
},
{
  id: 7,
  question: 'Quelle est la langue la plus parlée au monde ?',
  options: ['Anglais', 'Espagnol', 'Mandarin', 'Hindi'],
  correctIndex: 2
},
{
  id: 8,
  question: 'Quel animal est le symbole de la sagesse ?',
  options: ['Le hibou', 'Le renard', 'Le lion', "L'aigle"],
  correctIndex: 0
},
{
  id: 9,
  question: 'Combien de cordes a une guitare classique ?',
  options: ['4', '5', '6', '7'],
  correctIndex: 2
},
{
  id: 10,
  question: 'Quelle est la monnaie du Japon ?',
  options: ['Yuan', 'Won', 'Yen', 'Baht'],
  correctIndex: 2
},
{
  id: 11,
  question: 'Quel est le plus petit pays du monde ?',
  options: ['Monaco', 'Vatican', 'Saint-Marin', 'Liechtenstein'],
  correctIndex: 1
},
{
  id: 12,
  question: 'Combien de joueurs y a-t-il dans une équipe de football ?',
  options: ['9', '10', '11', '12'],
  correctIndex: 2
},
{
  id: 13,
  question: 'Quelle est la couleur obtenue en mélangeant bleu et jaune ?',
  options: ['Vert', 'Orange', 'Violet', 'Rouge'],
  correctIndex: 0
},
{
  id: 14,
  question: 'Quel est le plus haut sommet du monde ?',
  options: ['K2', 'Mont Blanc', 'Everest', 'Kilimandjaro'],
  correctIndex: 2
},
{
  id: 15,
  question: 'Combien de côtés a un hexagone ?',
  options: ['5', '6', '7', '8'],
  correctIndex: 1
},
{
  id: 16,
  question: 'Quel fruit est connu pour être riche en vitamine C ?',
  options: ['Banane', 'Orange', 'Pomme', 'Raisin'],
  correctIndex: 1
},
{
  id: 17,
  question: 'Quelle est la vitesse de la lumière (approximativement) ?',
  options: ['300 000 km/s', '150 000 km/s', '500 000 km/s', '100 000 km/s'],
  correctIndex: 0
},
{
  id: 18,
  question: 'Quel est le plus grand désert du monde ?',
  options: ['Sahara', 'Gobi', 'Antarctique', 'Arabie'],
  correctIndex: 2
},
{
  id: 19,
  question: 'Combien de notes y a-t-il dans une gamme musicale ?',
  options: ['5', '6', '7', '8'],
  correctIndex: 2
},
{
  id: 20,
  question: "Quel est l'élément chimique dont le symbole est 'O' ?",
  options: ['Or', 'Oxygène', 'Osmium', 'Ozone'],
  correctIndex: 1
}];