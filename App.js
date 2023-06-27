import { useEffect, useState } from 'react';
import './app.css'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email не может быть пустым..')
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым..')
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный Email')
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError('Пароль должен иметь oт 3 до 8 символов')
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым..')
      }
    } else {
      setPasswordError('')
    }
  }


  return (
    <div className="App">
      <form className="form">
        <h1>Registration</h1>
        {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}

        <input
          value={email}
          onChange={(e) => emailHandler(e)}
          onBlur={(e) => blurHandler(e)}
          name='email'
          text='email'
          placeholder="Email..."
        />

        {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}

        <input
          value={password}
          onChange={(e) => passwordHandler(e)}
          onBlur={(e) => blurHandler(e)}
          name='password'
          text='password'
          placeholder="Password..."
        />

        <button disabled={!formValid}>submit</button>
      </form>

    </div>
  );
}

export default App;
