import highlight from 'highlight.js';
import leanHljs from 'highlightjs-lean';
import { Marp } from '@marp-team/marp-core';
import { Marpit } from '@marp-team/marpit';


highlight.registerLanguage('lean', leanHljs);

type MarpPlugin = (constructorOptions: { marp: Marp }) => Marp;

const plugin: MarpPlugin = ({ marp }) => {
  marp.use(({ marpit }: { marpit: Marp }) => {
    marpit.highlighter = function (code: string, lang: string, _attrs?: string): string {
      try {
        return highlight.highlight(code, { language: lang || 'plaintext' }).value;
      } catch (e) {
        console.error(`Highlighting failed for language "${lang}":`, e);
        return highlight.highlight(code, { language: 'plaintext' }).value;
      }
    };
  });

  return marp
};

export default plugin;
