import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@app/prisma.service'
import { generateSlug } from '@app/utils/generate-slug'
import { returnProductObject } from '@app/product/return-product.object'
import { ProductDto } from '@app/product/dto/product.dto'
import { CategoryService } from '@app/category/category.service'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private categoryService: CategoryService
	) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.search(searchTerm)

		return this.prisma.product.findMany({
			select: returnProductObject,
			orderBy: {
				created_at: 'desc'
			}
		})
	}

	async search(searchTerm: string) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			},
			select: returnProductObject
		})
	}

	async getBySlug(slug: string) {
		const product = this.prisma.product.findUnique({
			where: { slug },
			select: returnProductObject
		})

		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async getByCategory(categorySlug: string) {
		const products = this.prisma.product.findMany({
			where: {
				category: { slug: categorySlug }
			},
			select: returnProductObject
		})

		if (!products) throw new NotFoundException('Products not found')

		return products
	}

	async create() {
		return this.prisma.product.create({
			data: {
				name: '',
				slug: '',
				image: '',
				description: '',
				price: 0
			}
		})
	}

	async update(id: string, dto: ProductDto) {
		const { name, description, image, price, categoryId } = dto

		await this.categoryService.getById(categoryId)

		return this.prisma.product.update({
			where: { id },
			data: {
				name,
				slug: generateSlug(dto.name),
				description,
				image,
				price,
				category: {
					connect: { id: categoryId }
				}
			}
		})
	}

	async delete(id: string) {
		return this.prisma.product.delete({ where: { id } })
	}
}
