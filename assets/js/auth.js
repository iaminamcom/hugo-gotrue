const netlifyIdentity = require('netlify-identity-widget');

netlifyIdentity.init();
const currentUser = netlifyIdentity.currentUser()

if (currentUser) {
    runAfterAthorization(currentUser)
    return
}
netlifyIdentity.open('login')
netlifyIdentity.on('login', () => runAfterAthorization(currentUser));
