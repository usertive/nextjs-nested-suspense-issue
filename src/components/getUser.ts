export interface User {
  id: number;
  name: string;
}

export async function getUser(id: number): Promise<User | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000ms delay
  const users = (await import('../resources/users.json')).default;
  return users.find((user) => user.id === id);
}
