import { CategoryRepository } from "@/repositories/category";

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getCategory(categoryName: string) {
    const category = await this.categoryRepository.getCategory(categoryName);

    return {
      category,
    };
  }
}
