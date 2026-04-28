import type {ImageSourcePropType} from 'react-native';

export type StoriesandlghstravlJokeCategory = {
  id: string;
  name: string;
  jokeCount: number;
  coverImage: ImageSourcePropType;
};

export type StoriesandlghstravlJokeItem = {
  id: string;
  categoryId: string;
  text: string;
};

export const storiesandlghstravlJokeCategories: StoriesandlghstravlJokeCategory[] =
  [
    {
      id: 'greece',
      name: 'Greece',
      jokeCount: 8,
      coverImage: require('../../assets/i/storiesandlgcat1.png'),
    },
    {
      id: 'egypt',
      name: 'Egypt',
      jokeCount: 8,
      coverImage: require('../../assets/i/storiesandlgcat2.png'),
    },
    {
      id: 'scandinavia',
      name: 'Scandinavia',
      jokeCount: 8,
      coverImage: require('../../assets/i/storiesandlgcat3.png'),
    },
    {
      id: 'china',
      name: 'China',
      jokeCount: 8,
      coverImage: require('../../assets/i/storiesandlgcat4.png'),
    },
  ];

export const storiesandlghstravlJokeItems: StoriesandlghstravlJokeItem[] = [
  // Egypt (8)
  {
    id: 'sl-j-01',
    categoryId: 'egypt',
    text:
      'I asked the guide how old the pyramids are.\nHe said, “Very old.”\nI asked, “More precise?”\nHe said, “Older than your return ticket.”',
  },
  {
    id: 'sl-j-02',
    categoryId: 'egypt',
    text:
      'I bought a “real ancient artifact” from a market.\nIt looked amazing.\nLater I saw the same one in another shop.\nEven more ancient.\nWith a discount.',
  },
  {
    id: 'sl-j-03',
    categoryId: 'egypt',
    text:
      'I tried to take a serious photo near the pyramid.\nThe wind hit me, the sun blinded me, and someone walked into the frame.\nThe guide said, “Perfect. Very natural.”',
  },
  {
    id: 'sl-j-04',
    categoryId: 'egypt',
    text:
      'I asked how people built the pyramids.\nThe guide smiled and said, “Slowly.”\nI said, “That’s it?”\nHe said, “You try faster.”',
  },
  {
    id: 'sl-j-05',
    categoryId: 'egypt',
    text:
      'I sat on a camel for the first time.\nIt stood up in two stages.\nI realized something important.\nThe camel has a plan.\nAnd I am not part of it.',
  },
  {
    id: 'sl-j-06',
    categoryId: 'egypt',
    text:
      'I entered a tomb and whispered, “Is anyone here?”\nThe guide said, “No.”\nSomething echoed back.\nI decided that was enough history for today.',
  },
  {
    id: 'sl-j-07',
    categoryId: 'egypt',
    text:
      'I bought water near the pyramids.\nVery expensive.\nBut the seller said, “It’s cold.”\nI said, “So is my wallet now.”',
  },
  {
    id: 'sl-j-08',
    categoryId: 'egypt',
    text:
      'I asked if the sphinx ever smiles.\nThe guide said, “Only at tourists.”\nI looked at it again.\nYeah… that felt personal.',
  },

  // Greece (8)
  {
    id: 'sl-j-09',
    categoryId: 'greece',
    text:
      'I asked for a small portion at a Greek restaurant.\nThey nodded.\nThen brought enough food for four people.\nI guess “small” is a flexible concept.',
  },
  {
    id: 'sl-j-10',
    categoryId: 'greece',
    text:
      'I tried to eat slowly.\nThe waiter kept bringing more dishes.\nAt some point, I stopped asking questions.\nAnd just accepted my fate.',
  },
  {
    id: 'sl-j-11',
    categoryId: 'greece',
    text:
      'I came for a quiet sunset.\nSo did everyone else.\nWe all stood there silently.\nTaking photos of the same silence.',
  },
  {
    id: 'sl-j-12',
    categoryId: 'greece',
    text:
      'I followed Google Maps through a Greek island street.\nIt said “turn right.”\nThere was no right.\nOnly stairs.\nAnd confidence.',
  },
  {
    id: 'sl-j-13',
    categoryId: 'greece',
    text:
      'I ordered something I couldn’t pronounce.\nThe waiter smiled.\nI smiled back.\nWe both pretended everything was under control.',
  },
  {
    id: 'sl-j-14',
    categoryId: 'greece',
    text:
      'I tried to leave the table.\nThe waiter said, “Dessert?”\nI said no.\nHe brought it anyway.\nRespectfully.',
  },
  {
    id: 'sl-j-15',
    categoryId: 'greece',
    text:
      'I asked where the best view is.\nThey said, “Everywhere.”\nThey were right.\nBut now I couldn’t choose where to stand.',
  },
  {
    id: 'sl-j-16',
    categoryId: 'greece',
    text:
      'I tried to act casual in a photo.\nThen adjusted my pose 12 times.\nSomeone said, “Relax.”\nThat became the hardest part.',
  },

  // Scandinavia (8)
  {
    id: 'sl-j-17',
    categoryId: 'scandinavia',
    text:
      'I entered a quiet forest.\nIt was peaceful.\nToo peaceful.\nI started walking louder.\nJust to feel normal.',
  },
  {
    id: 'sl-j-18',
    categoryId: 'scandinavia',
    text:
      'I asked how cold it gets.\nThey said, “Not too bad.”\nI stepped outside.\nMy face disagreed immediately.',
  },
  {
    id: 'sl-j-19',
    categoryId: 'scandinavia',
    text:
      'I ordered coffee.\nSat down.\nWaited.\nNothing happened.\nThen I realized — that was the point.',
  },
  {
    id: 'sl-j-20',
    categoryId: 'scandinavia',
    text:
      'I saw the northern lights forecast: “Maybe.”\nI waited two hours.\nNothing.\nI turned around.\nThey appeared.',
  },
  {
    id: 'sl-j-21',
    categoryId: 'scandinavia',
    text:
      'I said, “It’s quiet here.”\nThey said, “Yes.”\nWe both nodded.\nConversation complete.',
  },
  {
    id: 'sl-j-22',
    categoryId: 'scandinavia',
    text:
      'I walked on frozen ground.\nIt made a cracking sound.\nI stopped.\nThe ground did not explain.',
  },
  {
    id: 'sl-j-23',
    categoryId: 'scandinavia',
    text:
      'I checked the time.\nThen stopped.\nNo one else seemed to care.\nSo I tried it too.\nSurprisingly effective.',
  },
  {
    id: 'sl-j-24',
    categoryId: 'scandinavia',
    text:
      'I asked for directions.\nThey gave perfect instructions.\nClear, precise, logical.\nI still got lost.\nThat one’s on me.',
  },

  // China (8)
  {
    id: 'sl-j-25',
    categoryId: 'china',
    text:
      'I ordered something from a street stall.\nDidn’t know what it was.\nAte it anyway.\nIt was amazing.\nStill no idea what it was.',
  },
  {
    id: 'sl-j-26',
    categoryId: 'china',
    text:
      'I tried to follow the tea ceremony.\nSmall cup.\nSlow movement.\nI blinked.\nMissed three steps.',
  },
  {
    id: 'sl-j-27',
    categoryId: 'china',
    text:
      'I saw a long line for food.\nJoined it.\nGot to the front.\nStill didn’t know what I was ordering.\nTrusted the line.',
  },
  {
    id: 'sl-j-28',
    categoryId: 'china',
    text:
      'I entered a quiet temple.\nStarted walking slowly.\nThen slower.\nEventually I just stood still.\nThat felt correct.',
  },
  {
    id: 'sl-j-29',
    categoryId: 'china',
    text:
      'I tried to take a quick photo.\nThen noticed everyone taking perfect ones.\nI tried again.\nNow I had 27 “quick” photos.',
  },
  {
    id: 'sl-j-30',
    categoryId: 'china',
    text:
      'I followed a local through a busy street.\nThey moved smoothly.\nI stopped twice.\nAlmost lost them three times.',
  },
  {
    id: 'sl-j-31',
    categoryId: 'china',
    text:
      'I ordered tea.\nIt came in multiple rounds.\nI thought it was over.\nIt wasn’t.',
  },
  {
    id: 'sl-j-32',
    categoryId: 'china',
    text:
      'I asked how something works.\nThey explained calmly.\nI nodded like I understood.\nI did not.\nBut I respected the explanation.',
  },
];

export function storiesandlghstravlGetJokeCategory(
  categoryId: string,
): StoriesandlghstravlJokeCategory | undefined {
  return storiesandlghstravlJokeCategories.find(c => c.id === categoryId);
}

export function storiesandlghstravlGetJokesForCategory(
  categoryId: string,
): StoriesandlghstravlJokeItem[] {
  return storiesandlghstravlJokeItems.filter(j => j.categoryId === categoryId);
}

