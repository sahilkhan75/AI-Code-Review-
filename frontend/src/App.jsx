import { useState, useEffect } from "react"
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import "./App.css"
import axios from "axios"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

function App() {
  const [code, setCode] = useState(`function sum() {
   return 1 + 1
 }`)
  const [review, setReview] = useState("")

  useEffect(() => {
    prism.highlightAll()
  }, [code]) // 👈 highlight when code changes

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:2000/ai/get-review", { code })
      setReview(response.data)
    } catch (err) {
      setReview("⚠️ Error fetching review. Is the server running?")
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={12}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 15,
              color: "white",
              height: "100%",
              width: "100%",
              overflow: "auto",
            }}
          />
        </div>
        <div onClick={reviewCode} className="review">
          Review
        </div>
      </div>
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  )
}

export default App
