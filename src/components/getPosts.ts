export interface Post {
  id: number;
  authorId: number;
  text: string;
}

export async function getPosts(authorId: number): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 2500)); // 2500ms delay
  const posts = (await import('../resources/posts.json')).default;
  return posts.filter((post) => post.authorId === authorId);
}
