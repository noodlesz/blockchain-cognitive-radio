import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Font from '@ckeditor/ckeditor5-font/src/font'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'

import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'

import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'

import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'

import { CustomUploadAdapter } from "./AxiosUploadAdapter"

export const editorConfiguration = {
  plugins: [
    Essentials,
    Paragraph,
    Font,
    Bold,
    Italic,
    Alignment,
    Heading,
    BlockQuote,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    MediaEmbed,
    CustomUploadAdapter,
    Table,
    TableToolbar,
    Link,
    List,
  ],
  toolbar: [
    'heading',
    'fontColor',
    'fontBackgroundColor',
    'fontSize',
    '|',
    'bold',
    'italic',
    'blockQuote',
    'alignment',
    '|',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'insertTable',
    '|',
    'imageUpload',
    'mediaEmbed',
    '|',
    'undo', 'redo',
  ],
  image: {
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      'imageStyle:left',
      'imageTextAlternative'
    ]
  },
  table: {
    contentToolbar: [ 'setTableRowHeader', 'setTableColumnHeader',
      'tableColumn', 'tableRow', 'mergeTableCells' ]
  },
  alignment: {
    options: [ 'left', 'right', 'center', 'justify' ]
  }
}