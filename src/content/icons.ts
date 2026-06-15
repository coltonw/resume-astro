// Maps icon keys to their Astro components. Kept separate from
// `iconsData.ts` so test/node runners (which can't parse `.astro`) can still
// import the metadata.
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { ICON_META, type IconKey } from "./iconsData";

import Alexa from "../components/svgs/Alexa.astro";
import Astro from "../components/svgs/Astro.astro";
import Auth0 from "../components/svgs/Auth0.astro";
import Aws from "../components/svgs/Aws.astro";
import Babel from "../components/svgs/Babel.astro";
import Bevy from "../components/svgs/Bevy.astro";
import Biome from "../components/svgs/Biome.astro";
import Bootstrap from "../components/svgs/Bootstrap.astro";
import Bower from "../components/svgs/Bower.astro";
import Bulma from "../components/svgs/Bulma.astro";
import CSharp from "../components/svgs/CSharp.astro";
import CircleCI from "../components/svgs/CircleCI.astro";
import Claude from "../components/svgs/Claude.astro";
import Cloudflare from "../components/svgs/Cloudflare.astro";
import Deno from "../components/svgs/Deno.astro";
import DenoDeploy from "../components/svgs/DenoDeploy.astro";
import Elixir from "../components/svgs/Elixir.astro";
import Express from "../components/svgs/Express.astro";
import Flow from "../components/svgs/Flow.astro";
import Fresh from "../components/svgs/Fresh.astro";
import Gatsby from "../components/svgs/Gatsby.astro";
import Golang from "../components/svgs/Golang.astro";
import GoogleSheets from "../components/svgs/GoogleSheets.astro";
import Graphql from "../components/svgs/Graphql.astro";
import Gulp from "../components/svgs/Gulp.astro";
import Heroku from "../components/svgs/Heroku.astro";
import Hono from "../components/svgs/Hono.astro";
import Jimp from "../components/svgs/Jimp.astro";
import Koa from "../components/svgs/Koa.astro";
import LanceDB from "../components/svgs/LanceDB.astro";
import Less from "../components/svgs/Less.astro";
import Mocha from "../components/svgs/Mocha.astro";
import MongoDB from "../components/svgs/MongoDB.astro";
import NextJs from "../components/svgs/NextJs.astro";
import Nivo from "../components/svgs/Nivo.astro";
import NodeJs from "../components/svgs/NodeJs.astro";
import Npm from "../components/svgs/Npm.astro";
import Ollama from "../components/svgs/Ollama.astro";
import Phoenix from "../components/svgs/Phoenix.astro";
import Playwright from "../components/svgs/Playwright.astro";
import PuzzleScript from "../components/svgs/PuzzleScript.astro";
import Python from "../components/svgs/Python.astro";
import Ramda from "../components/svgs/Ramda.astro";
import React from "../components/svgs/React.astro";
import Rust from "../components/svgs/Rust.astro";
import ScalaJs from "../components/svgs/ScalaJs.astro";
import Serverless from "../components/svgs/Serverless.astro";
import Sharp from "../components/svgs/Sharp.astro";
import Svelte from "../components/svgs/Svelte.astro";
import TailwindCss from "../components/svgs/TailwindCss.astro";
import TravisCI from "../components/svgs/TravisCI.astro";
import Typescript from "../components/svgs/Typescript.astro";
import Unity from "../components/svgs/Unity.astro";
import Vercel from "../components/svgs/Vercel.astro";
import Vite from "../components/svgs/Vite.astro";
import WebAssembly from "../components/svgs/WebAssembly.astro";
import Webpack from "../components/svgs/Webpack.astro";

const SVG_COMPONENTS: Record<string, AstroComponentFactory> = {
  Alexa,
  Astro,
  Auth0,
  Aws,
  Babel,
  Bevy,
  Biome,
  Bootstrap,
  Bower,
  Bulma,
  CSharp,
  CircleCI,
  Claude,
  Cloudflare,
  Deno,
  DenoDeploy,
  Elixir,
  Express,
  Flow,
  Fresh,
  Gatsby,
  Golang,
  GoogleSheets,
  Graphql,
  Gulp,
  Heroku,
  Hono,
  Jimp,
  Koa,
  LanceDB,
  Less,
  Mocha,
  MongoDB,
  NextJs,
  Nivo,
  NodeJs,
  Npm,
  Ollama,
  Phoenix,
  Playwright,
  PuzzleScript,
  Python,
  Ramda,
  React,
  Rust,
  ScalaJs,
  Serverless,
  Sharp,
  Svelte,
  TailwindCss,
  TravisCI,
  Typescript,
  Unity,
  Vercel,
  Vite,
  WebAssembly,
  Webpack,
};

export interface Icon {
  title: string;
  href: string;
  component: AstroComponentFactory;
  extraClass?: string;
}

export const ICONS: Record<IconKey, Icon> = Object.fromEntries(
  Object.entries(ICON_META).map(([key, meta]) => [
    key,
    {
      title: meta.title,
      href: meta.href,
      component: SVG_COMPONENTS[meta.svg]!,
      ...("extraClass" in meta ? { extraClass: meta.extraClass } : {}),
    },
  ]),
) as Record<IconKey, Icon>;

export type { IconKey, IconRef, TextIcon } from "./iconsData";
