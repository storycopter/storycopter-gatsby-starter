import _ from 'lodash';

export default function constructImageObj(edges, name) {
  return name
    ? _.find(
        edges.map(e => e.node),
        o => o.base === name
      )
    : null;
}
