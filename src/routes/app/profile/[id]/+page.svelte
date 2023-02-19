<script lang="ts">
	import FeatureSetCard from '$lib/components/FeatureSet/Card.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="w-full h-full flex justify-center items-center">
	<FeatureSetCard user={data.user} />
</div>
