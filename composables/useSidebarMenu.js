// composables/useSidebarMenu.js

export default function useSidebarMenu(role_id, username) {
  if (role_id === 4) {
    return [
      { label: 'Dashboard', icon: '📊', to: `/${username}`, type: 'main' },
      {
        label: 'Input Fungsional',
        icon: '📝',
        type: 'dropdown',
        children: [
          { label: 'Analis Kebijakan', to: `/${username}/form/analis-kebijakan`, icon: '👤' },
          { label: 'Widyaiswara', to: `/${username}/form/widyaiswara`, icon: '📚' },
          { label: 'Analis Bangkom', to: `/${username}/form/analis-bangkom`, icon: '📊' }
        ]
      }
    ];
  }
  if (role_id === 1) {
    return [
      {
        label: 'Dashboard',
        icon: '🏠',
        to: '/admin/home',
        type: 'main'
      },
      {
        label: 'Analis Kebijakan',
        icon: '👤',
        type: 'dropdown',
        children: [
          { label: 'Jumlah AK', to: '/admin/jumlah-ak', icon: '📋' },
          { label: 'Data Analytic', to: '/admin/analytic-ak', icon: '📈' }
        ]
      },
      {
        label: 'Widyaiswara',
        icon: '📚',
        type: 'dropdown',
        children: [
          { label: 'Jumlah', to: '/admin/widyaiswara', icon: '📋' },
          { label: 'Data Analytic', to: '/admin/analytic-wi', icon: '📈' }
        ]
      },
      {
        label: 'Analis Bangkom',
        icon: '📊',
        type: 'dropdown',
        children: [
          { label: 'Jumlah', to: '/admin/jumlah-ab', icon: '📋' },
          { label: 'Data Analytic', to: '/admin/analytic-ab', icon: '📈' }
        ]
      },
      {
        label: 'Upload Link Youtube',
        icon: '🎥',
        to: '/admin/upload-youtube',
        type: 'main'
      },
      {
        label: 'Upload Peraturan',
        icon: '📄',
        to: '/admin/upload-peraturan',
        type: 'main'
      },
      {
        label: 'Atur Role User',
        icon: '🛡️',
        to: '/admin/role-user',
        type: 'main'
      }
    ];
  }
  // Default: return empty or handle other roles as needed
  return [];
}
