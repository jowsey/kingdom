import { goto } from '$app/navigation';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	if (localStorage.getItem('state')) {
		return goto('/');
	}
};
