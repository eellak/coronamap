import React, { useState } from "react"
import OpenIcon from '../assets/open.svg'
import CloseIcon from '../assets/close.svg'

const Box = ({ title, children, classes = '', open = true, sidebar = 'left', index = 0, toggable = true, up = [] }) => {
  const [grid, setGrid] = up
  const [toggle, setToggle] = useState(open)
  const toggleBox = () => {
    if (toggable) {
      if (sidebar === 'left') {
        
      var s = grid.left.map((r, i)=> {
        if (i === index) {
          r = !toggle ? 'auto' : 'max-content'
        }
        return r
      });
      if (!s.includes('auto')) {
        s = ['max-content','max-content']
      }
      setGrid({...grid,left: s});
    }
    setToggle(!toggle);
  }
  }
  return (
    <>
    <div className={'box '+ classes + (!toggle ? ' box-closed' : '')}>
      {title && (
      <div className="box-header" onClick={() => toggleBox()} onKeyPress={() => toggleBox()} role="button" tabIndex="0">
        <div>{title}</div>
        {toggable &&(
          <div className="box-header--actions">
          {toggle ? (<img src={CloseIcon} alt="" />) : (<img src={OpenIcon} alt="" />)}
        </div>
        )}
      </div>
      )}
      <div className="box-content">
        {children}
      </div>
    </div>
    </>
  );
}

export default Box