import { Log } from '../log';

export default (BoxParser: any) => {
  BoxParser.createFullBoxCtor('iinf', function (this: any, stream: any) {
    var ret;
    if (this.version === 0) {
      this.entry_count = stream.readUint16();
    } else {
      this.entry_count = stream.readUint32();
    }
    this.item_infos = [];
    for (var i = 0; i < this.entry_count; i++) {
      ret = BoxParser.parseOnebox(stream, false, this.size - (stream.getPosition() - this.start));
      if (ret.code === BoxParser.OK) {
        if (ret.box.type !== 'infe') {
          Log.error('BoxParser', "Expected 'infe' box, got " + ret.box.type);
        }
        this.item_infos[i] = ret.box;
      } else {
        return;
      }
    }
  });
};
