import {useEffect, useReducer} from "react";
export const NOTES_ACTIONS = {
    ADD_NOTE: "ADD_NOTE",
    UPDATE_NOTE: "UPDATE_NOTE",
    LOAD_STATE_FROM_BROWSER: "LOAD_STATE_FROM_BROWSER"
}
export function reducer(state, action) {
    if (action.type === NOTES_ACTIONS.ADD_NOTE) {
        return {
            ...state,
            notes: [
                ...state.notes,
                action.note
            ]
        }
    }

    if (action.type === NOTES_ACTIONS.UPDATE_NOTE) {
        const notes = state.notes;
        const index = notes.findIndex(note => note.id === action.note.id);

        if (index) {
            notes[index] = action.note;
        }

        return {
            ...state,
            notes: notes
        }
    }

    if (action.type === NOTES_ACTIONS.LOAD_STATE_FROM_BROWSER) {
        return {
            ...action.payload
        }
    }
}

export default function useProjectReducer () {
    const initialState = {
        lastSaved: null,
        notes: [],
        isSaving: false,
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    function addNote (note) {
        dispatch({
            type: NOTES_ACTIONS.ADD_NOTE,
            note: {
                id: crypto.randomUUID(),
                position: {
                    x: 20,
                    y: 20
                },
                content: ""
            }
        });
        saveToBrowser();
    }

    function updateNote (note) {
        dispatch({
            type: NOTES_ACTIONS.UPDATE_NOTE,
            note
        });
        saveToBrowser();
    }

    function saveToBrowser () {
        window.localStorage.setItem("notes", JSON.stringify(state))
    }

    function loadFromBrowser() {
        const loadedNotes = JSON.parse(window.localStorage.getItem("notes"));
        if (loadedNotes && loadedNotes.notes && loadedNotes.notes.length > 0) {
            dispatch({
                type: NOTES_ACTIONS.LOAD_STATE_FROM_BROWSER,
                payload: loadedNotes
            });
        }
    }

    useEffect(() => {
        loadFromBrowser()
    }, []);

    return { state, updateNote, addNote};
}