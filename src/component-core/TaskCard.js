import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="flex min-h-[105px] max-w-[311px] flex-col items-start justify-center rounded-[3px] bg-white px-[15px] shadow-lg">
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
