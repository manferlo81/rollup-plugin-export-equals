export default function () {
  return {
    renderChunk: function renderChunk(code) {
      return code.replace(/export default (\w+[\w\d_$]*)/, "export = $1");
    },
  };
}
