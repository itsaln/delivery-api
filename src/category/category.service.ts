import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@app/prisma.service'
import { returnCategoryObject } from '@app/category/return-category.object'
import { CategoryDto } from '@app/category/dto/category.dto'
import { generateSlug } from '@app/utils/generate-slug'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.category.findMany({
			select: returnCategoryObject
		})
	}

	async getById(id: string) {
		const category = this.prisma.category.findUnique({
			where: { id },
			select: returnCategoryObject
		})

		if (!category) throw new NotFoundException('Category not found')

		return category
	}

	async getBySlug(slug: string) {
		const category = this.prisma.category.findUnique({
			where: { slug },
			select: returnCategoryObject
		})

		if (!category) throw new NotFoundException('Category not found')

		return category
	}

	async create() {
		return this.prisma.category.create({
			data: {
				name: '',
				slug: '',
				image: ''
			}
		})
	}

	async update(id: string, dto: CategoryDto) {
		return this.prisma.category.update({
			where: { id },
			data: {
				name: dto.name,
				slug: generateSlug(dto.name),
				image: dto.image
			}
		})
	}

	async delete(id: string) {
		return this.prisma.category.delete({ where: { id } })
	}
}
