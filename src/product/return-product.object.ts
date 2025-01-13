import { Prisma } from '@prisma/client'
import { returnCategoryObject } from '@app/category/return-category.object'

export const returnProductObject: Prisma.ProductSelect = {
	id: true,
	name: true,
	slug: true,
	image: true,
	description: true,
	price: true,
	created_at: true,
	category: { select: returnCategoryObject }
}
