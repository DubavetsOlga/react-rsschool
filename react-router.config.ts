export default {
  appDirectory: 'src',
  ssr: true,
  async prerender() {
    return ['/'];
  },
};
