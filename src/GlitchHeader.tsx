import React from "react"
import "./GlitchHeader.css"

interface Props {
  text: string
}

const GlitchHeader: React.FC<Props> = ({ text }) => {
  return (
    <h1 className="glitch" data-text={text}>
      {text}
    </h1>
  )
}

export default GlitchHeader