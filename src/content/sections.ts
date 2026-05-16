// Site content as a data structure. Paragraph strings use a tiny
// markdown-link microformat: `[text](url)` becomes a link. Nothing else.
import type { IconRef } from './iconsData';

export interface IconLine {
  title: string;
  date: string;
  icons: IconRef[];
}

export interface VideoMedia {
  kind: 'video';
  webm: string;
  mp4: string;
  width: number;
  height: number;
  preload?: boolean;
}

export interface ImageMedia {
  kind: 'image';
  src: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
}

export interface AudioMedia {
  kind: 'audio';
  src: string;
  caption?: string;
}

export type Media = VideoMedia | ImageMedia | AudioMedia;

export interface Section {
  /** Stable id; used for tests and as a DOM anchor. */
  id: string;
  /** Optional bold section heading shown above everything else in the section. */
  heading?: string;
  /** Paragraphs displayed between the heading and the icon line. */
  preIcon?: string[];
  iconLine: IconLine;
  /** Paragraphs displayed between the icon line and the media. */
  intro: string[];
  media?: Media;
  /** Paragraphs displayed after the media. */
  outro?: string[];
}

export const SECTIONS: Section[] = [
  {
    id: 'go-vote-tally',
    heading: 'Voting',
    preIcon: [
      "I have this crazed obsession with voting methods. I just wanted to get the best result when voting on a game for board game night, but maybe I went a bit too far...",
    ],
    iconLine: { title: 'Go Vote Tally', date: '2013-2014', icons: ['go'] },
    intro: [
      "All of my side projects are partially rooted in learning something new. At the time, I was learning Go and so I wrote a few different voting algorithms in the Go playground. I started with [Borda](https://en.wikipedia.org/wiki/Borda_count), then went to [instant runoff (IRV)](https://en.wikipedia.org/wiki/Instant-runoff_voting) and then eventually landed on a (highly questionable) [blend of both](https://play.golang.org/p/KG0KlWWbNFc).",
    ],
    media: {
      kind: 'video',
      webm: '/videos/godemo.webm',
      mp4: '/videos/godemo.mp4',
      width: 748,
      height: 450,
      preload: true,
    },
  },
  {
    id: 'indifference-engine',
    iconLine: {
      title: 'Indifference Engine',
      date: '2014-2015',
      icons: [
        'nodejs',
        'express',
        'npm',
        'mongodb',
        'heroku',
        'mocha',
        'travisci',
        'bootstrap',
        { title: 'Dust.js', href: 'https://www.dustjs.com/', label: 'Dust.js', labelClass: 'flex-none mx-2 text-stone-700 text-sm font-thin' },
      ],
    },
    intro: [
      "I was tired of sending a survey out and then manually entering the survey data into my program. I started on the Indifference Engine ([source](https://github.com/coltonw/boardgamevote); [old broken site](http://boardgamevote.herokuapp.com/)), so called because it allowed for people's ranked choice votes to have ties in them. It started out based on my earlier IRV / Borda blend but eventually was migrated to the [minimax method](https://en.wikipedia.org/wiki/Minimax_Condorcet_method).",
    ],
    media: {
      kind: 'image',
      src: '/bgv.avif',
      fallback: '/bgv.png',
      alt: 'Indifference Engine Screenshot',
      width: 748,
      height: 556,
    },
    outro: [
      'I spent quite a bit more time on this project and learned about Node.js, Express, publishing packages on npm, MongoDB, Heroku, unit testing in Mocha, test coverage in Coveralls, CI/CD on Travis CI, Bootstrap, and using templates in Dust.js.',
    ],
  },
  {
    id: 'revonarchy',
    heading: 'No More Voting!',
    iconLine: {
      title: 'Revonarchy',
      date: '2015',
      icons: ['bower', 'koa', 'less', 'gulp', 'ramda', 'react'],
    },
    intro: [
      'I got tired of my favorite games never getting picked, so I decided to move away from voting to let people just pick a game and then rotate who picks the game each time. The problem that quickly showed up was that some people would only show up rarely and yet got to pick just as often, Thus Revonarchy was born. ([Source](https://github.com/coltonw/revonarchy); site was never deployed)',
    ],
    media: {
      kind: 'video',
      webm: '/videos/revonarchy.webm',
      mp4: '/videos/revonarchy.mp4',
      width: 922,
      height: 580,
    },
    outro: [
      'Revonarchy was relatively short lived but I still learned some great stuff including Bower, Koa, Less, Gulp, Ramda, and most importantly React.',
    ],
  },
  {
    id: 'majority-judgment',
    heading: 'A Triumphant Return to Voting',
    iconLine: {
      title: 'Majority Judgment',
      date: '2019',
      icons: ['elixir', 'phoenix', 'circleci', 'aws', 'react', 'nivo', 'bulma', 'webpack'],
    },
    intro: [
      'After a long hiatus, I decided to go back to the drawing board with voting. I had been reading about this new interesting voting method known as [Majority Judgement](https://en.wikipedia.org/wiki/Majority_judgment). I implemented a modernized board game night voting site ([source](https://github.com/coltonw/majudge); site no longer deployed).',
    ],
    media: {
      kind: 'video',
      webm: '/videos/judgement.webm',
      mp4: '/videos/judgement.mp4',
      width: 1030,
      height: 810,
    },
    outro: [
      "After learning a lot of frontend work in my day job, this project became focused on learning more backend and devops. I used Elixir's Phoenix Framework for the backend and deployed it using CircleCI and Amazon ECS. The frontend was React using nivo for charts, Bulma for CSS, and webpack for bundling.",
    ],
  },
  {
    id: 'sensors-are-down',
    heading: 'Gaming Side Projects',
    iconLine: {
      title: 'Sensors Are Down',
      date: '2017',
      icons: ['alexa', 'aws', 'serverless', 'flow'],
    },
    intro: [
      'I have always loved designing and programming video games, but the problem is that video games have a lot of art and I do not enjoy making art.',
      'Enter Alexa. I could make an audio only game! I decided to create an Alexa space combat game ([source](https://github.com/coltonw/sensors-are-down); never published).',
      "In the end, I created something that just wasn't very fun. I fell into the trap of making a system too complex considering you cannot see the current state. I think I had some good ideas and I have follow-up ideas for redesigns but I shelved the game for now.",
    ],
    media: {
      kind: 'audio',
      src: '/sensorsaredown.mp3',
      caption: 'Sorry for poor audio quality',
    },
    outro: [
      'This project involved mostly learning various AWS technologies that go into making an Alexa skill. I used an AWS Lambda which I deployed to using the Serverless Framework. I also tried typed JavaScript for the first time but picked a losing horse and used flow-typed.',
    ],
  },
  {
    id: 'icg-scalajs',
    heading: 'Instantaneous Card Game',
    iconLine: { title: 'Scala.js', date: '2018', icons: ['scalajs'] },
    intro: [
      'I love card games. I could write about that topic alone forever but suffice it to say, I had an idea for a collectible card game where you build the deck and then the game plays itself where the winner is whoever had the better deck.',
      'I made an early prototype in Scala.js ([source](https://github.com/coltonw/deckBuilder); [site](http://scalajs.willcolton.com/)). I stopped mostly because the Scala.js ecosystem was incredibly barren with lackluster tooling and few tutorials which were all broken and out of date.',
    ],
  },
  {
    id: 'icg-unity',
    iconLine: {
      title: 'Unity',
      date: '2019',
      icons: ['unity', 'csharp', 'python', 'aws', 'serverless'],
    },
    intro: [
      'Over the holidays that year I discussed the idea with my brother and it was rekindled. Conveniently, I got a Humble Bundle with a bunch of card art assets for use in Unity, so I decided to build the game in Unity ([backend source](https://github.com/coltonw/instantaneous); game not released).',
    ],
    media: {
      kind: 'video',
      webm: '/videos/icg.webm',
      mp4: '/videos/icg.mp4',
      width: 960,
      height: 600,
    },
    outro: [
      'The game client was coded in C# and built with Unity. The backend was coded in Python deployed to AWS Lambda with the Serverless Framework.',
    ],
  },
  {
    id: 'boats-and-bridges',
    heading: 'Making a Real Game',
    iconLine: {
      title: 'Boats and Bridges',
      date: '2020-2021',
      icons: [
        'nodejs',
        { title: 'Lodash', href: 'https://lodash.com/', label: 'Lo', labelClass: 'flex-none mx-2 text-black underline decoration-blue-600 decoration-2 font-bold' },
        'babel',
        'webpack',
        'unity',
        'csharp',
        'rust',
      ],
    },
    intro: [
      'In 2016, I made a couple modified [hashi puzzles](https://en.wikipedia.org/wiki/Hashiwokakero) for my wife and friends to solve. I really enjoyed making the puzzles and thought maybe I could make a puzzle game similar to the [Hexcells series](https://store.steampowered.com/app/304410/Hexcells_Infinite/) except instead of modified minesweeper I would do modified hashi.',
      'The idea evolved over time but eventually I started working on a level solver and accompanying level editor to build some puzzles. ([level editor source](https://github.com/coltonw/boats-and-bridges/)).',
    ],
    media: {
      kind: 'video',
      webm: '/videos/boatsandbridges.webm',
      mp4: '/videos/boatsandbridges.mp4',
      width: 1258,
      height: 978,
    },
    outro: [
      'I spent a lot of time on a 3D Unity implementation of the game but every time I developed new visuals they would either not look how I wanted or they would obscure the gameplay elements to the point of being a net negative for the game. After spending a long time on a [pencil hatching shader](http://kylehalladay.com/blog/tutorial/2017/02/21/Pencil-Sketch-Effect.html) and being disappointed with the results, I took an extended break from the project.',
      'Unlike most of my projects, this project was much more focused on execution rather than learning new technologies. The level solver was built in node with a heavy use of lodash for array manipulation. The level editor was just vanilla ES6 JavaScript using babel to transpile and webpack to bundle. I had a brief diversion where I learned Rust and started migrating the level editor to Rust for performance improvements.',
    ],
  },
  {
    id: 'puzzlesync',
    heading: 'Fun with Family',
    iconLine: {
      title: 'PuzzleSync',
      date: '2020',
      icons: ['gatsby', 'react', 'typescript', 'graphql', 'auth0', 'circleci', 'aws', 'serverless'],
    },
    intro: [
      'My family does an annual get-together where we play games and solve puzzles together. For the occasion I decided to make a little quiz game, sort of a cooperative version of sporcle. I used the opportunity to learn Gatsby and sharpen my skills with websockets ([backend source](https://github.com/coltonw/simple-websockets-chat-app/); frontend has private source and implementation).',
    ],
    media: {
      kind: 'video',
      webm: '/videos/puzzlesync.webm',
      mp4: '/videos/puzzlesync.mp4',
      width: 1194,
      height: 790,
    },
    outro: [
      'It was my first time using any sort of react based static site generator. I found Gatsby to be annoying to use especially their GraphQL internal api. I had been working with TypeScript at work a bit and so I started developing all side projects in TypeScript starting with this project. I deployed the frontend using CircleCI for CI/CD and Amazon S3 to host. I learned Auth0 for authentication and authorization.',
      'I used an aws official sample for a chat app as the foundation for my backend. I deployed the backend using Serverless and included Lambdas, DynamoDB, and ApiGateway from AWS.',
    ],
  },
  {
    id: 'danycon-schedule',
    iconLine: {
      title: 'Convention Schedule',
      date: '2022',
      icons: ['nextjs', 'vercel', 'bulma', 'aws'],
    },
    intro: [
      'The most recent family get-together I decided to make a digital schedule. I added some functionality where attendees could pick which games they were going to join ([source](https://github.com/coltonw/danycon-schedule/); [site](https://danycon-schedule.vercel.app/) - use username Will and give it a few minutes for vercel to start the server before refreshing and logging in).',
    ],
    media: {
      kind: 'video',
      webm: '/videos/danyconschedule.webm',
      mp4: '/videos/danyconschedule.mp4',
      width: 1080,
      height: 868,
    },
    outro: [
      'I had the pleasure of building this site using Next.js and deploying using Vercel. It made my life really easy and I definitely want to work with Next.js more in the future. For styling I used Bulma and as a database I used AWS DynamoDB.',
    ],
  },
  {
    id: 'museum',
    heading: 'The museum is its own exhibit',
    iconLine: {
      title: 'Astro',
      date: '2026',
      icons: ['astro', 'svelte', 'cloudflare', 'tailwind'],
    },
    intro: [
      'Last, but certainly not least, I want to discuss the very site you are on right now. The intention is to have several implementations in different UI frameworks both as a quick way to learn a bunch of technologies and as a demonstration of their performance against each other on a simple two page website.',
      'This museum implementation is built using Astro with a Svelte 5 island for the lazy-loading video player — the rest of the page ships zero JavaScript. For styling it uses TailwindCSS. It is intended to be deployed as static files on Cloudflare Pages.',
    ],
  },
];
