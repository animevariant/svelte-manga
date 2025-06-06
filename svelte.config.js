import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv'
dotenv.config()

let {PUBLIC_DEPLOY_TARGET} = process.env
const deployTarget = PUBLIC_DEPLOY_TARGET || 'auto'; // Default to 'auto'
const dev = process.argv.includes('dev');


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		appDir: 'app', // Required as the default is _app

		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: deployTarget === 'auto' ? adapterAuto() : deployTarget === 'static' ? adapterStatic() : adapterNode(),
		paths: {
            base: dev ? '' : process.env.BASE_PATH,
        },

	}
};

export default config;

