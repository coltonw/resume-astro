// Metadata for every icon — separate from component bindings so it can be
// imported in environments (tests, Node) that can't parse `.astro` files.
export interface IconMeta {
  title: string;
  href: string;
  /** Extra Tailwind classes layered after the default sizing classes. */
  extraClass?: string;
  /** Filename (without extension) of the SVG component in components/svgs. */
  svg: string;
}

export const ICON_META = {
  alexa: { title: 'Amazon Alexa', href: 'https://www.developer.amazon.com/en-US/alexa/', svg: 'Alexa' },
  astro: { title: 'Astro', href: 'https://astro.build/', svg: 'Svelte', extraClass: 'text-orange-500' },
  auth0: { title: 'Auth0', href: 'https://auth0.com/', svg: 'Auth0', extraClass: 'text-orange-600' },
  aws: { title: 'Amazon Web Services', href: 'https://aws.amazon.com/', svg: 'Aws' },
  babel: { title: 'Babel', href: 'https://babeljs.io/', svg: 'Babel', extraClass: 'text-yellow-600' },
  bevy: { title: 'Bevy', href: 'https://bevyengine.org/', svg: 'Bevy', extraClass: 'text-stone-800' },
  biome: { title: 'Biome', href: 'https://biomejs.dev/', svg: 'Biome', extraClass: 'text-emerald-600' },
  bootstrap: { title: 'Bootstrap', href: 'https://getbootstrap.com/', svg: 'Bootstrap' },
  bower: { title: 'Bower', href: 'https://bower.io/', svg: 'Bower' },
  bulma: { title: 'Bulma', href: 'https://bulma.io/', svg: 'Bulma' },
  circleci: { title: 'CircleCI', href: 'https://circleci.com/', svg: 'CircleCI' },
  cloudflare: { title: 'Cloudflare Pages', href: 'https://pages.cloudflare.com/', svg: 'Cloudflare', extraClass: 'text-amber-600' },
  csharp: { title: 'C#', href: 'https://docs.microsoft.com/en-us/dotnet/csharp/', svg: 'CSharp' },
  elixir: { title: 'elixir', href: 'https://elixir-lang.org/', svg: 'Elixir' },
  express: { title: 'Express', href: 'https://expressjs.com/', svg: 'Express' },
  flow: { title: 'Flow', href: 'https://flow.org/', svg: 'Flow' },
  gatsby: { title: 'Gatsby', href: 'https://www.gatsbyjs.com/', svg: 'Gatsby' },
  go: { title: 'Go', href: 'https://go.dev/', svg: 'Golang' },
  googleSheets: { title: 'Google Sheets', href: 'https://www.google.com/sheets/about/', svg: 'GoogleSheets', extraClass: 'text-green-700' },
  graphql: { title: 'GraphQL', href: 'https://graphql.org/', svg: 'Graphql', extraClass: 'text-pink-600' },
  gulp: { title: 'Gulp', href: 'https://gulpjs.com/', svg: 'Gulp' },
  heroku: { title: 'Heroku', href: 'https://www.heroku.com/', svg: 'Heroku' },
  hono: { title: 'Hono', href: 'https://hono.dev/', svg: 'Hono', extraClass: 'text-orange-500' },
  koa: { title: 'Koa', href: 'https://koajs.com/', svg: 'Koa' },
  less: { title: 'Less', href: 'https://lesscss.org/', svg: 'Less' },
  mocha: { title: 'Mocha', href: 'https://mochajs.org/', svg: 'Mocha' },
  mongodb: { title: 'MongoDB', href: 'https://www.mongodb.com/', svg: 'MongoDB' },
  nextjs: { title: 'Next.js', href: 'https://nextjs.org/', svg: 'NextJs' },
  nivo: { title: 'nivo', href: 'https://nivo.rocks/', svg: 'Nivo' },
  nodejs: { title: 'Node.js', href: 'https://nodejs.org/en/', svg: 'NodeJs' },
  npm: { title: 'npm', href: 'https://www.npmjs.com/', svg: 'Npm' },
  phoenix: { title: 'Phoenix Framework', href: 'https://www.phoenixframework.org/', svg: 'Phoenix' },
  playwright: { title: 'Playwright', href: 'https://playwright.dev/', svg: 'Playwright', extraClass: 'text-emerald-600' },
  python: { title: 'Python', href: 'https://www.python.org/', svg: 'Python' },
  ramda: { title: 'Ramda', href: 'https://ramdajs.com/', svg: 'Ramda' },
  react: { title: 'React', href: 'https://reactjs.org/', svg: 'React' },
  rust: { title: 'Rust', href: 'https://www.rust-lang.org/', svg: 'Rust' },
  scalajs: { title: 'Scala.js', href: 'https://www.scala-js.org/', svg: 'ScalaJs' },
  serverless: { title: 'Serverless Framework', href: 'https://www.serverless.com/', svg: 'Serverless' },
  sharp: { title: 'Sharp', href: 'https://sharp.pixelplumbing.com/', svg: 'Sharp', extraClass: 'text-stone-700' },
  svelte: { title: 'Sveltekit', href: 'https://kit.svelte.dev/', svg: 'Svelte' },
  tailwind: { title: 'Tailwind CSS', href: 'https://tailwindcss.com/', svg: 'TailwindCss', extraClass: 'text-sky-400' },
  travisci: { title: 'Travis CI', href: 'https://www.travis-ci.com/', svg: 'TravisCI' },
  typescript: { title: 'TypeScript', href: 'https://www.typescriptlang.org/', svg: 'Typescript' },
  unity: { title: 'Unity', href: 'https://unity.com/', svg: 'Unity' },
  vercel: { title: 'Vercel', href: 'https://vercel.com/home', svg: 'Vercel' },
  vite: { title: 'Vite', href: 'https://vite.dev/', svg: 'Vite', extraClass: 'text-purple-600' },
  wasm: { title: 'WebAssembly', href: 'https://webassembly.org/', svg: 'WebAssembly', extraClass: 'text-indigo-700' },
  webpack: { title: 'Webpack', href: 'https://webpack.js.org/', svg: 'Webpack' },
} as const satisfies Record<string, IconMeta>;

export type IconKey = keyof typeof ICON_META;

/** Text "icon" — a labeled link that renders a styled text token instead of an SVG. */
export interface TextIcon {
  title: string;
  href: string;
  label: string;
  /** Tailwind classes for the label (overrides defaults). */
  labelClass?: string;
}

export type IconRef = IconKey | TextIcon;
