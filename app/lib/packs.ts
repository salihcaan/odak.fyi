import type { LucideIcon } from "lucide-react";
import {
  Container,
  GitBranch,
  Github,
  Gitlab,
  Hammer,
  Package,
} from "lucide-react";
import dockerPack from "../packs/docker.json";
import gitPack from "../packs/git.json";
import githubPack from "../packs/github.json";
import gitlabPack from "../packs/gitlab.json";
import nodePack from "../packs/node.json";
import xcodePack from "../packs/xcode.json";

// One pack = one JSON file under app/packs/. The same file is what the
// "Add to Odak" deep link imports (served at /packs/<slug>.json via the
// app/public/packs symlink), so the cards below can never drift from
// the payload — they render straight from it.
export type PackAction = {
  name: string;
  type: string;
  shortcut: string;
  app?: string;
  url?: string;
  script?: string;
  output?: string;
  on_select?: string;
  conditions?: {
    fileExists?: string | string[];
    variables?: Record<string, string>;
  };
};

export type Pack = {
  slug: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  /** Extra requirement beyond Odak itself, e.g. a CLI tool. */
  requires?: string;
  /** When conditions scope the pack, a human note on where it appears. */
  appearsIn?: string;
  actions: PackAction[];
};

const actionsOf = (p: { actions: unknown }) => p.actions as PackAction[];

export const PACKS: Pack[] = [
  {
    slug: "git",
    title: "Git",
    tagline:
      "Branch switching as a pickable list, push/pull, and copyable commits — on any repo.",
    icon: GitBranch,
    actions: actionsOf(gitPack),
  },
  {
    slug: "github",
    title: "GitHub",
    tagline:
      "Jump to the repo, PRs, CI runs, and branch compare. Review PRs from a list overlay.",
    icon: Github,
    requires: "PR actions use the gh CLI",
    actions: actionsOf(githubPack),
  },
  {
    slug: "gitlab",
    title: "GitLab",
    tagline:
      "Repo, merge requests, pipelines for the current branch, and one-keystroke new MRs.",
    icon: Gitlab,
    actions: actionsOf(gitlabPack),
  },
  {
    slug: "docker",
    title: "Docker",
    tagline:
      "Compose up/down, restart a service from a list, and see what's running.",
    icon: Container,
    appearsIn: "Compose actions appear only in projects with a compose file",
    actions: actionsOf(dockerPack),
  },
  {
    slug: "node",
    title: "Node / npm",
    tagline:
      "Pick an npm script from a list and run it, install deps, spot outdated packages.",
    icon: Package,
    appearsIn: "Appears only in projects with package.json",
    actions: actionsOf(nodePack),
  },
  {
    slug: "xcode",
    title: "Xcode / Swift",
    tagline:
      "Open in Xcode, run swift test, resolve packages, and nuke DerivedData when it lies.",
    icon: Hammer,
    appearsIn: "Scoped to projects with Package.swift or an .xcodeproj",
    actions: actionsOf(xcodePack),
  },
];

export const packUrl = (slug: string) => `https://odak.fyi/packs/${slug}.json`;

export const packDeepLink = (slug: string) =>
  `odak://import?url=${packUrl(slug)}`;
