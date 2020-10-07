import {
  nanoid,
} from 'nanoid/non-secure/index.js';

export const generateComponentId = ({
  keyLength = 5,
}) => `i${nanoid(keyLength)}`;
