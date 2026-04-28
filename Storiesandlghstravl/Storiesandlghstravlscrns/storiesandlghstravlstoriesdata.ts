import type {ImageSourcePropType} from 'react-native';

export type StoriesandlghstravlStoryCategory = {
  id: string;
  name: string;
  storyCount: number;
  coverImage: ImageSourcePropType;
};

export type StoriesandlghstravlStoryItem = {
  id: string;
  categoryId: string;
  image: ImageSourcePropType;
  title: string;
  paragraphs: string[];
};

export const storiesandlghstravlStoryCategories: StoriesandlghstravlStoryCategory[] =
  [
    {
      id: 'greece',
      name: 'Greece',
      storyCount: 3,
      coverImage: require('../../assets/i/storiesandlgcat1.png'),
    },
    {
      id: 'egypt',
      name: 'Egypt',
      storyCount: 3,
      coverImage: require('../../assets/i/storiesandlgcat2.png'),
    },
    {
      id: 'scandinavia',
      name: 'Scandinavia',
      storyCount: 3,
      coverImage: require('../../assets/i/storiesandlgcat3.png'),
    },
    {
      id: 'china',
      name: 'China',
      storyCount: 3,
      coverImage: require('../../assets/i/storiesandlgcat4.png'),
    },
  ];

