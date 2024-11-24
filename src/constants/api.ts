const BASE_URL = {
  AUTH: '/auth',
  USER: '/users',
  CHECKLIST: '/checklists',
  FOLDER: '/folders',
  SIDEBAR: '/sidebar',
};

export const apiRoutes = {
  auth: {
    BASE: BASE_URL.AUTH,
    AUTH_TOKEN: `${BASE_URL.AUTH}/:provider/token`,
    LOGOUT: `${BASE_URL.AUTH}/logout`,
  },
  user: {
    BASE: BASE_URL.USER,
  },
  checklist: {
    BASE: BASE_URL.CHECKLIST,
    ITEM: `${BASE_URL.CHECKLIST}/:checklistId`,
  },
  folder: {
    BASE: BASE_URL.FOLDER,
    ITEM: `${BASE_URL.FOLDER}/:folderId`,
  },
  sidebar: {
    BASE: BASE_URL.SIDEBAR,
    TREE: `${BASE_URL.SIDEBAR}/tree`,
  },
};
