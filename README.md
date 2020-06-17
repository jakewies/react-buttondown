## react-buttondown

buttondown.email + react = 💙

### Installation

```
yarn add react-buttondown
```

### API

`react-buttondown` exports a drop-in form and a custom hook that exposes [buttondown's api functionality](https://api.buttondown.email/v1/schema).

#### `ButtondownForm`

A drop-in form that captures subscriptions.

```js
import { ButtondownForm } from 'react-buttondown'
import 'react-buttondown/dist/react-buttondown.css'

function App() {
  const API_KEY = 'your-buttondown-api-key'
  const handleOnSubscribe = subscriber => { /* ... */ } 

  return (
    <ButtondownForm 
      apiKey={API_KEY} 
      onSubscribe={handleOnSubscribe} 
    />
  )
}
```

**props**:

`apiKey`

- Your [buttondown.email](https://buttondown.email/) api key. This can be found in your [newsletter settings](https://buttondown.email/settings).

`onSubscribe` (_optional_)

A function handler that receives the subscriber object after successfully subscribing a user.

#### `useButtondown`

A custom hook that exposes [buttondown's api functionality](https://api.buttondown.email/v1/schema).

```js
import { useButtondown } from 'react-buttondown'

function App() {
  const { addSubscriber } = useButtondown('my-api-key')

  const handleAddSubscriber = async (email) => {
	try {
      const response = await addSubscriber(email)
      const subscriber = response.data

    } catch (err) {
      const errorMessage = err.data
      console.log(errorMessage)
	}
  } 

// ...
}
```

**arguments**:

`apiKey`

- Your [buttondown.email](https://buttondown.email/) api key. This can be found in your [newsletter settings](https://buttondown.email/settings).


**returns**:

`addSubscriber` 

- An async function that takes a string `email` argument and returns an object with returned data and the response status:

```js
const { data, response } = await addSubscriber(email)
```

### Contributing

This is a quick library I built for myself. I can definitely see a more robust solution, but for now it works for me. If others start using it and have concerns / feature requests please feel free to ask away! I will do my best to keep my changes documented in the meantime.

