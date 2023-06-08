import {useDraggable} from "@dnd-kit/core";

const CustomStyle = {
    display: "flex",
    width: "400px",
    height: "auto",
    backgroundColor: "#adb5bd",
    padding: '25px'
};

export function Draggable({ id, content, styles, children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
        }
        : {};
    console.log(listeners);
    return (
        <div
            ref={setNodeRef}
            style={{ ...style, ...CustomStyle, ...styles }}
            {...listeners}
            {...attributes}
        >
            {children}
        </div>
    );
}
