import {DndContext, MouseSensor, useSensor, useSensors} from '@dnd-kit/core';
import {createSnapModifier} from '@dnd-kit/modifiers';
import MDEditor from '@uiw/react-md-editor';
import {Draggable} from './Draggable';
import {useState} from "react";
import useProjectReducer from "./hooks/useProjectReducer";

export default function App () {
    const {
        state,
        updateNote,
        addNote
    } = useProjectReducer();
    const gridSize = 20; // pixels
    const snapToGridModifier = createSnapModifier(gridSize);
    const [value, setValue] = useState("**Hello world!!!**");
    const mouseSensor = useSensor(MouseSensor, {})
    const sensors = useSensors(mouseSensor)

    function handleDragEnd(ev) {
        const note = state.notes.find((x) => x.id === ev.active.id);
        note.position.x += ev.delta.x;
        note.position.y += ev.delta.y;
        updateNote(note);
    }

    function handleAddButton () {
        addNote();
    }

    function handleUpdateNote (e, note) {
        const selectedNote = state.notes.find((x) => x.id === note.id);
        selectedNote.content = e;
        updateNote(selectedNote);
    }

    return (
        <div className="container-fluid vh-100">
            <div className="row h-100">
                <div className="col-1 pt-5 bg-secondary-subtle">
                    <div className="d-flex justify-content-center flex-column">
                        <button onClick={() => handleAddButton()} className="btn btn-primary">
                            <i className="bi-journal-plus" style={{ fontSize: "1.5rem" }}></i>
                        </button>
                    </div>
                </div>
                <div className="col-10" style={{ position: 'relative' }}>
                    <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGridModifier]} sensors={sensors}>
                        {state.notes && state.notes.map((note) => (
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
                                    value={note.content}
                                    onChange={(e) => handleUpdateNote(e, note)}
                                    height={"100%"}
                                />
                            </Draggable>
                        ))}
                    </DndContext>
                </div>
            </div>
        </div>

    );
}