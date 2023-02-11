<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Authenticated:</h1>

<div class="mockup-code">
	<pre data-prefix="$"><code>{JSON.stringify(data, null, 4)}</code></pre>
</div>
