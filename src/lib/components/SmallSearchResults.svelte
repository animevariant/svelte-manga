<script lang="ts">
	import { searchQuery } from '$lib/utils/stores';
	export let searchResults: any = [];
	
	export let handleClick: any;
	let { VITE_PUBLIC_API } = import.meta.env;
</script>

<div class="absolute z-10 bg-base-200 rounded-box shadow-lg" hidden={$searchQuery === ''}>
	<ul class="menu p-2 shadow-lg bg-base-100 rounded-box w-full">
		{#if searchResults.length > 0}
			{#each searchResults as result}
				<li>
					<button class="flex items-center gap-2" on:click={handleClick(result.src)}>
						<img
							src={result.img.startsWith('http') ? result.img : VITE_PUBLIC_API + '/api' + result.img}
							alt={result.title}
							class="w-8 h-8 rounded-full"
						/>
						<span>{result.title}</span>
					</button>
				</li>
			{/each}
		{:else}
			<li class="text-center">No search results</li>
		{/if}
	</ul>
</div>
