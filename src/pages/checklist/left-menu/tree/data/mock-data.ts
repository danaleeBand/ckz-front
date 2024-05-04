import { TreeApiResponseType } from '@/types';

export const apiDataExample: TreeApiResponseType = {
  data: {
    workspace: [
      {
        id: 1,
        name: '기본 워크스페이스',
        defaultFolder: [
          {
            id: 4,
            title: '체크리스트4',
          },
          {
            id: 5,
            title: '체크리스트5',
          },
        ],
        folder: [
          {
            id: 1,
            name: '폴더1',
            checklist: [
              {
                id: 1,
                title: '체크리스트1',
              },
            ],
          },
          {
            id: 2,
            name: '폴더2',
            checklist: [
              {
                id: 2,
                title: '체크리스트2',
              },
              {
                id: 3,
                title: '체크리스트3',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: '워크스페이스2',
        defaultFolder: [
          {
            id: 7,
            title: '체크리스트7',
          },
        ],
        folder: [
          {
            id: 4,
            name: '폴더4',
            checklist: [
              {
                id: 6,
                title: '체크리스트6',
              },
            ],
          },
        ],
      },
    ],
  },
};
