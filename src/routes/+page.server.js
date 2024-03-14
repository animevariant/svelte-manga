import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils/api';

export const load = async (event) => {
	const latestMangas = await Latest(event, 1);
	const popularMangas = await Popular(event.locals, 1);
	return {
		popularMangas,
		latestMangas
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	popular: async (event) => {
		const data = await event.request.formData();
		const page = data.get('page');
		try {
			const popularMangas = await Popular(event.locals, page);
	
			return {
				popularMangas
			};
		} catch (err) {
			throw error(err.status, err.message);
		}
	},
	latest: async (event) => {
		const data = await event.request.formData();
		const page = data.get('page');
		try {
			const latestMangas = await Latest(event, page);
			return {
				latestMangas
			};
		} catch (err) {
			throw error(err.status, err.message);
		}
	}
};

// function to get the data from the url
const Popular = async (locals, pageNo) => {

	const resultList = serializeNonPOJOs(
		await locals.pb.collection('reading_progress').getList(1, 20, {
			filter: 'user = "77760erf1db6qql"',
			expand: ['manga', 'currentChapter'],
			perPage: 20,
			sort: '-updated',
			page: pageNo
		})
	);

	const mangas = resultList.items.map((manga) => manga.expand?.manga);
	console.log("eee", mangas[3])
	return mangas;
};

const Latest = async (event, pageNo) => {
	const url = event.url.origin + '/api/manga?page=' + pageNo;
	const res = await event.fetch(url);
	const data = await res.json();

	console.log(data.mangas[3])
	return data.mangas;
};
