export const relationTreeDemoData = [
  {
    id: 285,
    label: '285-华安',
    type: 'ib',
    children: [
      {
        id: 29,
        label: '29-Luke',
        type: 'ib',
        children: [
          {
            id: 42,
            label: '42-jack',
            type: 'ib',
            children: [
              { id: 70, label: '70-张生龙', type: 'client', mtAccount: '888001' },
              { id: 319, label: '319-黎富英', type: 'client', mtAccount: '888002' },
              { id: 329, label: '329-魏正博', type: 'client', mtAccount: '888003' },
              { id: 468, label: '468-孙敏宏', type: 'ib' },
              { id: 528, label: '528-谢兰香', type: 'ib' }
            ]
          },
          { id: 43, label: '43-汪晋霖', type: 'ib' },
          { id: 161, label: '161-Mikey', type: 'ib' }
        ]
      }
    ]
  },
  {
    id: 999,
    label: '88-独立直客示例',
    type: 'client',
    mtAccount: '999001'
  }
]

