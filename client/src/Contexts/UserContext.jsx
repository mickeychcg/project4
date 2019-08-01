import React, {useState, useEffect} from 'react';

const UserContext = React.createContext({});

const USER_TOKEN = 'userToken';

function Provider(props) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    if (response.status === 200) {
      const json = await response.json();
      window.localStorage.setItem(USER_TOKEN, json.token);
      setUser(json.user);
    }
  };

  const loginFromToken = async () => {
    const userToken = window.localStorage.getItem(USER_TOKEN);
    if (userToken) {
      const response = await fetch('/auth/me/from/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: userToken
        })
      });
      if (response.status === 200) {
        const json = await response.json();
        setUser(json.user);
      }
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(USER_TOKEN);
  };

  useEffect(() => {
    loginFromToken();
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export {
  UserContext as default,
  Provider as UserContextProvider
};