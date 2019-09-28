import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { Spinner } from 'react-bootstrap';
import './styles.css';

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return(
    <div className="spinner">
      {(promiseInProgress && <Spinner animation="border" role="status" >
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) || <div >No Rows</div>}
    </div>
  );
}

export default LoadingIndicator;
