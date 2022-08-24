import React, { useReducer, useEffect, useState, useRef, useCallback } from "react";
import { apiGet } from "../api/tv-maze-api";

function showsReducer(prevState, action) {
  switch (action.type) {
    case "ADD": {
      return [...prevState, action.showId];
    }

    case "REMOVE": {
      return prevState.filter((showId) => showId !== action.showId);
    }

    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = "shows") {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = "lastQuery") {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : "";
  });

  const setPersistedInput = 
    useCallback(
      (newState) => {
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState));
      }, [key]  
    )
  return [input, setPersistedInput];
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { ...prevState, isLoading: false, show: action.show };
    }

    case "FETCH_FAILED": {
      return { ...prevState, isLoading: false, error: action.error };
    }

    default:
      return prevState;
  }
};

export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then((result) => {
        if (isMounted) {
          dispatch({
            type: "FETCH_SUCCESS",
            show: result,
          });
        }
      })
      .catch((error) => {
        if (isMounted) {
          dispatch({
            type: "FETCH_FAILED",
            error: error.message,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [showId]);

  return state;
}

// Let's pretend this <Counter> component is expensive to re-render so ...
// ... we wrap with React.memo, but we're still seeing performance issues :/
// So we add useWhyDidYouUpdate and check our console to see what's going on.
const Counter = React.memo((props) => {
  useWhyDidYouUpdate("Counter", props);
  return <div style={props.style}>{props.count}</div>;
});
function App() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);
  // Our console output tells use that the style prop for <Counter> ...
  // ... changes on every render, even when we only change userId state by ...
  // ... clicking the "switch user" button. Oh of course! That's because the
  // ... counterStyle object is being re-created on every render.
  // Thanks to our hook we figured this out and realized we should probably ...
  // ... move this object outside of the component body.
  const counterStyle = {
    fontSize: "3rem",
    color: "red",
  };
  return (
    <div>
      <div className="counter">
        <Counter count={count} style={counterStyle} />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div className="user">
        <img src={`http://i.pravatar.cc/80?img=${userId}`} />
        <button onClick={() => setUserId(userId + 1)}>Switch User</button>
      </div>
    </div>
  );
}
// Hook
export function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log("[why-did-you-update]", name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
