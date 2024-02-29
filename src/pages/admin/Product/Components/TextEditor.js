import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const TextEditor = ({ data = null ,onChange = () => {} }) => {
  const editorConfiguration = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'T',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        'alignment',
        'code',
        'codeBlock',
        'findAndReplace',
        'fontColor',
        'fontFamily',
        'fontSize',
        'fontBackgroundColor',
        'highlight',
        'horizontalLine',
        'htmlEmbed',
        'imageInsert'
      ]
    },
    Language: 'en',
    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    }
  };

  return (
    <>
      <CKEditor
        editor={Editor}
        data={data}
        config={editorConfiguration}
        onChange={(event, editor) => {
          onChange(editor.getData());
        }}
      />
    </>
  );
};

export default TextEditor;
