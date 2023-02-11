<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<h1>Hello {data.user.name}</h1>
	<p>id: <i>{data.user.id}</i></p>
</div>
