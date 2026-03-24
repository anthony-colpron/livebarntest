import type { PropsWithChildren } from 'react';
import { DragDropProvider as BaseDragDropProvider } from '@dnd-kit/react';
import { Cursor, Feedback } from '@dnd-kit/dom';
import { useGameContext } from '../gameContext';

export const DragDropProvider = ({ children }: PropsWithChildren) => {
  const { setColoredSource } = useGameContext();
  return (
    <BaseDragDropProvider
      plugins={[
        Feedback.configure({
          dropAnimation: null,
        }),
        Cursor.configure({
          cursor: 'grabbing',
        }),
      ]}
      onDragEnd={({ operation: { source, target } }) => {
        if (!target || !source) return;
        if (
          target.data.x === source.data.x &&
          target.data.y === source.data.y
        ) {
          return;
        }

        setColoredSource({
          x: target.data.x,
          y: target.data.y,
          color: source.data.color,
        });
      }}
    >
      {children}
    </BaseDragDropProvider>
  );
};
