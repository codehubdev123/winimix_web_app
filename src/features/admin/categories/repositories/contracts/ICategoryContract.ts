export default interface ICategoryContract {
  // names en || ar
  getCategoryById(data: any): Promise<any>;
  getCategoryByNames(data: any): Promise<any>;
  create(data: any): Promise<any>;
  update(id: any, data: any): Promise<any>;
  delete(data: any): Promise<any>;
}
