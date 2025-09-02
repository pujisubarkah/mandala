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
          { label: 'Analis Kebijakan', to: `/${username}/form/analis-kebijakan` },
          { label: 'Widyaiswara', to: `/${username}/form/widyaiswara` },
          { label: 'Analis Bangkom', to: `/${username}/form/analis-bangkom` }
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
          { label: 'Jumlah AK', to: '/admin/jumlah-ak' },
          { label: 'Data Analytic', to: '/admin/analytic-ak' }
        ]
      },
      {
        label: 'Widyaiswara',
        icon: '📚',
        type: 'dropdown',
        children: [
          { label: 'Jumlah', to: '/admin/widyaiswara' },
          { label: 'Data Analytic', to: '/admin/analytic-wi' }
        ]
      },
      {
        label: 'Analis Bangkom',
        icon: '📊',
        type: 'dropdown',
        children: [
          { label: 'Jumlah', to: '/admin/jumlah-ab' },
          { label: 'Data Analytic', to: '/admin/analytic-ab' }
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
