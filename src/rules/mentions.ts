import parseUrl from 'url-parse';

export default function mention(md): void {

  function renderMention(tokens, idx) {
    return `<span class="mention" data-name="${tokens[idx].mention.type}" data-id="${tokens[idx].mention.id}">${tokens[idx].mention.label}</span>`;
  }

  function parseUri(uri) {
    const pieces = parseUrl(uri);

    return {
      type: pieces.host,
      id: pieces.pathname.slice(1),
    };
  }

  function parseMentions(state) {
    const matcher = /@$/;

    state.tokens.forEach(blockToken => {
      if (blockToken.type !== 'inline') return;

      const { children } = blockToken;

      children.forEach((token, idx) => {
        // Back out if we're near the end of the token array
        if (idx + 3 > children.length) return;

        // Grab the next four tokens that could potentially construct a mention
        let [matchToken, openToken, textToken, closeToken = {}] = children.slice(idx, idx + 4);

        // Compensate for when the link has no label
        if (textToken.type === 'link_close') {
          closeToken = textToken;
          textToken = null;
        }

        // Back out if we're not dealing with a mention
        if (matchToken.type !== 'text') return;
        if (!matcher.test(matchToken.content)) return;
        if (openToken.type !== 'link_open') return;
        if (closeToken.type !== 'link_close') return;

        // Lookup the mention type and ID from the link's href
        const href = openToken.attrs.reduce((href, attr) => attr[0] === 'href' ? attr[1] : href, '');

        // Remove the @ character from the previous text node
        matchToken.content = matchToken.content.slice(0, -1);

        // Replace the "link_open" with a single "mention" token
        openToken.type = 'mention';
        openToken.mention = parseUri(href);
        openToken.mention.label = textToken && textToken.content || '';

        // Remove the "text" and "link_close" tokens
        children.splice(idx + 2, textToken ? 2 : 1);
      });

      blockToken.children = children;
    });
  }


  md.core.ruler.after('inline', 'mention', parseMentions);
  md.renderer.rules.mention = renderMention;

}
