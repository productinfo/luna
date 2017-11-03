export default {
  global: {
    mode: 'GLOBAL',
    directory: null,
    loading: false,
    messages: []
  },
  packages: {
    isLoading: false,
    showModal: false,
    modalTitle: 'Please wait..',
    totalInstalled: 0,
    active: null,
    packages: [],
    packagesOutdated: [],
    packageActions: []
  }
};
