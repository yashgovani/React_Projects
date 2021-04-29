import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error('Should not get there');
  }
};

/* const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...currHttpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...currHttpState, error: null };
    default:
      throw new Error('Should not get there');
  }
}; */

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear
  } = useHttp();
  //const [userIngredients, setIngredients] = useState([]);

  /* const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  }); */

  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState();

  /*  useEffect(() => {
    fetch(
      'https://react-hook-ac225-default-rtdb.firebaseio.com/ingredients.json'
    )
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setIngredients(loadedIngredients);
      });
  }, []); */

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if( !isLoading && !error && reqIdentifier === 'ADD_INGREDIENT'){
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback((filterIngredients) => {
    //setIngredients(filterIngredients);
    dispatch({ type: 'SET', ingredients: filterIngredients });
  }, []);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        'https://react-hook-ac225-default-rtdb.firebaseio.com/ingredients.json',
        'POST',
        JSON.stringify(ingredient),
        ingredient,
        'ADD_INGREDIENT'
      );
      // dispatchHttp({ type: 'SEND' });
      // fetch(
      //   'https://react-hook-ac225-default-rtdb.firebaseio.com/ingredients.json',
      //   {
      //     method: 'POST',
      //     body: JSON.stringify(ingredient),
      //     headers: { 'Content-Type': 'application/json' },
      //   }
      // )
      //   .then((response) => {
      //     dispatchHttp({ type: 'RESPONSE' });
      //     return response.json();
      //   })
      //   .then((responseData) => {
      //     // setIngredients((prevIngredients) => [
      //     //   ...prevIngredients,
      //     //   { id: responseData.name, ...ingredient },
      //     // ]);
      //     dispatch({
      //       type: 'ADD',
      //       ingredient: { id: responseData.name, ...ingredient },
      //     });
      //   });
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `https://react-hook-ac225-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
        'DELETE',
        null,
        ingredientId,
        'REMOVE_INGREDIENT'
      );
      // dispatchHttp({ type: 'SEND' });
      /* fetch(
      `https://react-hook-ac225-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => {
        dispatchHttp({ type: 'RESPONSE' });
        // setIngredients((prevIngredients) =>
        //   prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
        // );
        dispatch({ type: 'DELETE', id: ingredientId });
      })
      .catch((error) => {
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something Went Wrong!!' });
      }); */
    },
    [sendRequest]
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  const clearError = useCallback(() => {
    clear();
    //dispatchHttp({ type: 'CLEAR' });
  }, [clear]);
  return (
    <div className="App">
      {
        /* httpState.error */ error && (
          <ErrorModal onClose={clearError}>
            {/* {httpState.error} */}
            {error}
          </ErrorModal>
        )
      }
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        /* loading={httpState.loading} */
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
