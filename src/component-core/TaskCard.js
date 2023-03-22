import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="mt-[15px] flex min-h-[105px] max-w-[311px] flex-col items-start justify-center bg-white px-[15px]">
            <p>{item.Task}</p>
            <div className="flex w-full items-center justify-between text-[12px] text-[#7d7d7d]">
              <p>
                <span>
                  {new Date(item.Due_Date).toLocaleDateString('en-us', {
                    month: 'short',
                    day: '2-digit'
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
