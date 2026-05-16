import type { IProfile } from "./profile.interface";
import { profileModels } from "./profile.models";

const createProfileInDB = async (payload: IProfile) => {
  const result = await profileModels.createProfile(payload);
  return result;
};

export const profileServices = {
  createProfileInDB,
};
