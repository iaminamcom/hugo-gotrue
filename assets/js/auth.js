// const loginDialog = document.getElementById('login-dialog'),
//   loginForm = document.getElementById('login-form'),
//   logoutBtn = document.getElementById('logout')

// const storedUsername = localStorage.getItem('hm-username');
// const storedPassword = localStorage.getItem('hm-password');
// function isAlreadyLoggedIn() {
//   if (storedPassword && storedUsername) {
//     logoutBtn.hidden = false
//     return true
//   }
//   loginDialog.showModal()
//   return false
// }
// const isLoggedIn = isAlreadyLoggedIn()

// loginForm.onsubmit = async function (e) {
//   e.preventDefault()
//   const values = new FormData(e.target)
//   const username = values.get('username')
//   const password = values.get('password')

//   const params = new URLSearchParams({ password, username }).toString()
//   const response = await fetch('/.netlify/functions/auth/?' + params)
//   const data = await response.json()
//   console.log(data);

//   localStorage.setItem('hm-username', username);
//   localStorage.setItem('hm-password', password);
//   location.reload()
// }

// logoutBtn.onclick = function () {
//   localStorage.removeItem('hm-username')
//   localStorage.removeItem('hm-password')
//   location.reload()
// }
