export const loginResolves = {
  email: 'email@email.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

export const loginSend = {
  email: 'email@email.com',
  password: 'secret_admin',
}

export const loginWithoutEmail = {
  password: 'secret_admin',
}

export const loginWithoutPassword = {
  email: 'email@email.com',
}

export const loginWithInvalidEmailAndPassword = {
  email: 'invalid@email.com',
  password: '123456',
}
