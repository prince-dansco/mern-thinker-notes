import React from 'react'

export  function formatDate(date) {
  return date.toLocaleDateString('en-us', {
    month: 'short',
    day:'numeric',
    year:'numeric'
  });
}
