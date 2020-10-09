export const AuthServiceMessages = Object.freeze({
  signInWithEmailAndPassword: {
    type: 'auth:req:signInWithEmailAndPassword',
    payload: {},
  },
  signedInWithEmailAndPassword: {
    type: 'auth:res:signInWithEmailAndPassword',
    payload: {},
  },
  signOut: {
    type: 'auth:req:signOut',
  },
  signedOut: {
    type: 'auth:res:signOut',
  },
});
