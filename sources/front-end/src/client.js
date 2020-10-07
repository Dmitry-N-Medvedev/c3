import * as sapper from '@sapper/app';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './configs/firebaseConfig.mjs';

(() => {
	firebase.initializeApp(firebaseConfig);
})();

sapper.start({
	target: document.querySelector('#c3'),
});