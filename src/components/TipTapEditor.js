import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function TipTapEditor ({ content, onUpdate }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content,
        onBlur: ({ editor }) => onUpdate({
            textContent: editor.state.doc.textContent,
            htmlContent: editor.view.dom.innerHTML
        }),
        editorProps: {
            class: "h-100 p-5",
        },
    })

    return (
        <EditorContent editor={editor} style={{ width: '100%', height: "100%" }} />
    )
}