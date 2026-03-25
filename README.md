# Code alchemy solution by Anthony Colpron

## Running the server

```
cd ./code-alchemy-server
npm run start
```

## Running the client

```
cd ./code-alchemy-client
npm run dev
```

## Differences in my solution

I found it was not a logical game design pattern to let the player with with a default (black) tile. In my solution, tiles not affected by a coloured source do not count in the closest color calculation nor do they allow the player to win.
