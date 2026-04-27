export interface Reward {
  threshold: number;
  title: string;
  description: string;
  emoji: string;
}

export const rewards: Reward[] = [
{
  threshold: 4,
  title: 'Un petit cadeau mystère',
  description: "Une première surprise t'attend ! Continue comme ça !",
  emoji: '🎁'
},
{
  threshold: 8,
  title: 'Une sortie surprise',
  description: 'Tu déchires ! Prépare-toi pour une aventure spéciale !',
  emoji: '🌟'
},
{
  threshold: 12,
  title: 'Un moment rien que pour toi',
  description: 'Incroyable ! Un moment de détente bien mérité !',
  emoji: '💆‍♀️'
},
{
  threshold: 16,
  title: 'Une aventure inoubliable',
  description: "Extraordinaire ! Une expérience que tu n'oublieras jamais !",
  emoji: '🗺️'
},
{
  threshold: 20,
  title: 'Le cadeau ultime',
  description: 'PARFAIT ! Tu as tout réussi ! Le cadeau suprême est à toi !',
  emoji: '👑'
}];