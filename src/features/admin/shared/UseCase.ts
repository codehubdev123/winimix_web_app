export default interface UseCase<IRequest, IResponse> {
  execute(data?: IRequest): IResponse;
}
