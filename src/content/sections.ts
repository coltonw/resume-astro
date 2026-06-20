// Site content as a data structure. Paragraph strings use a tiny
// markdown-link microformat: `[text](url)` becomes a link. Nothing else.
import type { IconRef } from "./iconsData";

export interface IconLine {
  title: string;
  date: string;
  icons: IconRef[];
}

export interface VideoMedia {
  kind: "video";
  webm: string;
  mp4: string;
  width: number;
  height: number;
  preload?: boolean;
}

export interface ImageMedia {
  kind: "image";
  src: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
}

export interface AudioMedia {
  kind: "audio";
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
    id: "go-vote-tally",
    heading: "Voting",
    preIcon: [
      "I have this crazed obsession with voting methods. I just wanted to get the best result when voting on a game for board game night, but maybe I went a bit too far...",
    ],
    iconLine: { title: "Go Vote Tally", date: "2013-2014", icons: ["go"] },
    intro: [
      "All of my side projects are partially rooted in learning something new. At the time, I was learning Go and so I wrote a few different voting algorithms in the Go playground. I started with [Borda](https://en.wikipedia.org/wiki/Borda_count), then went to [instant runoff (IRV)](https://en.wikipedia.org/wiki/Instant-runoff_voting) and then eventually landed on a (highly questionable) [blend of both](https://play.golang.org/p/KG0KlWWbNFc).",
    ],
    media: {
      kind: "video",
      webm: "/videos/godemo.webm",
      mp4: "/videos/godemo.mp4",
      width: 748,
      height: 450,
      preload: true,
    },
  },
  {
    id: "indifference-engine",
    iconLine: {
      title: "Indifference Engine",
      date: "2014-2015",
      icons: [
        "nodejs",
        "express",
        "npm",
        "mongodb",
        "heroku",
        "mocha",
        "travisci",
        "bootstrap",
        {
          title: "Dust.js",
          href: "https://www.dustjs.com/",
          label: "Dust.js",
          labelClass: "flex-none mx-2 text-stone-700 text-sm font-thin",
        },
      ],
    },
    intro: [
      "I was tired of sending a survey out and then manually entering the survey data into my program. I started on the Indifference Engine ([source](https://github.com/coltonw/boardgamevote); [old broken site](http://boardgamevote.herokuapp.com/)), so called because it allowed for people's ranked choice votes to have ties in them. It started out based on my earlier IRV / Borda blend but eventually was migrated to the [minimax method](https://en.wikipedia.org/wiki/Minimax_Condorcet_method).",
    ],
    media: {
      kind: "image",
      src: "/bgv.avif",
      fallback: "/bgv.png",
      alt: "Indifference Engine Screenshot",
      width: 748,
      height: 556,
    },
    outro: [
      "I spent quite a bit more time on this project and learned about Node.js, Express, publishing packages on npm, MongoDB, Heroku, unit testing in Mocha, test coverage in Coveralls, CI/CD on Travis CI, Bootstrap, and using templates in Dust.js.",
    ],
  },
  {
    id: "revonarchy",
    heading: "No More Voting!",
    iconLine: {
      title: "Revonarchy",
      date: "2015",
      icons: ["bower", "koa", "less", "gulp", "ramda", "react"],
    },
    intro: [
      "I got tired of my favorite games never getting picked, so I decided to move away from voting to let people just pick a game and then rotate who picks the game each time. The problem that quickly showed up was that some people would only show up rarely and yet got to pick just as often, Thus Revonarchy was born. ([Source](https://github.com/coltonw/revonarchy); site was never deployed)",
    ],
    media: {
      kind: "video",
      webm: "/videos/revonarchy.webm",
      mp4: "/videos/revonarchy.mp4",
      width: 922,
      height: 580,
    },
    outro: [
      "Revonarchy was relatively short lived but I still learned some great stuff including Bower, Koa, Less, Gulp, Ramda, and most importantly React.",
    ],
  },
  {
    id: "majority-judgment",
    heading: "A Triumphant Return to Voting",
    iconLine: {
      title: "Majority Judgment",
      date: "2019",
      icons: [
        "elixir",
        "phoenix",
        "circleci",
        "aws",
        "react",
        "nivo",
        "bulma",
        "webpack",
      ],
    },
    intro: [
      "After a long hiatus, I decided to go back to the drawing board with voting. I had been reading about this new interesting voting method known as [Majority Judgement](https://en.wikipedia.org/wiki/Majority_judgment). I implemented a modernized board game night voting site ([source](https://github.com/coltonw/majudge); site no longer deployed).",
    ],
    media: {
      kind: "video",
      webm: "/videos/judgement.webm",
      mp4: "/videos/judgement.mp4",
      width: 1030,
      height: 810,
    },
    outro: [
      "After learning a lot of frontend work in my day job, this project became focused on learning more backend and devops. I used Elixir's Phoenix Framework for the backend and deployed it using CircleCI and Amazon ECS. The frontend was React using nivo for charts, Bulma for CSS, and webpack for bundling.",
    ],
  },
  {
    id: "star-judge",
    heading: "All The Voting Methods, At Once",
    iconLine: {
      title: "Star Judge",
      date: "2026",
      icons: [
        "claude",
        "svelte",
        "typescript",
        "cloudflare",
        "hono",
        {
          title: "Cloudflare D1",
          href: "https://developers.cloudflare.com/d1/",
          label: "D1",
          labelClass: "flex-none mx-2 text-amber-600 font-bold",
        },
        "biome",
      ],
    },
    intro: [
      "With kids and people moving away, I haven't had as many big board game nights as I used to. Plus everyone just defers to me for board game choices anyways. But after years of not thinking about it, I came back to it again curious about advancements in voting methods and curious to get my feet wet with my first foray into vibe coding.",
      '[Star Judge](https://github.com/coltonw/star-judge) takes one set of ratings and runs them through eight different algorithms simultaneously — STAR and Majority Judgment (the two eponymous voting methods), Borda, instant runoff, Condorcet, a couple of "intolerant veto" variants that drop options with too many hard passes before tallying, and, last but not least, the Dictator. The fun part is the mock scenarios: Condorcet cycles, STAR runoff flips, and the classic Tennessee capital example where Memphis wins plurality but loses every single head-to-head, Nashville wins by Condorcet, and IRV somehow elects Knoxville. Deployed at [star-judge.willcolton.com](https://star-judge.willcolton.com/) (and at the underlying [star-judge.pages.dev](https://star-judge.pages.dev/)).',
      "The main thing I wanted to learn was Claude Code. I had already spent a lot of time with Github Copilot at work, but the buzz at the time was that Claude Code was the best-in-class AI coding tool and I wanted to try it for myself.",
    ],
    media: {
      kind: "image",
      src: "/starjudge.png",
      fallback: "/starjudge.png",
      alt: "Star Judge Screenshot",
      width: 748,
      height: 571,
    },
    outro: [
      "The frontend is SvelteKit 5 with Runes. The API is Hono on Cloudflare Workers, talking to a D1 SQLite database. Linting is Biome. The animated bar charts are pure CSS — no chart library. I learned nothing about Hono or Runes, because the AI just did all that for me. In the end I found the project deeply unsatisfying. Since the point of side-projects is mainly to learn, I plan to rely much less on vibe coding in the future.",
    ],
  },
  {
    id: "sensors-are-down",
    heading: "Gaming Side Projects",
    iconLine: {
      title: "Sensors Are Down",
      date: "2017",
      icons: ["alexa", "aws", "serverless", "flow"],
    },
    intro: [
      "I have always loved designing and programming video games, but the problem is that video games have a lot of art and I do not enjoy making art.",
      "Enter Alexa. I could make an audio only game! I decided to create an Alexa space combat game ([source](https://github.com/coltonw/sensors-are-down); never published).",
      "In the end, I created something that just wasn't very fun. I fell into the trap of making a system too complex considering you cannot see the current state. I think I had some good ideas and I have follow-up ideas for redesigns but I shelved the game for now.",
    ],
    media: {
      kind: "audio",
      src: "/sensorsaredown.mp3",
      caption: "Sorry for poor audio quality",
    },
    outro: [
      "This project involved mostly learning various AWS technologies that go into making an Alexa skill. I used an AWS Lambda which I deployed to using the Serverless Framework. I also tried typed JavaScript for the first time but picked a losing horse and used flow-typed.",
    ],
  },
  {
    id: "icg-scalajs",
    heading: "Instantaneous Card Game",
    iconLine: { title: "Scala.js", date: "2018", icons: ["scalajs"] },
    intro: [
      "I love card games. I could write about that topic alone forever but suffice it to say, I had an idea for a collectible card game where you build the deck and then the game plays itself where the winner is whoever had the better deck.",
      "I made an early prototype in Scala.js ([source](https://github.com/coltonw/deckBuilder); [site](http://scalajs.willcolton.com/)). I stopped mostly because the Scala.js ecosystem was incredibly barren with lackluster tooling and few tutorials which were all broken and out of date.",
    ],
  },
  {
    id: "icg-unity",
    iconLine: {
      title: "Unity",
      date: "2019",
      icons: ["unity", "csharp", "python", "aws", "serverless"],
    },
    intro: [
      "Over the holidays that year I discussed the idea with my brother and it was rekindled. Conveniently, I got a Humble Bundle with a bunch of card art assets for use in Unity, so I decided to build the game in Unity ([backend source](https://github.com/coltonw/instantaneous); game not released).",
    ],
    media: {
      kind: "video",
      webm: "/videos/icg.webm",
      mp4: "/videos/icg.mp4",
      width: 960,
      height: 600,
    },
    outro: [
      "The game client was coded in C# and built with Unity. The backend was coded in Python deployed to AWS Lambda with the Serverless Framework.",
    ],
  },
  {
    id: "boats-and-bridges",
    heading: "Making a Real Game",
    iconLine: {
      title: "Boats and Bridges",
      date: "2020-2021",
      icons: [
        "nodejs",
        {
          title: "Lodash",
          href: "https://lodash.com/",
          label: "Lo",
          labelClass:
            "flex-none mx-2 text-black underline decoration-blue-600 decoration-2 font-bold",
        },
        "babel",
        "webpack",
        "unity",
        "csharp",
        "rust",
      ],
    },
    intro: [
      "In 2016, I made a couple modified [hashi puzzles](https://en.wikipedia.org/wiki/Hashiwokakero) for my wife and friends to solve. I really enjoyed making the puzzles and thought maybe I could make a puzzle game similar to the [Hexcells series](https://store.steampowered.com/app/304410/Hexcells_Infinite/) except instead of modified minesweeper I would do modified hashi.",
      "The idea evolved over time but eventually I started working on a level solver and accompanying level editor to build some puzzles. ([level editor source](https://github.com/coltonw/boats-and-bridges/)).",
    ],
    media: {
      kind: "video",
      webm: "/videos/boatsandbridges.webm",
      mp4: "/videos/boatsandbridges.mp4",
      width: 1258,
      height: 978,
    },
    outro: [
      "I spent a lot of time on a 3D Unity implementation of the game but every time I developed new visuals they would either not look how I wanted or they would obscure the gameplay elements to the point of being a net negative for the game. After spending a long time on a [pencil hatching shader](http://kylehalladay.com/blog/tutorial/2017/02/21/Pencil-Sketch-Effect.html) and being disappointed with the results, I took an extended break from the project.",
      "Unlike most of my projects, this project was much more focused on execution rather than learning new technologies. The level solver was built in node with a heavy use of lodash for array manipulation. The level editor was just vanilla ES6 JavaScript using babel to transpile and webpack to bundle. I had a brief diversion where I learned Rust and started migrating the level editor to Rust for performance improvements.",
    ],
  },
  {
    id: "boats-and-bridges-shipped",
    iconLine: {
      title: "Boats and Bridges, Take Two",
      date: "2024",
      icons: ["svelte", "typescript", "vercel", "midjourney"],
    },
    intro: [
      'After a few years away I came back to the idea, this time as a web game. I figure I can more easily actually finish if it is based on technologies I already know and love. The result is the closest thing in this museum to a "shipped" project: it is live at [boatsandbridgesgame.com](https://www.boatsandbridgesgame.com/) ([source](https://github.com/coltonw/boats-and-bridges-web)), people actually play it, and the URL still works.',
      "The one thing I regret about it is the art. The board and card illustrations were generated with Midjourney when image generation had just become good enough to be interesting. By the time the game actually shipped, the gamedev community had turned hard against AI art, with good reason, and as a result the art has aged badly. If I rebuilt the visuals today I would do the art myself or partner with an artist.",
    ],
    media: {
      kind: "video",
      webm: "/videos/boatsandbridgesshipped.webm",
      mp4: "/videos/boatsandbridgesshipped.mp4",
      width: 752,
      height: 598,
    },
    outro: [
      "Stack is SvelteKit (with Svelte 5 runes), TypeScript, hand-written SVG for the puzzle rendering, and Vercel for hosting with their analytics built in so I can see when anybody is playing. Out of all the frontend frameworks I have used, SvelteKit has been one of my favorites. Definitely glad I learned it and I plan to use it more for future projects (even if I could never get work off of React).",
    ],
  },
  {
    id: "defend-the-drill",
    heading: "Designing My Own Board Game",
    preIcon: [
      "While Boats and Bridges was on the back burner, I had been quietly designing a different game on the side — a competitive sci-fi card game called Defend the Drill, where each player crews their own drill (an unlicensed copy of a Dune spice harvester) on a hostile planet, fending off threats and racing to be the player who comes out with the most loot. This one was never going to be a video game; the target was a real tabletop game, with [Tabletop Simulator](https://www.tabletopsimulator.com/) as the playtesting environment.",
    ],
    iconLine: {
      title: "Defend the Drill",
      date: "2021-2024",
      icons: [
        "nodejs",
        "jimp",
        {
          title: "Lodash",
          href: "https://lodash.com/",
          label: "Lo",
          labelClass:
            "flex-none mx-2 text-black underline decoration-blue-600 decoration-2 font-bold",
        },
        "svelte",
        "typescript",
        "vite",
        "googleSheets",
        "sharp",
        "playwright",
      ],
    },
    intro: [
      "The [first version](https://github.com/coltonw/defend-the-drill) was a small Node script that took card definitions written as plain text and rendered them into card-shaped PNGs with Jimp, ready to drop into Tabletop Simulator as a custom deck. Crude but it did the job — I could write a new card during dinner, regenerate the deck, and have it on the table for playtesting that night.",
      "A few years later I did a [proper rebuild](https://github.com/coltonw/defend-the-drill2). Card data now lives in a Google Sheet so I can rebalance numbers between playtest rounds without recompiling anything; a build script pulls the sheet down, runs it through a Svelte component that renders each card, and uses Playwright to screenshot the rendered cards into the sheet-of-cards PNGs that Tabletop Simulator expects for a deck. Sharp does the final image processing.",
      "The whole thing is a board-game asset pipeline pretending to be a Svelte web app.",
    ],
  },
  {
    id: "puzzlescript",
    heading: "Prototyping in PuzzleScript",
    preIcon: [
      "After Boats and Bridges shipped, I wanted to keep doing real game development but without ever opening Unity again. Before committing to an engine I spent a stretch making small puzzle-game prototypes in [PuzzleScript](https://www.puzzlescript.net/), the in-browser puzzle-game engine where the whole game — graphics, rules, levels — fits in a single text file.",
    ],
    iconLine: {
      title: "PuzzleScript prototypes",
      date: "2024",
      icons: ["puzzlescript"],
    },
    intro: [
      'PuzzleScript is brilliant for this kind of thing: the iteration loop is essentially "edit the file, hit Run, the game is in your browser." You can have a brand-new mechanic playable in under an hour, which means you find out very quickly whether an idea is fun or whether you\'ve been politely fooling yourself for three weeks. (Details on the specific prototypes coming soon — I will fill this in with the games and screenshots.)',
      "The one that survived the round of prototyping was a sokoban variant about pushing takeout containers around without spilling them. That one I decided was worth building for real in a proper engine.",
    ],
  },
  {
    id: "takeout-bevy",
    iconLine: {
      title: "Soko-Bun (Takeout Containers)",
      date: "2024-2026",
      icons: ["rust", "bevy", "wasm"],
    },
    intro: [
      "So [Soko-Bun](https://github.com/coltonw/takeout-bevy) is the Bevy version of that prototype. [Bevy](https://bevyengine.org/) is interesting to me in a way Unity has not been for a long time — Rust as a games language, ECS as the world model, and a build pipeline that was actually fun to set up: native dev builds with dynamic linking for fast iteration, release builds that target both desktop and WebAssembly in the browser.",
      "The point was as much to learn Bevy and ECS as it was to ship the game.",
    ],
    outro: [
      "It is on hold right now. The recent wave of AI tooling pulled my attention away, and I would rather understand what is happening with LLMs while the field is still moving fast than keep grinding on level six of a puzzle game. I will come back to it.",
    ],
  },
  {
    id: "puzzlesync",
    heading: "Fun with Family",
    iconLine: {
      title: "PuzzleSync",
      date: "2020",
      icons: [
        "gatsby",
        "react",
        "typescript",
        "graphql",
        "auth0",
        "circleci",
        "aws",
        "serverless",
      ],
    },
    intro: [
      "My family does an annual get-together where we play games and solve puzzles together. For the occasion I decided to make a little quiz game, sort of a cooperative version of sporcle. I used the opportunity to learn Gatsby and sharpen my skills with websockets ([backend source](https://github.com/coltonw/simple-websockets-chat-app/); frontend has private source and implementation).",
    ],
    media: {
      kind: "video",
      webm: "/videos/puzzlesync.webm",
      mp4: "/videos/puzzlesync.mp4",
      width: 1194,
      height: 790,
    },
    outro: [
      "It was my first time using any sort of react based static site generator. I found Gatsby to be annoying to use especially their GraphQL internal api. I had been working with TypeScript at work a bit and so I started developing all side projects in TypeScript starting with this project. I deployed the frontend using CircleCI for CI/CD and Amazon S3 to host. I learned Auth0 for authentication and authorization.",
      "I used an aws official sample for a chat app as the foundation for my backend. I deployed the backend using Serverless and included Lambdas, DynamoDB, and ApiGateway from AWS.",
    ],
  },
  {
    id: "danycon-schedule",
    iconLine: {
      title: "Convention Schedule",
      date: "2022",
      icons: ["nextjs", "vercel", "bulma", "aws"],
    },
    intro: [
      "Before the 2022 family get-together I decided to make a digital schedule. I added some functionality where attendees could pick which games they were going to join ([source](https://github.com/coltonw/danycon-schedule/); [site](https://danycon-schedule.vercel.app/) - use username Will and give it a few minutes for vercel to start the server before refreshing and logging in).",
    ],
    media: {
      kind: "video",
      webm: "/videos/danyconschedule.webm",
      mp4: "/videos/danyconschedule.mp4",
      width: 1080,
      height: 868,
    },
    outro: [
      "I had the pleasure of building this site using Next.js and deploying using Vercel. It made my life really easy and I ended up switching our frontend to Next.js at work off of this experience. For styling I used Bulma and as a database I used AWS DynamoDB. I continue to update the schedule every year for the family get together and I continue to be happy with it.",
    ],
  },
  {
    id: "museum-cra",
    heading: "The museum is its own exhibit",
    preIcon: [
      "Next, I want to talk about the very site you are on right now. The plan was always to implement the museum in several different UI frameworks — partly as a low-stakes way to pick up a new framework without inventing a whole new project for it, partly as an apples-to-apples comparison of how those frameworks perform on a simple two-page site. Each of the older versions has more or less become its own side project at this point; they all still live at their own subdomains.",
    ],
    iconLine: {
      title: "Create React App",
      date: "2020-2022",
      icons: ["react", "tailwind"],
    },
    intro: [
      "The original. Plain React with Tailwind, statically built, deployed to AWS S3 + CloudFront. Lives at [cra.willcolton.com](https://cra.willcolton.com/) ([source](https://github.com/coltonw/resume-cra)). It establishes the baseline — everything else gets measured against this one.",
    ],
  },
  {
    id: "museum-fresh",
    iconLine: {
      title: "Deno Fresh",
      date: "2022-2023",
      icons: ["fresh", "deno", "denoDeploy", "tailwind"],
    },
    intro: [
      "The first port — same content, run through [Deno Fresh](https://fresh.deno.dev/) with Preact islands hydrating only the bits that need to be interactive. My first taste of the islands architecture, which I would much later come back to with Astro. Lives at [fresh.willcolton.com](https://fresh.willcolton.com/) ([source](https://github.com/coltonw/resume-fresh)).",
    ],
  },
  {
    id: "museum-sveltekit",
    iconLine: {
      title: "SvelteKit",
      date: "2022-2026",
      icons: ["svelte", "cloudflare", "tailwind"],
    },
    intro: [
      "The longest-lived implementation; it was the canonical museum URL for years. SvelteKit on Cloudflare Pages, Tailwind for styling. Notably it was my first encounter with Svelte 5 runes, which I liked enough that they're now also driving the islands in this Astro version. Lives at [svelte.willcolton.com](https://svelte.willcolton.com/) ([source](https://github.com/coltonw/resume-sveltekit)).",
    ],
  },
  {
    id: "museum-astro",
    iconLine: {
      title: "Astro",
      date: "2026",
      icons: ["astro", "cloudflare", "tailwind"],
    },
    intro: [
      "This implementation, updated with the latest projects and content. [Astro](https://astro.build/) with a single Svelte 5 island for the lazy-loading video player; everything else is plain static HTML, and the TL;DR page ships literally zero JavaScript. Tailwind for styling, a typed data module for the section content so adding a new project is a content edit rather than a new file, and a Vitest + Playwright test suite that also runs in CI. Deploys as static files on Cloudflare Pages.",
    ],
    outro: [
      "The idea was to eventually set up a real comparison across the implementations — bundle sizes, Lighthouse scores, time-to-interactive on identical content. Instead the museum is a casual cross-section of where the JavaScript ecosystem has been over the last several years, with the bonus that I get to learn a new framework every couple of years without having to come up with what to put in it.",
    ],
  },
  {
    id: "rules-rag",
    heading: "Learning Modern AI From Scratch",
    iconLine: {
      title: "Rules RAG",
      date: "2026",
      icons: ["rust", "ollama", "lancedb"],
    },
    intro: [
      "Coming off Star Judge, where I had let the AI do most of the work and walked away without really learning anything, I wanted a hands-on project to actually dig into retrieval-augmented generation.",
      '[Rules RAG](https://github.com/coltonw/rules-rag) is a board-game-rules chatbot. You ask "how does the auction phase work in Brass" and it answers with a quoted passage from the actual rulebook and a page citation. But, even more than most side projects, I care less about the project itself and more about the underlying technologies I am trying to learn.',
      'The whole thing is a Rust workspace and I am trying to make it as idiomatically Rust as possible. I am using clippy::pedantic to make sure I do as much the "rusty" way as possible. Embeddings and answer generation go through [Ollama](https://ollama.com/) locally; vector storage and full-text search both live in [LanceDB](https://lancedb.com/). I built an eval set so that when I add a new technique I can validate the technique and get that satisfying "number go up" reward.',
    ],
    media: {
      kind: "image",
      src: "/rulesrag.png",
      fallback: "/rulesrag.png",
      alt: "Rules RAG Screenshot",
      width: 763,
      height: 237,
    },
    outro: [
      "This one I am writing myself, with Claude as a collaborator I can ask questions to rather than as an implementer.",
    ],
  },
];
