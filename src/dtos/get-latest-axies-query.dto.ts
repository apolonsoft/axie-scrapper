import { GetLatestAxiesQueryCriteriaDto } from './get-latest-axies-query-criteria.dto';

export interface GetLatestAxiesQueryDto {
  from?: number;
  size?: number;
  sort?: string;
  auctionType?: string;
  owner?: string;
  criteria?: GetLatestAxiesQueryCriteriaDto;
}
