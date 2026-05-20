export interface Reward {
  threshold: number;
  title: string;
  description: string;
  emoji: string;
}

export const rewards: Reward[] = [
{
  threshold: 4,
  title: 'Un bijou de ventre',
  description: "Une première surprise t'attend ! Continue comme ça !",
  emoji: '💎'
},
{
  threshold: 7,
  title: "Des piercings à l'oreille",
  description: 'Tu déchires ! De jolies brillances pour sublimer ton style !',
  emoji: '✨'
},
{
  threshold: 10,
  title: 'Des piercings au téton',
  description: 'Incroyable ! Un petit bijou audacieux rien que pour toi !',
  emoji: '🔥'
},
{
  threshold: 13,
  title: 'Un sac à main',
  description: "Extraordinaire ! Un accessoire chic que tu vas adorer !",
  emoji: '👜'
},
{
  threshold: 17,
  title: 'Un atelier de pâtisserie en duo avec Maman',
  description: 'Un moment gourmand à partager rien que toutes les deux avec Maman !',
  emoji: '🧁'
},
{
  threshold: 20,
  title: 'Deux places de spectacle pour toi et ton amoureux',
  description: 'PARFAIT ! Un cadeau magique offert par Tatie et Béa pour une soirée inoubliable à deux !',
  emoji: '🎭'
}];
