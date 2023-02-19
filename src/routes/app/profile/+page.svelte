<script lang="ts">
	import FeatureSetCard from '$lib/components/FeatureSet/Card.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="w-full h-full flex justify-center items-center">
	<FeatureSetCard user={data.user} />
</div>
