import React from 'react'
import './styles.css'
interface IButtomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    style?: React.CSSProperties;
    loading?: boolean;
}

const Buttom = ({
    text,
    loading,
    ...props
}: IButtomProps) => {
  if (loading) {
    return (
      <button
        className="btn-container"
        {...props}
      >
        <div className="loader"></div>
      </button>
    )
  }

  return (
    <button
        className="btn-container"
        {...props}
    >
        {text}
    </button>
  )
}

export default Buttom
