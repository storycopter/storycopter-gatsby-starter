import fluidify from '@ui/utils/fluidify';

const sizes = {
  100: ['2px', '4px'],
  200: ['4px', '8px'],
  300: ['8px', '12px'],
  400: ['12px', '16px'],
  500: ['16px', '24px'],
  600: ['20px', '32px'],
  700: ['24px', '40px'],
  800: ['28px', '80px'],
  900: ['32px', '160px'],
};

export default function setSpace(args) {
  const prop = args.substr(0, 1);
  const pos = args.substr(1, 1);
  const size = args.substr(2, 3);

  const properties = {
    b: 'border-width',
    m: 'margin',
    p: 'padding',
  };
  const positions = {
    t: 'top',
    b: 'bottom',
    l: 'left',
    r: 'right',
  };

  const range = { min: sizes[size][0], max: sizes[size][1] };

  switch (pos) {
    case 'a': {
      return { ...fluidify(properties[prop], range) };
    }
    case 'h': {
      return { ...fluidify(`${properties[prop]}-left`, range), ...fluidify(`${properties[prop]}-right`, range) };
    }
    case 'v': {
      return { ...fluidify(`${properties[prop]}-top`, range), ...fluidify(`${properties[prop]}-bottom`, range) };
    }
    default: {
      return { ...fluidify(`${properties[prop]}-${positions[pos]}`, range) };
    }
  }
}
