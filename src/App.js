import {DndContext, DragOverlay, MouseSensor, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {createSnapModifier} from '@dnd-kit/modifiers';
import MDEditor from '@uiw/react-md-editor';
import {Draggable} from './Draggable';
import {useState} from "react";
const notesData = [
    {
        id: "1",
        content: "Study English",
        position: {
            x: 20,
            y: 100
        }
    }
];
export default function App () {
    const [notes, setNotes] = useState(notesData);
    const [i, setI] = useState(2);
    const gridSize = 20; // pixels
    const snapToGridModifier = createSnapModifier(gridSize);
    const [value, setValue] = useState("**Hello world!!!**");

    function handleDragEnd(ev) {
        // What to do here??
        // It's not a sortable, it's a free drag and drop
        const note = notes.find((x) => x.id === ev.active.id);
        note.position.x += ev.delta.x;
        note.position.y += ev.delta.y;
        const _notes = notes.map((x) => {
            if (x.id === note.id) return note;
            return x;
        });
        setNotes(_notes);
    }

    function handleButton () {
        notesData.push({
            id: i,
            position: {
                x: 20,
                y: 100
            }
        });
        setI(i + 1);
        setNotes(notesData)
    }

    return (
        <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGridModifier]}>
            <div><button onClick={() => handleButton()} className="btn btn-primary">add note</button></div>
            {notes.map((note) => (
                <Draggable
                    styles={{
                        position: "absolute",
                        left: `${note.position.x}px`,
                        top: `${note.position.y}px`
                    }}
                    key={note.id}
                    id={note.id}
                    content={note.content}
                >
                    <MDEditor
                        style={{ height: "100%" }}
                        value={value}
                        onChange={setValue}
                        height={"100%"}
                    />
                </Draggable>
            ))}
        </DndContext>
    );
}