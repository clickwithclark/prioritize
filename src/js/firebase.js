/* eslint-disable import/no-unresolved */
import { initializeApp } from 'firebase/app';
// import { addGlobalEventListener } from './addGlobalEventListener.js';
import { firebaseConfig } from './firebaseConfig';

export const app = initializeApp(firebaseConfig);

/* -------------------------------------------------------------------*/
// #region [read db ]
/* -------------------------------------------------------------------*/
