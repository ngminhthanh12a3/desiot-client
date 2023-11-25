// @ts-ignore
/* eslint-disable */

import { Layout } from 'react-grid-layout';

// declare namespace API {
type CurrentUser = {
  _id: string;
  username: string;
  access: string;
  name: string;
  avatar: string;
};

type LoginResult = {
  status?: string;
  type?: string;
  currentAuthority?: string;
};

type PageParams = {
  current?: number;
  pageSize?: number;
};

type RuleListItem = {
  key?: number;
  disabled?: boolean;
  href?: string;
  avatar?: string;
  name?: string;
  owner?: string;
  desc?: string;
  callNo?: number;
  status?: number;
  updatedAt?: string;
  createdAt?: string;
  progress?: number;
};

type RuleList = {
  data?: RuleListItem[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};

type FakeCaptcha = {
  code?: number;
  status?: string;
};

type LoginParams = {
  username?: string;
  password?: string;
  autoLogin?: boolean;
  type?: string;
};

type ErrorResponse = {
  /** 业务约定的错误码 */
  errorCode: string;
  /** 业务上的错误信息 */
  errorMessage?: string;
  /** 业务上的请求是否成功 */
  success?: boolean;
};

type NoticeIconList = {
  data?: NoticeIconItem[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};

type NoticeIconItemType = 'notification' | 'message' | 'event';

type NoticeIconItem = {
  id?: string;
  extra?: string;
  key?: string;
  read?: boolean;
  avatar?: string;
  title?: string;
  status?: string;
  datetime?: string;
  description?: string;
  type?: NoticeIconItemType;
};

type DESIoTConfig = {
  name: string;
  readonly _id: string;
  user: string;
  __v: number;
};
type DESIoTResponse<T> = {
  type: string;
  content: string;
  data: T;
};

type DESIoTReqParams<P> = {
  params?: P;
  options?: any;
};

type DESIoTDeviceType = {
  readonly _id: string;
  name: string;
  config_id: string;
};
type DESIoTPropsType<T> = {
  match: {
    url: string;
    path: string;
    params: T;
  };
  location: {
    pathname: string;
  };
};
type DESIoTVStorageData = number | string;

type DESIoTVStorageType = {
  readonly _id: string;
  user: string;
  name: string;
  config_id: string;
  type: number;
  vs_id: number;
  data: {
    [key: string]: DESIoTVStorageData;
  };
};
type DESIoTDroppingItemParamsType = {
  i: string;
  w: number;
  h: number;
};
type DESIoTDraggableCardProps = {
  droppingItemParams: DESIoTDroppingItemParamsType;
};
type DESIoT_UIDomItemAdditionalAttConfig = {
  title?: string;
  vs_id?: string;
  defaultDOMconfig: { [key: string]: any };
};

type DESIoT_UIDomItemAdditionalAtts = {
  type: string;
  config: DESIoT_UIDomItemAdditionalAttConfig;
};
type DESIoT_UI_DOMContainerProps = {};
type DESIoT_UIDomItem = Layout & DESIoT_UIDomItemAdditionalAtts;
type DESIoT_UIDomItems = DESIoT_UIDomItem[];

type DESIoTUIDataType = {
  items: API.DESIoT_UIDomItems | never[];
  layout: Layout | never[];
  counter: number;
};

type DESIoTUIModel = {
  readonly _id: string;
  name: string;
  config_id: string;
  user: string;
} & DESIoTUIDataType;
// }

type DESIoTDOMItemContent = number | string | any;

type DESIoT_VSSyncPacket = {
  cmd: VSSyncCMDs;
  data: {
    _vs_id: string;
    dev_id: string;
    data: number | string | undefined;
    fullDocument: DESIoTVStorageType;
  };
};

export as namespace API;
