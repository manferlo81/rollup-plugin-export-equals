export default () => ({
  renderChunk(code) {
    return code.replace(/\r/g, "\n").replace(/\n+\s*\n+/g, "\r\n");
  },
});
