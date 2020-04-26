import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function FullScreenIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M20.333 4C21.253 4 22 4.747 22 5.667V19c0 .92-.747 1.667-1.667 1.667H3.667C2.747 20.667 2 19.919 2 19V5.667C2 4.747 2.747 4 3.667 4h16.666zm0 15s.003 0 0 0V5.667H3.667V19h16.666zm-11.25-6.005l.589.588L6.755 16.5h1.078v.833H5.75a.418.418 0 01-.417-.416v-2.084h.834v1.078l2.916-2.916zm9.167-5.662c.23 0 .417.188.417.417v2.083h-.834V8.755l-2.916 2.917-.589-.589 2.917-2.916h-1.078v-.834h2.083z" />
    </SvgIcon>
  );
}
