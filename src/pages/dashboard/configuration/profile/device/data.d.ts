export type TableListItem = {
  readonly _id: string;
  name: string;
  config_id: string;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
