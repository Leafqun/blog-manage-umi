import React from 'react'
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import 'simplemde/dist/simplemde.min.css'

class Markdown extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      se: null
    }
  }

  componentDidMount() {
    let simplemde = new SimpleMDE({
      element: document.getElementById('editor').childElementCount,
      autofocus: true,
      autosave: true,
      previewRender: function (plainText) {
        return marked(plainText, {
          renderer: new marked.Renderer(),
          gfm: true,
          pedantic: false,
          sanitize: false,
          tables: true,
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight: function (code) {
            return highlight.highlightAuto(code).value;
          }
        });
      },
    })
    this.setState({se: simplemde})
    simplemde.value(this.props.value)
    const onChange = this.props.onChange
    simplemde.codemirror.on("change", function(){
      onChange(simplemde.value())
    });
  }
  componentWillReceiveProps(nextProps) {
    this.state.se.value(nextProps.value)
  }

  render() {
    return (
      <div>
        <textarea id="editor"></textarea>
      </div>
    )
  }
}

export default Markdown
