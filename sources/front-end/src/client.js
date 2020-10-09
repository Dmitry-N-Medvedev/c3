import * as firebase from 'firebase/app';
import * as sapper from '@sapper/app';
import {
	startServices,
	stopServices,
} from '../services/index.mjs';
import firebaseConfig from '../src/configs/firebaseConfig.mjs';

const handleWindowUnload = () => {
	window.removeEventListener('unload', handleWindowUnload);

	authServiceAdapter.destroy();
	authServiceAdapter = null;

	stopServices();
};

window.addEventListener('unload', handleWindowUnload);

(async () => {
	firebase.initializeApp(firebaseConfig);

	await startServices();

	sapper
		.start({
			target: document.querySelector('#c3'),
		})
		.then(() => {
			console.debug('APP STARTED OK');
		});
})();
