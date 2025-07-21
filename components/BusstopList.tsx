import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { coordToId } from '@/utils/convert';
import { useSetStops, useStops } from '@/context/StopsContext';

export const Stops = ({
  dragDisabled
}: {
  dragDisabled: boolean
}) => {
  const stops = useStops()
  const setStops = useSetStops()
  const items = stops.map(stop => ({ ...stop, id: coordToId(stop.coord) }))
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id == active.id);
      const newIndex = items.findIndex(item => item.id == over?.id);
      setStops(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => <SortableItem key={item.id} id={item.id} name={item.name} dragDisabled={dragDisabled} />)}
      </SortableContext>
    </DndContext>
  );
}

const SortableItem = ({
  name,
  id,
  dragDisabled
}: {
  name: string,
  id: string,
  dragDisabled: boolean
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id, disabled: dragDisabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="border border-solid border-black justify-between flex-row flex p-2 m-2">
      <span>{name}</span>
      {!dragDisabled && <span {...attributes} {...listeners} className="cursor-grab">⠿</span>}
    </div>
  );
}
