import type { LayoutLoad } from './$types';
import { goto } from '$app/navigation';

export const load: LayoutLoad = async ({ url }) => {
	if (url.pathname != '/settle' && !localStorage.getItem('state')) {
		return goto('/settle');
	}

	const pageAccessedViaReload = (window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).type === 'reload';
	if (!pageAccessedViaReload) {
		let visitCount = parseInt(localStorage.getItem('visitCount') ?? '0');
		localStorage.setItem('visitCount', (++visitCount).toString());
	}
};
