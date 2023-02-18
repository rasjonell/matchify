import type { Interest, User } from '@prisma/client';

declare global {
	namespace App {
		namespace DB {
			type UserWithRelations = User & {
				interests: Interest | null;
			};
		}
	}
}

export {};
