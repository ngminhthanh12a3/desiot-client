export type ModalFormNewConfig = {
  name: string;
};
export type CardListItemDataType = ModalFormNewConfig & {
  readonly _id: string;
  user: string;
  __v: number;
};
