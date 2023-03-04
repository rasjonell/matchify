import type { Interest } from '@prisma/client';

type ProgressInfo = {
	[key in keyof Omit<Interest, 'id' | 'user' | 'userId'>]: {
		min: string;
		max: string;
		info: string;
		class: (
			type: 'tooltip' | 'progress',
		) => `${typeof type}-${
			| 'primary'
			| 'secondary'
			| 'warning'
			| 'success'
			| 'error'
			| 'info'}`;
	};
};

export const FeatureSetInfo: ProgressInfo = {
	energy: {
		min: '0',
		max: '1',
		class: (type) => `${type}-primary`,
		info: 'Energy is a measure that represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.',
	},
	acousticness: {
		max: '1',
		min: '0',
		class: (type) => `${type}-warning`,
		info: 'A confidence measure of whether the track is acoustic.',
	},
	danceability: {
		min: '0',
		max: '1',
		class: (type) => `${type}-success`,
		info: 'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity',
	},
	instrumentalness: {
		min: '0',
		max: '1',
		class: (type) => `${type}-error`,
		info: 'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 100%, the greater likelihood the track contains no vocal content. Values above 50% are intended to represent instrumental tracks, but confidence is higher as the value approaches 100%',
	},
	liveness: {
		min: '0',
		max: '1',
		class: (type) => `${type}-info`,
		info: 'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 80% provides strong likelihood that the track is live.',
	},
	loudness: {
		max: '0',
		min: '-60',
		class: (type) => `${type}-error`,
		info: 'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.',
	},
	speechiness: {
		min: '0',
		max: '1',
		class: (type) => `${type}-primary`,
		info: 'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 100% the attribute value. Values above 66% describe tracks that are probably made entirely of spoken words. Values between 33% and 66% describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 33% most likely represent music and other non-speech-like tracks.',
	},
	valence: {
		min: '0',
		max: '1',
		class: (type) => `${type}-secondary`,
		info: 'A measure describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',
	},
};
