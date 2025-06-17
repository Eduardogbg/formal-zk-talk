declare module 'highlightjs-lean' {
  import { LanguageFn } from 'highlight.js';
  
  /**
   * Lean language definition for highlight.js
   * 
   * Language: Lean
   * Author: Patrick Massot
   * Category: scientific
   * Description: Language definition for Lean theorem prover
   */
  const leanHighlight: LanguageFn;
  
  export = leanHighlight;
}