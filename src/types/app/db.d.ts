import type { Interactions, Interest, User } from '@prisma/client';

declare global {
	namespace App {
		namespace DB {
			type UserWithRelations = User & {
				interests: Interest | null;
				interactions: Interactions | null;
			};
		}
	}
}

export {};
