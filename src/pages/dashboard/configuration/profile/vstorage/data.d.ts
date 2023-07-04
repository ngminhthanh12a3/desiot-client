export type TableListItem = Partial<API.DESIoTVStorageType>;
export type ModalFormButtonType = {
  onModalFormFinish(formData: TableListItem): Promise<boolean>;
  config_id: string;
};
