import GoTrue from 'gotrue-js';

const auth = new GoTrue({
  APIUrl: 'https://transcendent-pegasus-7ff91f.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false,
});

// auth
//   .login('inamkbmail@gmail.com', 'password', true)
//   .then((r) => console.log(`Success! Response: ${{ r }}`))
//   .catch((error) => console.log(`Failed :( ${error}`));
auth.confirm(location.href.split('=')[1], true)
  .then((r) => console.log(r)).catch((err) => console.log(err));
