import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BsPlus, BsXLg } from 'react-icons/bs';
import Button from './Button';
import TaskCard from './TaskCard';

const columnsFromBackend = {
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
  },
  10: {
    title: 'Inprogress',
    items: [
      {
        id: 11,
        Task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.',
        Due_Date: '25-May-2020'
      },
      {
        id: 12,
        Task: 'Fix Styling',
        Due_Date: '26-May-2020'
      }
    ]
  }
};

const NameColumn = ({ column, columnId }) => {
  return (
    <div className="flex h-[40px] w-full items-center py-[10px] px-[8px]">
      <label
        for={columnId}
        tabIndex={1}
        className="group relative flex w-full font-medium text-[#172b4d]">
        <h2 className="flex h-[28px] w-full items-center py-[4px] px-[8px] text-[14px] group-focus-within:invisible">
          {column.title}
        </h2>
        <textarea
          name="text"
          className="invisible absolute top-0 left-0 flex h-[28px] w-full flex-1 resize-none overflow-auto py-[4px] px-[8px] outline-[#0079bf] group-focus-within:visible"
          id={columnId}></textarea>
      </label>
    </div>
  );
};

const BoardContent = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
      <div className="ml-2 flex flex-1">
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  className="mx-[4px] w-[272px]"
                  ref={provided.innerRef}
                  {...provided.droppableProps}>
                  <div className="flex min-h-[100px] flex-col rounded-[3px] bg-[#ebecf0]">
                    <NameColumn column={column} columnId={columnId} />
                    <div className="mt-1px mx-[8px] flex flex-col gap-[8px]">
                      {column.items.map((item, index) => (
                        <TaskCard item={item} index={index} key={item.id} />
                      ))}
                    </div>
                    {provided.placeholder}
                    <div className="flex min-h-[40px] w-full items-center py-[10px] px-[8px]">
                      <label
                        for={`fieldAdd${columnId}`}
                        tabIndex={1}
                        className="group relative flex w-full flex-col font-medium text-[#172b4d]">
                        <h2 className="flex w-full items-start rounded-[3px] py-[8px] px-[8px] text-[14px] text-[#5e6c84] hover:bg-slate-100 group-focus-within:hidden">
                          <BsPlus size={20} /> Thêm thẻ
                        </h2>
                        <div className="hidden flex-wrap gap-[8px] group-focus-within:flex">
                          <textarea
                            name="text"
                            className="flex w-full resize-none overflow-auto py-[4px] px-[8px] outline-[#0079bf] "
                            id={`fieldAdd${columnId}`}></textarea>
                          <div className="flex items-center gap-3">
                            <Button lable="Thêm thẻ" styles={{ bg: 'bg-sky-600' }} />{' '}
                            <BsXLg className="cursor-pointer" />
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default BoardContent;
