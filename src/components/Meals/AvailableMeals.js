import { Fragment, useEffect, useState } from 'react'
import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
import MealIteam from './MealItem/MealItem'
import useHttp from '../../hooks/use-http'

const AvailableMeals = props => {
  const { isLoading, error, sendRequest: fetchMeals } = useHttp()
  const [loadedMeals, setLoadedMeals] = useState([])

  useEffect(() => {
    const transformMeals = mealsObj => {
      const loadingMeals = []
      for (const mealKey in mealsObj) {
        loadingMeals.push({
          id: mealKey,
          name: mealsObj[mealKey].name,
          description: mealsObj[mealKey].description,
          price: mealsObj[mealKey].price
        })
      }
      setLoadedMeals(loadingMeals)
    }
    fetchMeals(
      { url: 'https://react-http-f6a65-default-rtdb.firebaseio.com/meals.json' },
      transformMeals
    )
  }, [fetchMeals])

  if (isLoading && !error) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }
  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    )
  }

  const mealsList = loadedMeals.map(meal => (
    <MealIteam
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <Fragment>
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    </Fragment>
  )
}

export default AvailableMeals
