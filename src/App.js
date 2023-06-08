import {DndContext, MouseSensor, useSensor, useSensors} from '@dnd-kit/core';
import { createSnapModifier, restrictToParentElement } from '@dnd-kit/modifiers';
import MDEditor from '@uiw/react-md-editor';
import {Draggable} from './Draggable';
import {useState} from "react";
import useProjectReducer from "./hooks/useProjectReducer";
import TipTapEditor from "./components/TipTapEditor";

export default function App () {
    const {
        state,
        updateNote,
        addNote
    } = useProjectReducer();
    const gridSize = 20; // pixels
    const snapToGridModifier = createSnapModifier(gridSize);
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 100
        }
    });
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
        console.log(e);
        const selectedNote = state.notes.find((x) => x.id === note.id);
        selectedNote.content = e;
        updateNote(selectedNote);
    }

    const canvasContainerStyles = {
        position: 'relative',
        backgroundImage: "radial-gradient(gray 1px, transparent 0)",
        backgroundSize: "20px 20px",
        backgroundPosition: "-19px -19px"
    };

    return (
        <div className="container-fluid vh-100">
            <div className="row h-100">
                <div className="col-1 pt-5 bg-secondary-subtle">
                    <div className="d-flex justify-content-center flex-column">
                        <button onClick={() => handleAddButton()} className="btn btn-secondary">
                            <i className="bi-journal-plus" style={{ fontSize: "1.5rem" }}></i>
                        </button>
                    </div>
                </div>
                <div className="col-11 bg-light-subtle" style={canvasContainerStyles}>
                    <DndContext
                        onDragStart={(e) => console.log(e)}
                        nDragEnd={handleDragEnd}
                        modifiers={[snapToGridModifier, restrictToParentElement]}
                        sensors={sensors}
                    >
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
                                <TipTapEditor content={note.content} onUpdate={({ textContent, htmlContent }) => handleUpdateNote(htmlContent, note)} />
                            </Draggable>
                        ))}
                    </DndContext>
                </div>
            </div>
        </div>

    );
}