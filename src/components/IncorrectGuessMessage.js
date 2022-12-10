import React, { useEffect, useState } from 'react';

const IncorrectGuessMessage = ({ variant, children }) => {
  // the alert is displayed by default
  const [alert, setAlert] = useState(true);
      
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, []);       
    
  return (
    <>
        <h1> False! test tetesttestste test</h1>
        // {alert && <div className={`alert alert-${variant}`}>{children}</div>}
        <h2>{alert && <div className={`alert`}>Temporary alert</div>}</h2>
    </>
  )
}

export default IncorrectGuessMessage;