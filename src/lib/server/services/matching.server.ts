import type { Interactions, Interest } from '@prisma/client';

export const MatchingService = {
	findSimilarity,
};

function findSimilarity(
	first: App.DB.UserWithRelations,
	second: App.DB.UserWithRelations
): number | null {
	if (
		!(
			first.interests &&
			second.interests &&
			first.interactions &&
			second.interactions
		)
	) {
		return null;
	}

	// Calculate the similarity between the audio features
	const interestsCommonality = featureSetSimilarity(
		first.interests,
		second.interests
	);

	// Calculate the similarity between the artists
	const artistCommonality = interactionCommonality(
		first.interactions.artists,
		second.interactions.artists
	);

	// Calculate the similarity between the genres
	const genreCommonality = interactionCommonality(
		first.interactions.genres,
		second.interactions.genres
	);

	// Combine the similarities using weighted averaging
	const weightedDistance =
		0.6 * interestsCommonality +
		0.15 * (1 - genreCommonality) +
		0.25 * (1 - artistCommonality);

	return 1 / (1 + weightedDistance);
}

// Private functions

function featureSetSimilarity(first: Interest, second: Interest): number {
	const featureNames = Object.keys(first).filter(
		(key) => !['id', 'user', 'userId'].includes(key)
	) as Array<keyof Omit<typeof first, 'id' | 'user' | 'userId'>>;

	// Euclidean Distance between FeatureSets
	return Math.sqrt(
		featureNames.reduce(
			(currentSum, key) => currentSum + (first[key] - second[key]) ** 2,
			0
		)
	);
}

function interactionCommonality(
	first: Interactions['artists'] | Interactions['genres'],
	second: Interactions['artists'] | Interactions['genres']
): number {
	const commonInteraction = first.filter((interaction) =>
		second.includes(interaction)
	);

	return commonInteraction.length / Math.max(first.length, second.length);
}
