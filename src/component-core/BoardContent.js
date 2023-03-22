import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const columns = {
  1: {
    title: 'Todo',
    items: [
      {
        id: 3,
        Task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.',
        Due_Date: '25-May-2020'
      },
      {
        id: 2,
        Task: 'Fix Styling',
        Due_Date: '26-May-2020'
      }
    ]
  }
};
const BoardContent = () => {
  return (
    <DragDropContext>
      <div className="flex flex-1">
        <div className="m-2 flex min-h-[70vh] w-full">
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    className="mr-[45px] flex min-h-[100px] min-w-[341px] flex-col rounded-[3px] bg-[#f3f3f3] p-[15px]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <div className="self-start py-1 px-2 text-[#10957d]">{column.title}</div>
                    {column.items.map((item, index) => (
                      <TaskCard key={item} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default BoardContent;
