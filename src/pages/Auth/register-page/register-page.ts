import { registerUser, registerVerifiedUser } from '$lib/services/auth.service';
import type { RegisterUser, registerUserPostBody } from '$lib/utils/dto';
import { checkValidation, registrationSchema } from '$lib/utils/validation';
import { navigate } from 'svelte-navigator';

export const handleRegister = async (userData : RegisterUser) => {
	const response = await registerUser({
		email: userData.email, 
		name: userData.lastName ? userData.firstName + " " + userData.lastName : userData.firstName, 
		password: userData.password,
		isUserAcceptedOccasionalUpdates: userData?.marketingUpdates ?? false,
	});
	return response;
};

export const handleVerifiedRegister = async (userData : RegisterUser) => {
	const response = await registerVerifiedUser({
		email: userData.email, 
		name: userData.lastName ? userData.firstName + " " + userData.lastName : userData.firstName, 
		password: userData.password,
		isUserAcceptedOccasionalUpdates: userData?.marketingUpdates ?? false,
	});
	return response;
};

export const handleRegisterValidation = async (userData: RegisterUser) => {

	const { isError, errorObject } = await checkValidation(registrationSchema, userData);
	if (isError) {
		return errorObject;
	}
	return;
};
