// composables/useSidebarMenu.js
export default function useSidebarMenu(context) {
  if (context === 'lembaga') {
    return [
      { label: 'Dashboard', icon: '📊', to: '/[slug]/dashboard' },
      { label: 'Input Fungsional', icon: '📝', to: '/[slug]/input-fungsional' }
    ]
  }
  // menu admin dengan struktur dropdown
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
  ]
}
