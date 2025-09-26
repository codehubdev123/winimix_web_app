export default interface ICategoryContract {
  // names en || ar
  getCategoryByNames(data: any): Promise<any>;
  create(data: any): Promise<any>;
}
