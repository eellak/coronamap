import React from 'react'
import Box from "./box";

const Totals = ({ data, className = '' }) => {
  return (
  <Box title="Σύνολο" classes={'box-totals ' + className} toggable={false}>
    <div className="totals">
      {data.map((t, i) => (
      <div key={i.toString()+'_total'}><div>{t.value < 10 ? '0' + t.value : t.value}</div><div>{t.name}</div></div>
      ))}
    </div>
  </Box>
  )
}
export default Totals