export const storiesandlghstravlStoryItems: StoriesandlghstravlStoryItem[] = [
  {
    id: 'sl-s-01',
    categoryId: 'egypt',
    image: require('../../assets/i/storiesandlgstr1.png'),
    title: 'The Guide Who Knows More Than Google',
    paragraphs: [
      'I came to Egypt with a clear plan — see the pyramids, learn something impressive, and not buy anything unnecessary. Within ten minutes, a local guide convinced me that without his “exclusive route,” I wouldn’t understand anything at all. He spoke with such confidence, as if he personally knew the pharaohs. Honestly, I almost believed him.',
      'We approached the pyramids, and he started telling stories that sounded just a little too vivid. “This is where Ramses once forgot his keys,” he said seriously. I paused for a second, then realized I had slowly been guided into a stand-up routine. But at that point, I didn’t even want him to stop.',
      'Then he showed me a “secret entrance” that looked suspiciously like a shadow behind a rock. “Tourists don’t know this,” he whispered. I imagined something ancient and hidden opening before me. Instead… it was a small souvenir shop.',
      'The shop owner gave him a quick nod, and I realized this was a well-rehearsed partnership. Still, I walked in out of curiosity and walked out with three statues and a magnet. I still don’t fully understand how that happened.',
      'As we left, the guide said, “Now you know Egypt a little deeper.” And you know what? He was right. He just didn’t mention that “deeper” meant into my wallet.',
    ],
  },
  {
    id: 'sl-s-02',
    image: require('../../assets/i/storiesandlgstr2.png'),
    categoryId: 'egypt',
    title: 'The Camel That Makes the Decisions',
    paragraphs: [
      'They told me the real Egyptian experience is riding a camel. It sounded romantic and adventurous, so I agreed. The camel looked at me like it already knew how this would end. And honestly, it probably did.',
      'The moment I got on, it stood up in a way that made it very clear — I was no longer in control. We started moving into the desert, and I tried to look confident. Meanwhile, I was already thinking about how to get off gracefully. That plan didn’t work.',
      'At some point, the camel just stopped in the middle of nowhere. The guide calmly said, “He’s thinking.” I had no idea what he was thinking about, but it didn’t feel reassuring. A minute later, he decided to go… in a completely different direction.',
      'We didn’t return the same way, but the guide called it an “alternative route.” The camel looked satisfied. I looked slightly concerned.',
      'When I finally got down, I realized something important: in Egypt, you can make all the plans you want. But if there’s a camel involved — it has already made the final decision.',
    ],
  },
  {
    id: 'sl-s-03',
    image: require('../../assets/i/storiesandlgstr3.png'),
    categoryId: 'egypt',
    title: 'The Tomb That Didn’t Want to Be Found',
    paragraphs: [
      'I decided to embrace my inner explorer and joined a tour to a lesser-known tomb. The guide said it had a “special atmosphere.” That sounded exciting until we stepped inside. It was dark, silent, and very, very hot.',
      'The flashlight flickered just enough to make every shadow feel alive. I started imagining things immediately. The guide walked ahead like it was just another Tuesday. That made it even more unsettling.',
      'We stopped at a wall full of hieroglyphs, and he began explaining their meaning. I tried to focus, but part of my brain was already planning the fastest way out. Especially when something quietly fell behind me. Turned out… it was my own backpack.',
      'The guide smiled and said, “Tombs don’t like noisy guests.” I wasn’t sure if he was joking or not. Either way, I decided to be as quiet as possible. Just in case.',
      'When we stepped back into the sunlight, I felt like I had just survived an adventure movie. Without treasure. But with a strong understanding: some places deserve respect… and a slightly quicker exit.',
    ],
  },
  {
    id: 'sl-s-04',
    image: require('../../assets/i/storiesandlgstr4.png'),
    categoryId: 'greece',
    title: 'The Waiter Who Already Decided for Me',
    paragraphs: [
      'I sat down at a small seaside taverna, ready to carefully choose what to eat. The menu was long, full of unfamiliar names, and I wanted to do it properly. The waiter came over, smiled, and said, “I bring you something good.” I hadn’t even opened the menu yet.',
      'I tried to ask a few questions, but he waved his hand like details weren’t important. “Trust me,” he said confidently. And for some reason, I did. Maybe it was the view. Maybe it was the tone. Maybe it was already too late.',
      'A few minutes later, the table started filling up. One plate, then another, then something I didn’t recognize at all. I nodded like I knew exactly what I was eating. It all tasted amazing, which made the situation even more confusing.',
      'At some point, I realized I had no idea what I had ordered. Or if I had ordered anything at all. The waiter returned, looked at the table, and seemed very satisfied with his choices.',
      'When I left, I thought about how I planned to explore Greek cuisine carefully. Instead, it explored me. And honestly… I think it did a great job.',
    ],
  },
  {
    id: 'sl-s-05',
    image: require('../../assets/i/storiesandlgstr5.png'),
    categoryId: 'greece',
    title: 'The Sunset That Everyone Was Chasing',
    paragraphs: [
      'They told me to go watch the sunset — “it’s magical,” they said. I imagined something quiet and peaceful, just me and the view. When I arrived, there were already about fifty people with the exact same idea.',
      'Everyone was looking for the perfect spot. Some stood on rocks, some leaned over walls, and a few seemed ready to climb anything for a better angle. I joined in, pretending I also had a strategy.',
      'As the sun slowly went down, phones came out. A lot of phones. It felt less like a moment and more like a coordinated event. I tried to take a photo, then another, then realized I was doing exactly the same thing as everyone else.',
      'Then I stopped for a second and just looked. No camera, no adjustments. Just the view. And it was actually as good as they said. Maybe even better.',
      'When the sun disappeared, everyone stayed for a moment longer. Quiet, satisfied. Then, almost at the same time, we all turned around and left — like a very calm, slightly sunburned crowd.',
    ],
  },
  {
    id: 'sl-s-06',
    image: require('../../assets/i/storiesandlgstr6.png'),
    categoryId: 'greece',
    title: 'The Street That Looked Exactly Like the Photo',
    paragraphs: [
      'I found a street online that looked perfect — white walls, blue doors, flowers everywhere. It felt like the place to see. When I got there, it looked exactly the same. Almost too perfect.',
      'I walked slowly, trying to take it all in. Every corner looked familiar, like I had already been there before. Not because I had — but because I had seen it so many times online.',
      'People were taking photos in the same spots, with the same poses. I tried to do something different, then accidentally ended up doing the same thing anyway. It’s harder than it looks.',
      'At one point, I stepped aside and just watched. It was like a quiet choreography — people moving, posing, adjusting, smiling. Everyone trying to capture the same feeling.',
      'As I left, I realized something. The place really was beautiful. But the interesting part wasn’t just how it looked — it was how everyone experienced it in their own slightly different way.',
    ],
  },
  {
    id: 'sl-s-07',
    image: require('../../assets/i/storiesandlgstr7.png'),
    categoryId: 'scandinavia',
    title: 'The Silence That Felt Too Perfect',
    paragraphs: [
      'I went north expecting calm, quiet, and that famous Scandinavian stillness. When I arrived, it was exactly like I imagined — clean air, endless views, and almost no sound at all. For the first few minutes, it felt peaceful. Then it started to feel… suspiciously quiet.',
      'I walked along a path surrounded by trees and frozen ground. No people, no cars, nothing moving. Even my footsteps sounded louder than they should. I suddenly became very aware of how much noise I usually ignore.',
      'At one point, I stopped just to listen. That’s when I realized the silence wasn’t empty — it was just very precise. Wind, distant cracks in the ice, something shifting far away. Subtle, but impossible to ignore.',
      'A local I met later said, “You get used to it.” I wasn’t sure if I believed him. It felt like the kind of silence that notices you before you notice it.',
      'When I left, the noise of the city felt almost overwhelming. And for a second, I missed that strange, perfect quiet.',
    ],
  },
  {
    id: 'sl-s-08',
    image: require('../../assets/i/storiesandlgstr8.png'),
    categoryId: 'scandinavia',
    title: 'The Coffee Break That Took Its Time',
    paragraphs: [
      'I thought I’d grab a quick coffee and continue exploring. That was the plan. What I didn’t realize was that in Scandinavia, coffee is not just coffee — it’s a full experience.',
      'I ordered something simple and sat down, ready to drink and go. People around me were not in a hurry. Conversations were slow, relaxed, almost carefully paced. No one seemed to be rushing anywhere.',
      'I took a sip and checked the time. Then I looked around again. No laptops, no phones, just people sitting, talking, or simply being there. It felt like I had accidentally stepped into a different rhythm.',
      'After a while, I stopped checking the time. The coffee lasted longer than expected, and somehow, so did I. Nothing dramatic happened, but it felt… intentional.',
      'When I finally left, I realized I didn’t just take a coffee break. I participated in it. And that made all the difference.',
    ],
  },
  {
    id: 'sl-s-09',
    image: require('../../assets/i/storiesandlgstr9.png'),
    categoryId: 'scandinavia',
    title: 'The Northern Lights That Made Me Wait',
    paragraphs: [
      'I went out at night hoping to see the northern lights. Everyone said, “You just have to be patient.” I nodded, like I understood what that meant. I didn’t.',
      'I stood outside, looking up at a sky that refused to do anything interesting. It was cold, quiet, and very still. After a while, I started questioning my life choices.',
      'Then someone nearby said, “Wait.” So I waited. A little longer. Then even longer. Just when I was about to give up, something shifted.',
      'At first, it was barely visible. A soft line of green moving slowly across the sky. Then it grew, stretched, and suddenly — it was everywhere. Fluid, unreal, completely worth the wait.',
      'I forgot about the cold, the time, everything. For a few minutes, it felt like the sky was doing something just for us. And then, just as quietly, it faded away.',
      'Walking back, I finally understood what they meant. Not just patience — but timing. And knowing when to stay a little longer.',
    ],
  },
  {
    id: 'sl-s-10',
    image: require('../../assets/i/storiesandlgstr10.png'),
    categoryId: 'china',
    title: 'The Tea That Turned Into a Ceremony',
    paragraphs: [
      'I thought I was just going in for a quick cup of tea. Simple, quiet, maybe a short break. Instead, I found myself sitting at a table where everything felt very… intentional.',
      'The person serving the tea moved slowly, carefully, like every step mattered. Small cups, precise pours, a rhythm I didn’t fully understand but didn’t want to interrupt. I held my cup like it was more important than it probably was.',
      'I tried to drink it casually, but something about the atmosphere made that impossible. Everyone else seemed to know exactly how to behave. I followed along, hoping it looked natural.',
      'At some point, I realized this wasn’t just tea. It was a moment, a pause, something meant to be experienced properly. Even if you didn’t fully understand it.',
      'When I left, I felt strangely calm. Also slightly worried that I might have done at least three things wrong. But the tea? Perfect.',
    ],
  },
  {
    id: 'sl-s-11',
    image: require('../../assets/i/storiesandlgstr11.png'),
    categoryId: 'china',
    title: 'The Street Food That Chose Me',
    paragraphs: [
      'I walked through a busy street filled with food stalls, each one more interesting than the last. Everything smelled incredible, and I had no idea where to start. So I decided to just walk and see what felt right.',
      'That didn’t last long. A vendor made eye contact with me and smiled like he already knew I was his next customer. Before I could react, I was holding something on a stick.',
      'I nodded politely, pretending I knew exactly what I had just ordered. It looked good. It smelled even better. So I took a bite and hoped for the best.',
      'It turned out to be amazing. I still don’t know what it was, but at that point, it didn’t matter. The experience felt more important than the explanation.',
      'As I kept walking, I realized something: sometimes you don’t choose the food. The food chooses you. And honestly, it usually makes a pretty good decision.',
    ],
  },
  {
    id: 'sl-s-12',
    image: require('../../assets/i/storiesandlgstr12.png'),
    categoryId: 'china',
    title: 'The Temple That Slowed Everything Down',
    paragraphs: [
      'I visited a temple expecting to see something beautiful and maybe take a few photos. It was beautiful, no doubt. But it was also something else — slower, quieter, more focused than I expected.',
      'People moved differently there. Not rushed, not distracted. Just present. I tried to match that pace, but it took a moment to adjust. I didn’t realize how fast I usually move until I had to slow down.',
      'I walked through the space, noticing details I would normally miss. The patterns, the light, the way sound seemed to soften. Even my steps felt louder than they should.',
      'At some point, I stopped trying to “see everything” and just stood still. That’s when it actually started to make sense. Not as a place to visit, but as something to experience.',
      'When I left, the outside world felt faster again. And for a second, I wished I could bring that slower rhythm with me.',
    ],
  },
];

export function storiesandlghstravlGetCategory(
  categoryId: string,
): StoriesandlghstravlStoryCategory | undefined {
  return storiesandlghstravlStoryCategories.find(c => c.id === categoryId);
}

export function storiesandlghstravlGetStoriesForCategory(
  categoryId: string,
): StoriesandlghstravlStoryItem[] {
  return storiesandlghstravlStoryItems.filter(s => s.categoryId === categoryId);
}

export function storiesandlghstravlGetStory(
  storyId: string,
): StoriesandlghstravlStoryItem | undefined {
  return storiesandlghstravlStoryItems.find(s => s.id === storyId);
}

export function storiesandlghstravlStoryBody(
  story: StoriesandlghstravlStoryItem,
): string {
  return story.paragraphs.join('\n\n');
}
