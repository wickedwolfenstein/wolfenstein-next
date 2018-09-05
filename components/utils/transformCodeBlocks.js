import Prism from "./prism";

export const transformCodeBlocks = content => {
  if (content) {
    let codeBlocks = content.match(/<p class="srcCode".*?>.*?<\/p>/gs);
    for (let index in codeBlocks) {
      let codeBlock = codeBlocks[index];
      let parts = undefined;
      let type = undefined;
      if (
        codeBlock.match(
          /^<p[\s]*class="srcCode"[\s]*data="(.*?)"[\s]*type="(.*?)">.*?<\/p>$/gs
        )
      ) {
        parts = /^<p[\s]*class="srcCode"[\s]*data="(.*?)"[\s]*type="(.*?)">.*?<\/p>$/gs.exec(
          codeBlock
        );
        codeBlock = parts[1];
        type = parts[2];
        codeBlock = codeBlock.replace(/^<p.*?>/gs, "").replace(/<\/p>$/gs, "");
        let codeBlockHtml = Prism.highlight(codeBlock, Prism.languages[type]);
        codeBlock =
          '<pre class="language-' +
          type +
          '"><code class="language-' +
          type +
          '">' +
          codeBlockHtml +
          "</code></pre>";
      } else {
        // prettier-ignore-next-statement
        codeBlock = `
<pre class="line-numbers"><code class="language-scss">
<span class="token variable">Error Occured</span>
<br><span class="token keyword">The format for Code Snippet is </span>
<br><span class="token function">&lt;p class="srcCode" data="Code here" type="Type of Code"&gt;
Placeholder Name
&lt;/p&gt; </span> 
</code></pre>`;
      }
      content = content.replace(codeBlocks[index], codeBlock);
    }
    return content;
  } else {
    return content;
  }
};
