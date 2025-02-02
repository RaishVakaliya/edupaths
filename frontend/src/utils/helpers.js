import config from '../config/config';

export const getProfilePicUrl = (profilePicture) => {
  if (!profilePicture) return null;
  if (profilePicture.startsWith('http')) return profilePicture;
  return `${config.API_URL}${profilePicture}`;
}; 