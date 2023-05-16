import React from 'react';
import styles from './styles.module.css';


function Buttons() {
  return (
    <div className="card"> {/* Apply the 'card' class to the div */}
      <div className={styles.button}>
        <button className="btn">Delete</button>
      </div>
    </div>
  );
}

export default Buttons;
