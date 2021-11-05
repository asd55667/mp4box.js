export default (BoxParser: any) => {
  BoxParser.createFullBoxCtor('stco', function (this: any, stream: any) {
    var entry_count;
    entry_count = stream.readUint32();
    this.chunk_offsets = [];
    if (this.version === 0) {
      for (var i = 0; i < entry_count; i++) {
        this.chunk_offsets.push(stream.readUint32());
      }
    }
  });
};
