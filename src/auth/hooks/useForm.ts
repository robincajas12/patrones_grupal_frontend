import { useState } from "react"

export const useForm = <T>(initialValues: T) => {
  const [initialState, setInitialState] = useState(initialValues)

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInitialState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return {
    initialState,
    ...initialState, 
    
    onFormChange,
  }
}