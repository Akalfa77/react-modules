const BASE_URL = "https://meme-api.com/gimme";

export async function fetchMemes(subreddit = null, count = 20) {
  const url = subreddit
    ? `${BASE_URL}/${subreddit}/${count}`
    : `${BASE_URL}/${count}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch memes: ${response.status}`);
  }

  const data = await response.json();
  const safeMemes = data.memes.filter((meme) => !meme.nsfw && !meme.spoiler);

  return safeMemes;
}
