import * as comrak from "@comrak";

export default function render(markdown: string): string {
  return comrak.markdownToHTML(markdown, {
    extension: {
      autolink: true,
      descriptionLists: true,
      footnotes: true,
      strikethrough: true,
      table: true,
      tasklist: true,
    },
    render: {
      escape: true,
      githubPreLang: true,
    },
  });
}
