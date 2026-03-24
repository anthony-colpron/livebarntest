import z from 'zod';

export type GameInfo = z.infer<typeof gameInfoSchema>;

const gameInfoSchema = z.strictObject({
  userId: z.string(),
  width: z.number(),
  height: z.number(),
  maxMoves: z.number(),
  target: z.tuple([
    z.number().min(0).max(255),
    z.number().min(0).max(255),
    z.number().min(0).max(255),
  ]),
});

export const parseGameInfo = (data: unknown): GameInfo | null => {
  const gameInfo = gameInfoSchema.safeParse(data);

  if (gameInfo.error) console.error(gameInfo.error.issues);
  if (gameInfo.success) return gameInfo.data;

  return null;
};
