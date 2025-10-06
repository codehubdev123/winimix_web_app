export default interface IBrandContract {
  // names en || ar
  findById(data: any): Promise<any>;
  getBrandByNames(data: any): Promise<any>;
  create(data: any): Promise<any>;
  update(id: any, data: any): Promise<any>;
  delete(data: any): Promise<any>;
}
