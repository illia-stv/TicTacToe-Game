# Tic-Tac-Toe with React, XState, and Styled-Components

This project is a Tic-Tac-Toe game implemented using React, XState for state management, and styled-components for styling. The game features a responsive and visually appealing UI, with a state machine managing the game logic.

https://github.com/user-attachments/assets/3c296272-831a-42fc-86df-8eedbf425b93

State Machine Design: The game uses XState's state machine to manage different states of the Tic-Tac-Toe game. The states include idle, playing, checkingWin, won, and draw. This design ensures a clear and maintainable structure for handling game logic and transitions.

Responsive Design: The game board and buttons are styled to be responsive using styled-components. The grid layout adjusts to different screen sizes, and the buttons are styled with gradients and hover effects for a modern look.

Unit Tests: We use Jest and React Testing Library to test the state machine and React components. Tests cover state transitions, game logic, and UI interactions.

## Getting Started

First, install dependencies:

```bash
npm i
# or
yarn
```
run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

run tests:

```bash
npm run test
# or
yarn run test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
