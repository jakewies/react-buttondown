## react-buttondown

buttondown.email + react = 💙

### Installation

```
yarn add react-buttondown
```

### Usage

`react-buttondown` exports, at the moment, a single `Buttondown` component that serves as a pre-built form for capturing subscribers.

```js
import { Buttondown } from 'react-buttondown'
import 'react-buttondown/dist/react-buttondown.css'

function App() {
  const API_KEY = 'your-buttondown-api-key'
  const handleOnSubscribe = subscriber => { /* ... */ } 

  return (
    <Buttondown 
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

### Contributing

This is a quick component I built for myself. I can definitely see a more robust solution that could involve less components and more hooks so the user can "bring their own form". That would be ideal next steps, along with a better solution for styling.

